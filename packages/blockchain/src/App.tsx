import { History, MemoryHistory } from 'history';
import React from 'react';

import classes from './app.module.css';

interface IProps {
  history: History | MemoryHistory;
  routes: {
    CAMPAIGNS: string;
    CAMPAIGN: string;
    ACCOUNT: string;
    FAQ: string;
  };
}

export default function App({ history, routes }: IProps) {
  return (
    <div className={classes.root}>
      <h1>Blockchain</h1>
    </div>
  );
}
