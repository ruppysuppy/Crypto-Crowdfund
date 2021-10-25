import { createBrowserHistory } from 'history';

import React from 'react';
import { Route, Router, Switch } from 'react-router';

import Layout from './components/hoc/Layout';
import AuthApp from './components/remotes/AuthApp';

const history = createBrowserHistory();

export default function App() {
  const validRoutes = (
    <Switch>
      <Route exact path="/signin">
        <AuthApp />
      </Route>
      <Route exact path="/signup">
        <AuthApp />
      </Route>
    </Switch>
  );

  return (
    <Router history={history}>
      <Layout>{validRoutes}</Layout>
    </Router>
  );
}
