import { createBrowserHistory } from 'history';

import React from 'react';
import { Route, Router, Switch } from 'react-router';

import Layout from './components/hoc/Layout';
import Error404 from './components/pages/Error404';
import AuthApp from './components/remotes/AuthApp';
import routes from './shared/routes';

const history = createBrowserHistory();

export default function App() {
  const validRoutes = (
    <Switch>
      <Route exact path={routes.SIGN_IN}>
        <AuthApp />
      </Route>
      <Route exact path={routes.SIGN_UP}>
        <AuthApp />
      </Route>
      <Route>
        <Error404 />
      </Route>
    </Switch>
  );

  return (
    <Router history={history}>
      <Layout>{validRoutes}</Layout>
    </Router>
  );
}
