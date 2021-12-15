import { getAuth } from 'firebase/auth';
import {
  doc,
  getDoc,
  getFirestore,
  increment,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

import Contribute from './Contribute/Contribute';
import CreateRequest from './CreateRequest/CreateRequest';
import InfoItem from './InfoItem/InfoItem';
import Layout from '../../hoc/Layout';
import Request from './Request/Request';
import Spinner from '../../ui/Spinner/Spinner';
import {
  ICampaign,
  ICampaignCompleteData,
  IRequest,
} from '../../../interfaces/campaign';
import { IRoutes } from '../../../interfaces/routes';
import { getCampaign } from '../../../utils/campaign';
import { getFirebaseApp } from '../../../utils/firebase';
import { formatNumber, formatTimeLong } from '../../../utils/format';
import web3 from '../../../utils/web3';

import sharedClasses from '../../../common.module.css';
import classes from './campaign.module.css';

interface IProps {
  routes: IRoutes;
}

export default function Campaign({ routes }: IProps) {
  const [campaignData, setCampaignData] = useState<ICampaignCompleteData>();
  const [isLoading, setIsLoading] = useState(true);
  const [isInteractionLoading, setIsInteractionLoading] = useState(false);
  const [isContributor, setIsContributor] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [approvals, setApprovals] = useState<boolean[]>([]);
  const [approvalErrors, setApprovalErrors] = useState<string[]>([]);
  const [contribution, setContribution] = useState('');
  const [contributionError, setContributionError] = useState('');
  const [interactionError, setInteractionError] = useState('');

  const redirectComponent = <Redirect to={routes.CAMPAIGNS} />;
  const firebaseApp = getFirebaseApp()!;
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL(window.location.href);
      const id = url.searchParams.get('id');
      if (!id) {
        setIsLoading(false);
        return;
      }
      try {
        const campaignDoc = await getDoc(doc(firestore, 'campaigns', id));
        const campaignData = campaignDoc.exists()
          ? { ...(campaignDoc.data() as ICampaign), id }
          : null;
        if (!campaignData) {
          setIsLoading(false);
          return;
        }
        const requestDoc = await getDoc(doc(firestore, 'requests', id));
        const requests = requestDoc.data()!.requests as IRequest[];
        const userDoc = await getDoc(doc(firestore, 'users', campaignData.uid));
        const user = userDoc.data()!;

        const campaign = getCampaign(id);
        const summaryResponse = await campaign.methods.getSummary().call();
        const [
          manager,
          balance,
          minimumContribution,
          requestCount,
          contributorsCount,
        ] = [
          summaryResponse[0] as string,
          web3.utils.fromWei(summaryResponse[1] as string, 'ether'),
          web3.utils.fromWei(summaryResponse[2] as string, 'ether'),
          +(summaryResponse[3] as string),
          +(summaryResponse[4] as string),
        ];
        const [account] = await web3.eth.getAccounts();
        if (account && (await campaign.methods.isContributor(account).call())) {
          setIsContributor(true);
        }
        if (account === (await campaign.methods.manager().call())) {
          setIsManager(true);
        }
        const requestsPromise = requests.map(async (request, index) => {
          const blockchainRequest = await campaign.methods
            .requests(index)
            .call();
          return {
            ...request,
            votes: +blockchainRequest.approvalCount as number,
            completed: blockchainRequest.complete as boolean,
          };
        });
        const approvalsPromise = requests.map(async (_, index) => {
          const isApprover: boolean = account
            ? (await campaign.methods.isContributor(account).call())
              ? await campaign.methods.isApprover(account, index).call()
              : false
            : false;
          return isApprover;
        });
        setApprovalErrors(approvalsPromise.map(() => ''));
        setApprovals(await Promise.all(approvalsPromise));
        setCampaignData({
          ...campaignData,
          username: user.username,
          userPhotoUrl: user.photoUrl,
          manager: manager,
          balance: balance,
          minimumContribution: minimumContribution,
          requestCount: requestCount,
          contributorsCount: contributorsCount,
          requests: await Promise.all(requestsPromise),
        });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        return;
      }
    };
    fetchData();
  }, []);

  if (!isLoading && !campaignData) {
    return redirectComponent;
  }

  const validate = () => {
    setContributionError('');
    setInteractionError('');
    let isValid = true;
    if (!contribution || isNaN(+contribution)) {
      setContributionError('Please enter a valid amount to contribute.');
      isValid = false;
    } else if (+contribution < +campaignData!.minimumContribution) {
      setContributionError(
        `Must be at least ${campaignData!.minimumContribution} ETH`,
      );
      isValid = false;
    }
    return isValid;
  };

  const handleContribute = async () => {
    if (!validate()) {
      return;
    }
    setIsInteractionLoading(true);
    try {
      const [account] = await web3.eth.getAccounts();
      if (!account) {
        throw new Error('Please log into your MetaMask account');
      }
      const campaign = getCampaign(campaignData!.id);
      await campaign.methods.contribute().send({
        from: account,
        value: web3.utils.toWei(contribution, 'ether'),
      });
    } catch (error) {
      // @ts-ignore
      setInteractionError(error.message);
      setIsInteractionLoading(false);
      return;
    }
    try {
      const campaignRef = doc(firestore, 'campaigns', campaignData!.id);
      const contributionNum = +contribution;
      await updateDoc(campaignRef, {
        currentAmount: increment(contributionNum),
      });
      setCampaignData({
        ...campaignData!,
        currentAmount: campaignData!.currentAmount + contributionNum,
        balance: `${Number(campaignData!.balance) + Number(contribution)}`,
        contributorsCount: campaignData!.contributorsCount + 1,
      });
      setIsContributor(true);
    } catch (error) {
      // @ts-ignore
      setInteractionError(error.code);
    }
    setIsInteractionLoading(false);
  };

  const addRequest = (request: IRequest) => {
    setCampaignData((campaignData) => ({
      ...campaignData!,
      requests: [...campaignData!.requests, request],
      requestCount: campaignData!.requestCount + 1,
    }));
  };

  const handleApprove = async (index: number) => {
    setIsInteractionLoading(true);
    setApprovalErrors([
      ...interactionError.slice(0, index),
      '',
      ...interactionError.slice(index + 1),
    ]);
    try {
      const campaign = getCampaign(campaignData!.id);
      const [account] = await web3.eth.getAccounts();
      const isValid =
        (await campaign.methods.isContributor(account).call()) &&
        !(await campaign.methods.isApprover(account, index).call());
      if (!isValid) {
        setApprovalErrors([
          ...approvalErrors.slice(0, index),
          'Make sure you are logged into the correct MetaMask account',
          ...approvalErrors.slice(index + 1),
        ]);
        return;
      }
      await campaign.methods.approveRequest(index).send({
        from: account,
      });
      setCampaignData({
        ...campaignData!,
        requests: campaignData!.requests.map((request, i) => {
          if (i === index) {
            return {
              ...request,
              votes: request.votes ? request.votes + 1 : 1,
            };
          }
          return request;
        }),
      });
      setApprovals([
        ...approvals.slice(0, index),
        true,
        ...approvals.slice(index + 1),
      ]);
    } catch (error) {
      // @ts-ignore
      setInteractionError(error.message);
    }
    setIsInteractionLoading(false);
  };

  const handleFinalize = async (index: number) => {
    setIsInteractionLoading(true);
    setApprovalErrors([
      ...interactionError.slice(0, index),
      '',
      ...interactionError.slice(index + 1),
    ]);
    try {
      const campaign = getCampaign(campaignData!.id);
      const [account] = await web3.eth.getAccounts();
      const isValid = account === (await campaign.methods.manager().call());
      if (!isValid) {
        setApprovalErrors([
          ...approvalErrors.slice(0, index),
          'Make sure you are logged into the correct MetaMask account',
          ...approvalErrors.slice(index + 1),
        ]);
        return;
      }
      await campaign.methods.finalizeRequest(index).send({
        from: account,
      });
      setCampaignData({
        ...campaignData!,
        balance: (
          +campaignData!.balance - campaignData!.requests[index].amount
        ).toString(),
        requests: campaignData!.requests.map((request, i) => {
          if (i === index) {
            return {
              ...request,
              completed: true,
            };
          }
          return request;
        }),
      });
    } catch (error) {
      // @ts-ignore
      setInteractionError(error.message);
    }
    setIsInteractionLoading(false);
  };

  const topSection = campaignData && (
    <>
      <div
        className={classes.coverImgHolder}
        style={{
          backgroundImage: `url(${campaignData.photoUrl})`,
        }}
      />
      <h1 className={sharedClasses.h1}>{campaignData.name}</h1>
      <div className={classes.userContainer}>
        <div className={classes.profilePicContainer}>
          {campaignData.userPhotoUrl ? (
            <img
              className={classes.profilePic}
              src={campaignData.userPhotoUrl}
              alt="profile-picture"
            />
          ) : (
            <h4 className={`${sharedClasses.h4} ${classes.placeholder}`}>
              {campaignData.username![0].toUpperCase()}
            </h4>
          )}
        </div>
        <a
          className={`${sharedClasses.h4} ${sharedClasses.link}`}
          href={`${routes.ACCOUNT}?uid=${campaignData.uid}`}
        >
          {campaignData.username!}
        </a>
        {auth.currentUser?.uid === campaignData.uid && (
          <div className={classes.buttonHolder}>
            <a
              href={`${routes.EDIT_CAMPAIGN}?id=${campaignData.id}`}
              className={`${classes.editButton} ${sharedClasses.h3}`}
            >
              <i className="fas fa-edit" />
            </a>
          </div>
        )}
      </div>
    </>
  );

  const additionalInfo = campaignData && (
    <>
      <div className={`${sharedClasses.p} ${classes.textInfo}`}>
        <span>Funding</span>
        {campaignData.currentAmount} Ether / {campaignData.goal} Ether (
        {formatNumber(
          Math.round((campaignData.currentAmount / campaignData.goal) * 100),
        )}
        %)
        <span>Manager</span>
        {campaignData.manager}
        <span>Created</span>
        {formatTimeLong(new Date(campaignData.isoTime))}
      </div>
      <div className={classes.gridContainer}>
        <InfoItem
          title="Minimum Contribution"
          value={`${campaignData.minimumContribution} ETH`}
          description="Minimum Amount required to become a contributor"
        />
        <InfoItem
          title="Balance"
          value={`${campaignData.balance} ETH`}
          description="Funds available for Transaction by the Campaign"
        />
        <InfoItem
          title="Number of Requests"
          value={campaignData.requestCount}
          description="Number of Transaction Requests"
        />
        <InfoItem
          title="Number of Contributors"
          value={campaignData.contributorsCount}
          description="Number of Contributors"
        />
      </div>
    </>
  );

  const description = campaignData && (
    <pre className={classes.description}>{campaignData.description}</pre>
  );

  const interaction = isLoading ? (
    <></>
  ) : !auth.currentUser ? (
    <div className={`${classes.textInfo} ${sharedClasses.p}`}>
      <span>Login to contribute and view the requests</span>
    </div>
  ) : (
    <>
      {!isContributor && (
        <Contribute
          contribution={contribution}
          contributionError={contributionError}
          error={interactionError}
          isLoading={isInteractionLoading}
          minimumContribution={campaignData!.minimumContribution}
          handleContribute={handleContribute}
          setContribution={setContribution}
        />
      )}
      <>
        <h2 className={sharedClasses.h2}>Requests</h2>
        {campaignData!.requestCount === 0 && (
          <p
            className={sharedClasses.p}
            style={{
              marginBottom: '0',
            }}
          >
            No requests yet
          </p>
        )}
        {isManager && (
          <CreateRequest
            balance={+campaignData!.balance}
            id={campaignData!.id}
            addRequest={addRequest}
          />
        )}
        <div className={classes.requestsContainer}>
          {campaignData!.requestCount > 0 &&
            campaignData!.requests
              .map((request, index) => (
                <Request
                  approvalError={approvalErrors[index]}
                  approved={approvals[index]}
                  contributorsCount={campaignData!.contributorsCount}
                  request={request}
                  index={index}
                  isContributor={isContributor}
                  isLoading={isInteractionLoading}
                  isManager={isManager}
                  handleApprove={handleApprove}
                  handleFinalize={handleFinalize}
                  key={index}
                />
              ))
              .reverse()}
        </div>
      </>
    </>
  );

  return (
    <Layout faqLink={routes.FAQ} sidebarAddition={interaction}>
      <div>
        {isLoading ? (
          <div className={classes.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          topSection
        )}

        {additionalInfo}
        {description}
      </div>
    </Layout>
  );
}
