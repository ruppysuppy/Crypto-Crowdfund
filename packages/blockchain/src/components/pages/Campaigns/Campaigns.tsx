import React, { useEffect } from 'react';

import Layout from '../../hoc/Layout';
import { IRoutes } from '../../../interfaces/routes';
import CampaignFactory from '../../../utils/campaignFactory';

interface IProps {
  routes: IRoutes;
}

export default function Campaigns({ routes }: IProps) {
  useEffect(() => {
    (async () => {
      const campaigns = await CampaignFactory.methods
        .getDeployedCampaigns()
        .call();
      console.log(campaigns);
    })();
  }, []);

  return (
    <Layout faqLink={routes.FAQ}>
      <h1>Campaigns</h1>
    </Layout>
  );
}
