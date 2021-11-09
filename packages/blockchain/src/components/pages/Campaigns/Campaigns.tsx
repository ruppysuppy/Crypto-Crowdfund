import React from 'react';

import Layout from '../../hoc/Layout';
import { IRoutes } from '../../../interfaces/routes';

interface IProps {
  routes: IRoutes;
}

export default function Campaigns({ routes }: IProps) {
  return (
    <Layout faqLink={routes.FAQ}>
      <h1>Campaigns</h1>
    </Layout>
  );
}
