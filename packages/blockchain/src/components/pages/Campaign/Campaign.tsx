import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Layout from '../../hoc/Layout';
import Spinner from '../../ui/Spinner/Spinner';
import { ICampaign, ICampaignCompleteData } from '../../../interfaces/campaign';
import { IRoutes } from '../../../interfaces/routes';
import { getCampaign } from '../../../utils/campaign';
import { getFirebaseApp } from '../../../utils/firebase';
import { formatNumber, formatTimeLong } from '../../../utils/format';
import web3 from '../../../utils/web3';

import sharedClasses from '../../../common.module.css';
import classes from './campaign.module.css';
import InfoItem from './InfoItem/InfoItem';

interface IProps {
  routes: IRoutes;
}

export default function Campaign({ routes }: IProps) {
  const [campaignData, setCampaignData] = useState<ICampaignCompleteData>();
  const [isLoading, setIsLoading] = useState(true);

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

        setCampaignData({
          ...campaignData,
          username: user.username,
          userPhotoUrl: user.photoUrl,
          manager: manager,
          balance: balance,
          minimumContribution: minimumContribution,
          requestCount: requestCount,
          contributorsCount: contributorsCount,
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

  const topSection = campaignData && (
    <>
      <div
        className={classes.coverImgHolder}
        style={{
          backgroundImage: `url(${campaignData.photoUrl})`,
        }}
      />
      <h2 className={sharedClasses.h2}>{campaignData.name}</h2>
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
        <Link
          to={`${routes.ACCOUNT}?uid=${campaignData.uid}`}
          className={`${sharedClasses.h4} ${sharedClasses.link}`}
        >
          {campaignData.username!}
        </Link>
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
        <strong>Funding</strong>
        {campaignData.currentAmount} Ether / {campaignData.goal} Ether (
        {formatNumber(
          Math.round((campaignData.currentAmount / campaignData.goal) * 100),
        )}
        %)
        <strong>Manager</strong>
        {campaignData.manager}
        <strong>Created</strong>
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

  return (
    <Layout faqLink={routes.FAQ}>
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
