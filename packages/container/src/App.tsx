import { createBrowserHistory } from 'history';

import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';

import Layout from './components/hoc/Layout';
import Error404 from './components/pages/Error404';
import AuthApp from './components/remotes/AuthApp';
import BlockchainApp from './components/remotes/BlockchainApp';
import MarketingApp from './components/remotes/MarketingApp';
import routes from './shared/routes';
import { IUser } from './interfaces/user';
import { auth } from './shared/firebase';

const history = createBrowserHistory();

export default function App() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user || null));
  }, []);

  const redirect = <Redirect to={routes.CAMPAIGNS} />;

  const validRoutes = (
    <Switch>
      <Route exact path={routes.SIGN_IN}>
        {user ? redirect : <AuthApp setUser={setUser} />}
      </Route>
      <Route exact path={routes.SIGN_UP}>
        {user ? redirect : <AuthApp setUser={setUser} />}
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
      <Route exact path={routes.CAMPAIGNS}>
        <BlockchainApp />
      </Route>
      <Route exact path={routes.CAMPAIGN}>
        <BlockchainApp />
      </Route>
      <Route exact path={routes.ACCOUNT}>
        <BlockchainApp />
      </Route>
      <Route>
        <Error404 />
      </Route>
    </Switch>
  );

  return (
    <Router history={history}>
      <Layout user={user}>{validRoutes}</Layout>
    </Router>
  );
}
