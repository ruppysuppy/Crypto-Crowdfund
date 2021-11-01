import { createBrowserHistory } from 'history';

import React, { useState } from 'react';
import { Route, Router, Switch } from 'react-router';

import Layout from './components/hoc/Layout';
import Error404 from './components/pages/Error404';
import AuthApp from './components/remotes/AuthApp';
import MarketingApp from './components/remotes/MarketingApp';
import routes from './shared/routes';
import { IUser } from './interfaces/user';

const history = createBrowserHistory();

export default function App() {
  const [user, setUser] = useState<IUser | null>(null);

  const validRoutes = (
    <Switch>
      <Route exact path={routes.SIGN_IN}>
        <AuthApp setUser={setUser} />
      </Route>
      <Route exact path={routes.SIGN_UP}>
        <AuthApp setUser={setUser} />
      </Route>
      <Route exact path={routes.HOME}>
        <MarketingApp user={user} />
      </Route>
      <Route exact path={routes.ABOUT}>
        <MarketingApp user={user} />
      </Route>
      <Route exact path={routes.FAQ}>
        <MarketingApp user={user} />
      </Route>
      <Route exact path={routes.TERMS_AND_CONDITIONS}>
        <MarketingApp user={user} />
      </Route>
      <Route exact path={routes.PRIVACY_POLICY}>
        <MarketingApp user={user} />
      </Route>
      <Route exact path={routes.DISCLAIMER}>
        <MarketingApp user={user} />
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
