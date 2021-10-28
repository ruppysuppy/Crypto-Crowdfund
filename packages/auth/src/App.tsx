import { History, MemoryHistory } from 'history';

import React from 'react';
import { Route, Router, Switch } from 'react-router';

import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';
import Layout from './components/hoc/Layout';

import classes from './app.module.css';

interface IProps {
  history: History | MemoryHistory;
  routes: {
    SIGN_IN: string;
    SIGN_UP: string;
    FAQ: string;
  };
}

export default function App({ history, routes }: IProps) {
  return (
    <div className={classes.authRoot}>
      <Router history={history}>
        <Layout faqLink={routes.FAQ}>
          <Switch>
            <Route exact path={routes.SIGN_IN}>
              <SignIn routes={routes} />
            </Route>
            <Route exact path={routes.SIGN_UP}>
              <SignUp routes={routes} />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}
