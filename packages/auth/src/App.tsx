import { History, MemoryHistory } from 'history';

import { Auth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { Route, Router, Switch } from 'react-router';

import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';
import Layout from './components/hoc/Layout';
import { IOnAuthStateChanged } from './shared/authTypes';

import classes from './app.module.css';

interface IProps {
  auth: Auth;
  history: History | MemoryHistory;
  routes: {
    CAMPAIGNS: string;
    FAQ: string;
    SIGN_IN: string;
    SIGN_UP: string;
  };
  onAuthStateChangedHandler?: IOnAuthStateChanged;
}

export default function App({
  auth,
  history,
  routes,
  onAuthStateChangedHandler,
}: IProps) {
  if (onAuthStateChangedHandler) {
    onAuthStateChanged(auth, onAuthStateChangedHandler);
  }

  return (
    <div className={classes.authRoot}>
      <Router history={history}>
        <Layout faqLink={routes.FAQ}>
          <Switch>
            <Route exact path={routes.SIGN_IN}>
              <SignIn
                routes={routes}
                auth={auth}
                onAuthStateChangedHandler={onAuthStateChangedHandler}
              />
            </Route>
            <Route exact path={routes.SIGN_UP}>
              <SignUp
                routes={routes}
                auth={auth}
                onAuthStateChangedHandler={onAuthStateChangedHandler}
              />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}
