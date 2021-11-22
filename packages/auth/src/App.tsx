import { History, MemoryHistory } from 'history';
import { FirebaseApp } from '@firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { Route, Router, Switch } from 'react-router';

import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';
import Layout from './components/hoc/Layout';
import { IOnAuthStateChanged } from './shared/authTypes';

import classes from './app.module.css';

interface IProps {
  firebaseApp: FirebaseApp;
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
  firebaseApp,
  history,
  routes,
  onAuthStateChangedHandler,
}: IProps) {
  const auth = getAuth(firebaseApp);
  if (onAuthStateChangedHandler) {
    onAuthStateChanged(auth, (user) =>
      onAuthStateChangedHandler(
        user
          ? {
              uid: user.uid,
              username: user.displayName,
              photoURL: user.photoURL,
            }
          : null,
      ),
    );
  }

  return (
    <div className={classes.authRoot}>
      <Router history={history}>
        <Layout faqLink={routes.FAQ}>
          <Switch>
            <Route exact path={routes.SIGN_IN}>
              <SignIn
                routes={routes}
                firebaseApp={firebaseApp}
                onAuthStateChangedHandler={onAuthStateChangedHandler}
              />
            </Route>
            <Route exact path={routes.SIGN_UP}>
              <SignUp
                routes={routes}
                firebaseApp={firebaseApp}
                onAuthStateChangedHandler={onAuthStateChangedHandler}
              />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}
