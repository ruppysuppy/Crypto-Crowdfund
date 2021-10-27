import { History, MemoryHistory } from 'history';

import React from 'react';
import { Route, Router, Switch } from 'react-router';

import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';
import Layout from './components/hoc/Layout';

import classes from './app.module.css';

interface IProps {
  history: History | MemoryHistory;
}

export default function App({ history }: IProps) {
  return (
    <div className={classes.authRoot}>
      <Router history={history}>
        <Layout>
          <Switch>
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}
