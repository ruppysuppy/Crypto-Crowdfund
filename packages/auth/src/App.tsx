import { History, MemoryHistory } from 'history';

import React from 'react';
import { Route, Router, Switch } from 'react-router';

import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';

interface IProps {
  history: History | MemoryHistory;
}

export default function App({ history }: IProps) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}
