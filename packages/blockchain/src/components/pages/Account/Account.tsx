import React from 'react';
import { Redirect } from 'react-router';

import Layout from '../../hoc/Layout';
import { IRoutes } from '../../../interfaces/routes';
import useQuery from '../../../hooks/useQuery';

interface IProps {
  routes: IRoutes;
}

export default function Account({ routes }: IProps) {
  const query = useQuery();
  let uid = query.get('uid');
  const redirectComponent = <Redirect to={routes.CAMPAIGNS} />;

  if (!uid) {
    const url = new URL(window.location.href);
    const param = url.searchParams.get('uid');
    if (!param) {
      return redirectComponent;
    }
    uid = param;
  }

  return (
    <Layout faqLink={routes.FAQ}>
      <h1>Account</h1>
    </Layout>
  );
}
