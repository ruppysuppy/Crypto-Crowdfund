import { createBrowserHistory } from 'history';

import { onAuthStateChanged } from 'firebase/auth';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';

import Error404 from './components/pages/Error404/Error404';
import Layout from './components/hoc/Layout';
import Loading from './components/pages/Loading/Loading';
import routes from './shared/routes';
import { IUser } from './interfaces/user';
import { auth } from './shared/firebase';

const AuthApp = lazy(() => import('./components/remotes/AuthApp'));
const BlockchainApp = lazy(() => import('./components/remotes/BlockchainApp'));
const MarketingApp = lazy(() => import('./components/remotes/MarketingApp'));

const history = createBrowserHistory();

export default function App() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) =>
      setUser(
        user
          ? {
              uid: user.uid,
              username: user.displayName,
              photoURL: user.photoURL,
            }
          : null,
      ),
    );
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
      <Layout>
        <Suspense fallback={<Loading />}>{validRoutes}</Suspense>
      </Layout>
    </Router>
  );
}
