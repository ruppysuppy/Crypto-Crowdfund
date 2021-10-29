import { History, MemoryHistory } from 'history';

import React from 'react';
import { Route, Router, Switch } from 'react-router';

import Layout from './components/hoc/Layout';

import classes from './app.module.css';

interface IProps {
  history: History | MemoryHistory;
  routes: {
    HOME: string;
    ABOUT: string;
    FAQ: string;
    TERMS_AND_CONDITIONS: string;
    PRIVACY_POLICY: string;
    DISCLAIMER: string;
  };
}

export default function App({ history, routes }: IProps) {
  return (
    <div className={classes.marketingRoot}>
      <Layout>
        <Router history={history}>
          <h1>Martketing</h1>
        </Router>
      </Layout>
    </div>
  );
}
