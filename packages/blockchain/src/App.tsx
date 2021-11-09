import { History, MemoryHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router';

import Account from './components/pages/Account/Account';
import Campaigns from './components/pages/Campaigns/Campaigns';
import { IRoutes } from './interfaces/routes';

import classes from './app.module.css';

interface IProps {
  history: History | MemoryHistory;
  routes: IRoutes;
}

export default function App({ history, routes }: IProps) {
  return (
    <div className={classes.root}>
      <Router history={history}>
        <Switch>
          <Route exact path={routes.CAMPAIGNS}>
            <Campaigns routes={routes} />
          </Route>
          <Route path={routes.ACCOUNT}>
            <Account routes={routes} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
