import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';

import Layout from '../../hoc/Layout';
import Input from '../../ui/Input/Input';
import ErrorBanner from '../../ui/ErrorBanner/ErrorBanner';
import Spinner from '../../ui/Spinner/Spinner';
import Button from '../../ui/Button/Button';
import { ICampaignServerData } from '../../../interfaces/campaign';
import { IRoutes } from '../../../interfaces/routes';
import { getFirebaseApp } from '../../../utils/firebase';
import { checkUrlImage } from '../../../utils/regex';

import classes from './editCampaign.module.css';
import sharedClasses from '../../../common.module.css';

interface IProps {
  routes: IRoutes;
}

export default function EditCampaign({ routes }: IProps) {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoUrlError, setPhotoUrlError] = useState('');
  const [goal, setGoal] = useState('');
  const [goalError, setGoalError] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const history = useHistory();

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
        if (!campaignDoc.exists()) {
          setShouldRedirect(true);
          return;
        }
        const campaign = {
          ...(campaignDoc.data() as ICampaignServerData),
          id,
        };
        setName(campaign.name);
        setDescription(campaign.description);
        setPhotoUrl(campaign.photoUrl);
        setGoal(`${campaign.goal}`);
        setIsLoading(false);
      } catch (error) {
        // @ts-ignore
        setError(error.code);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // workaround for redirecting to unauthenticated users
  useEffect(() => {
    setTimeout(() => {
      setShouldRedirect(!auth.currentUser);
    }, 1000);
  }, []);

  const validate = () => {
    setError('');
    setNameError('');
    setDescriptionError('');
    setPhotoUrlError('');
    setGoalError('');
    let isValid = true;
    if (name.length < 5) {
      setNameError('Campaign name must contain at least 5 characters');
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
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id')!;
    try {
      const data = {
        name: name,
        description: description,
        photoUrl: photoUrl,
        goal: +goal,
      };
      await updateDoc(doc(firestore, 'campaigns', id), data);
      setIsLoading(false);
      history.push(routes.CAMPAIGNS);
    } catch (error) {
      // @ts-ignore
      setError(error.code);
      setIsLoading(false);
      return;
    }
  };

  if (shouldRedirect) {
    return <Redirect to={routes.SIGN_IN} />;
  }

  return (
    <Layout faqLink={routes.FAQ}>
      <h1 className={sharedClasses.h1}>Edit Campaign</h1>

      {isLoading ? (
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      ) : (
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
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Goal Target"
                error={!!goalError}
                helperText={goalError}
                type="number"
                step={'0.01'}
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
            <Button type="submit">Save Changes</Button>
          )}
        </form>
      )}
    </Layout>
  );
}
