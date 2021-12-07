import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import Button from '../../ui/Button/Button';
import Campaign from '../../ui/Campaign/Campaign';
import ErrorBanner from '../../ui/ErrorBanner/ErrorBanner';
import Layout from '../../hoc/Layout';
import Spinner from '../../ui/Spinner/Spinner';
import { IRoutes } from '../../../interfaces/routes';
import CampaignFactory from '../../../utils/campaignFactory';
import { ICampaign, ICampaignServerData } from '../../../interfaces/campaign';
import { getFirebaseApp } from '../../../utils/firebase';

import sharedClasses from '../../../common.module.css';
import classes from './campaigns.module.css';

interface IProps {
  routes: IRoutes;
}

export default function Campaigns({ routes }: IProps) {
  const [campaignData, setCampaignData] = useState<ICampaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      let campaignAddresses: string[] = [];
      let campaigns: ICampaign[] = [];
      setLoading(true);
      try {
        campaignAddresses = await CampaignFactory.methods
          .getDeployedCampaigns()
          .call();
      } catch (error) {
        // @ts-ignore
        setError(error.message);
        setLoading(false);
        return;
      }
      const firebaseApp = getFirebaseApp()!;
      const firestore = getFirestore(firebaseApp);
      try {
        const campaignPromiseArr = campaignAddresses.map(
          async (address: string) => {
            const snapshot = await getDoc(doc(firestore, 'campaigns', address));
            return {
              id: address,
              ...(snapshot.data() as ICampaignServerData),
            };
          },
        );
        const campaignsWithoutUsername = await Promise.all(campaignPromiseArr);
        const campaignsWithUsernamePromiseArr = campaignsWithoutUsername.map(
          async (campaign: ICampaign) => {
            const snapshot = await getDoc(
              doc(firestore, 'users', campaign.uid),
            );
            return {
              ...campaign,
              username: snapshot.data()!.username,
            } as ICampaign;
          },
        );
        campaigns = await Promise.all(campaignsWithUsernamePromiseArr);
      } catch (error) {
        // @ts-ignore
        setError(error.code);
        setLoading(false);
        return;
      }
      setCampaignData(campaigns);
      setLoading(false);
    })();
  }, []);

  const createCampaignBtn = (
    <a href={routes.CREATE_CAMPAIGN}>
      <Button fullWidth>Create Campaign</Button>
    </a>
  );

  return (
    <Layout faqLink={routes.FAQ} sidebarAddition={createCampaignBtn}>
      <h1 className={sharedClasses.h1}>Campaigns</h1>
      {loading ? (
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      ) : error ? (
        <ErrorBanner>{error}</ErrorBanner>
      ) : (
        campaignData.map((campaign) => (
          <Campaign key={campaign.id} campaign={campaign} routes={routes} />
        ))
      )}
    </Layout>
  );
}
