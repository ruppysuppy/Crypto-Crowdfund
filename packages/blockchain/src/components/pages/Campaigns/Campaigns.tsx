import React, { useEffect } from 'react';

import Layout from '../../hoc/Layout';
import Button from '../../ui/Button/Button';
import { IRoutes } from '../../../interfaces/routes';
import { getCampaign } from '../../../utils/campaign';
import CampaignFactory from '../../../utils/campaignFactory';

interface IProps {
  routes: IRoutes;
}

export default function Campaigns({ routes }: IProps) {
  useEffect(() => {
    (async () => {
      const campaignAddresses: string[] = await CampaignFactory.methods
        .getDeployedCampaigns()
        .call();
      const campaigns = campaignAddresses.map((address) =>
        getCampaign(address),
      );
      console.log(campaigns);
    })();
  }, []);

  const createCampaignBtn = (
    <a href={routes.CREATE_CAMPAIGN}>
      <Button fullWidth>Create Campaign</Button>
    </a>
  );

  return (
    <Layout faqLink={routes.FAQ} sidebarAddition={createCampaignBtn}>
      <h1>Campaigns</h1>
    </Layout>
  );
}
