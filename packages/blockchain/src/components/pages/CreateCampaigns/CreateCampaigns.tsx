import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';

import Button from '../../ui/Button/Button';
import ErrorBanner from '../../ui/ErrorBanner/ErrorBanner';
import Layout from '../../hoc/Layout';
import Input from '../../ui/Input/Input';
import Spinner from '../../ui/Spinner/Spinner';
import { ICampaignServerData } from '../../../interfaces/campaign';
import { IRoutes } from '../../../interfaces/routes';
import { getFirebaseApp } from '../../../utils/firebase';
import CampaignFactory from '../../../utils/campaignFactory';
import { checkUrlImage } from '../../../utils/regex';
import web3 from '../../../utils/web3';

import classes from './createCampaigns.module.css';
import sharedClasses from '../../../common.module.css';

interface IProps {
  routes: IRoutes;
}

export default function CreateCampaigns({ routes }: IProps) {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [minContribution, setMinContribution] = useState('');
  const [minContributionError, setMinContributionError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoUrlError, setPhotoUrlError] = useState('');
  const [goal, setGoal] = useState('');
  const [goalError, setGoalError] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const history = useHistory();

  const firebaseApp = getFirebaseApp()!;
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  // workaround for redirecting to unauthenticated users
  useEffect(() => {
    setTimeout(() => {
      setShouldRedirect(!auth.currentUser);
    }, 1000);
  }, []);

  const validate = () => {
    setError('');
    setNameError('');
    setMinContributionError('');
    setDescriptionError('');
    setPhotoUrlError('');
    setGoalError('');
    let isValid = true;
    if (name.length < 5) {
      setNameError('Campaign name must contain at least 5 characters');
      isValid = false;
    }
    if (!minContribution) {
      setMinContributionError('Please enter a minimum contribution amount');
      isValid = false;
    } else if (isNaN(Number(minContribution))) {
      setMinContributionError('Minimum contribution must be a valid number');
      isValid = false;
    }
    if (!description) {
      setDescriptionError('Please enter a description');
      isValid = false;
    }
    if (!goal) {
      setGoalError('Please enter a goal amount');
      isValid = false;
    } else if (isNaN(Number(goal))) {
      setGoalError('Goal must be a valid number');
      isValid = false;
    }
    if (!photoUrl) {
      setPhotoUrlError('Please enter a photo url');
      isValid = false;
    } else if (!checkUrlImage(photoUrl)) {
      setPhotoUrlError('Please enter a valid image url');
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    setIsLoading(true);
    let campaignAddress: string;
    try {
      if (!web3) {
        throw new Error('Web3 Provider Error');
      }
      const [account] = await web3.eth.getAccounts();
      if (!account) {
        throw new Error('Please log into MetaMask');
      }
      await CampaignFactory.methods
        .createCampaign(web3.utils.toWei(minContribution, 'ether'))
        .send({ from: account });
      campaignAddress = await CampaignFactory.methods
        .getLastCampaign(account)
        .call();
    } catch (error) {
      // @ts-ignore
      setError(error.message);
      setIsLoading(false);
      return;
    }
    try {
      const data: ICampaignServerData = {
        name: name,
        description: description,
        photoUrl: photoUrl,
        goal: +goal,
        currentAmount: 0,
        isoTime: new Date().toISOString(),
        uid: auth.currentUser!.uid,
      };
      await setDoc(doc(firestore, 'campaigns', campaignAddress), data);
      await setDoc(doc(firestore, 'requests', campaignAddress), {
        requests: [],
      });
    } catch (error) {
      // @ts-ignore
      setError(error.code);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    history.push(routes.CAMPAIGNS);
  };

  if (shouldRedirect) {
    return <Redirect to={routes.SIGN_IN} />;
  }

  return (
    <Layout faqLink={routes.FAQ}>
      <h1 className={sharedClasses.h1}>Create Campaign</h1>

      <form onSubmit={handleSubmit}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Campaign Name"
          error={!!nameError}
          helperText={nameError}
          autoFocus
          fullwidth
        />
        <div className={classes.postfixGrid}>
          <div>
            <Input
              value={minContribution}
              onChange={(e) => setMinContribution(e.target.value)}
              placeholder="Minimum Contribution"
              error={!!minContributionError}
              helperText={minContributionError}
              type="number"
              fullwidth
            />
          </div>
          <p className={`${classes.postfixGridInfo} ${sharedClasses.p}`}>
            ETHER
          </p>
        </div>
        <div className={classes.postfixGrid}>
          <div>
            <Input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Goal Target"
              error={!!goalError}
              helperText={goalError}
              type="number"
              step={minContribution || '0.01'}
              fullwidth
            />
          </div>
          <p className={`${classes.postfixGridInfo} ${sharedClasses.p}`}>
            ETHER
          </p>
        </div>
        <Input
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          placeholder="Cover Photo URL"
          error={!!photoUrlError}
          helperText={photoUrlError}
          fullwidth
        />
        <Input
          type="area"
          placeholder="Description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!descriptionError}
          helperText={descriptionError}
          fullwidth
        />
        {error && <ErrorBanner>{error}</ErrorBanner>}
        {isLoading ? (
          <Spinner />
        ) : (
          <Button type="submit">Create Campaign</Button>
        )}
      </form>
    </Layout>
  );
}
