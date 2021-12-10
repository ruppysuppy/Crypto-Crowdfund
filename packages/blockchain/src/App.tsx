import { History, MemoryHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router';

import Account from './components/pages/Account/Account';
import Campaign from './components/pages/Campaign/Campaign';
import Campaigns from './components/pages/Campaigns/Campaigns';
import CreateCampaigns from './components/pages/CreateCampaigns/CreateCampaigns';
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
          <Route exact path={routes.CAMPAIGN}>
            <Campaign routes={routes} />
          </Route>
          <Route exact path={routes.CAMPAIGNS}>
            <Campaigns routes={routes} />
          </Route>
          <Route exact path={routes.CREATE_CAMPAIGN}>
            <CreateCampaigns routes={routes} />
          </Route>
          <Route exact path={routes.ACCOUNT}>
            <Account routes={routes} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
