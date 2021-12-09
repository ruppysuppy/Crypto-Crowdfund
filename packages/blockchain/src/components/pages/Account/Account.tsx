import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query as firestoreQuery,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

import AccountDetailsContainer from './AccountDetailsContainer/AccountDetailsContainer';
import Campaign from '../../ui/Campaign/Campaign';
import Layout from '../../hoc/Layout';
import Spinner from '../../ui/Spinner/Spinner';
import { ICampaign } from '../../../interfaces/campaign';
import { IRoutes } from '../../../interfaces/routes';
import { IUser } from '../../../interfaces/user';
import { getFirebaseApp } from '../../../utils/firebase';

import classes from './account.module.css';

interface IProps {
  routes: IRoutes;
}

export default function Account({ routes }: IProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [campaignData, setCampaignData] = useState<ICampaign[]>([]);

  const redirectComponent = <Redirect to={routes.CAMPAIGNS} />;
  const firebaseApp = getFirebaseApp()!;
  const firestore = getFirestore(firebaseApp);

  useEffect(() => {
    const getUser = async () => {
      const url = new URL(window.location.href);
      const uid = url.searchParams.get('uid');
      if (!uid) {
        setIsLoading(false);
        return;
      }
      let username: string = '';
      try {
        const userDoc = await getDoc(doc(firestore, 'users', uid));
        const userData = userDoc.exists()
          ? { ...(userDoc.data() as IUser), uid: userDoc.id }
          : null;
        setUser(userData);
        setIsLoading(false);
        username = userData?.username || '';
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        return;
      }
      try {
        const campaignQuery = firestoreQuery(
          collection(firestore, 'campaigns'),
          where('uid', '==', uid),
        );
        const snapshot = await getDocs(campaignQuery);
        const campaignData = snapshot.docs.map(
          (doc) => ({ ...doc.data(), username: username } as ICampaign),
        );
        setCampaignData(campaignData);
        setIsDataLoading(false);
      } catch (error) {
        console.error(error);
        setIsDataLoading(false);
      }
    };
    getUser();
  }, []);

  if (!isLoading && !user) {
    return redirectComponent;
  }

  return (
    <Layout faqLink={routes.FAQ}>
      <div>
        {isLoading ? (
          <div className={classes.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          <>
            <AccountDetailsContainer user={user!} setUser={setUser} />
            <hr className={classes.hr} />
            {isDataLoading ? (
              <div className={classes.spinnerContainer}>
                <Spinner />
              </div>
            ) : (
              campaignData.map((campaign) => (
                <Campaign
                  campaign={campaign}
                  key={campaign.id}
                  routes={routes}
                />
              ))
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
