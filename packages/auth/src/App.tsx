import { History, MemoryHistory } from 'history';

import React from 'react';
import { Route, Router, Switch } from 'react-router';
import {
  StylesProvider,
  createGenerateClassName,
  ThemeProvider,
} from '@material-ui/core/styles';

import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';
import Layout from './components/hoc/Layout';
import theme from './shared/theme';

interface IProps {
  history: History | MemoryHistory;
}

const generateClassName = createGenerateClassName({
  productionPrefix: 'auth',
});

export default function App({ history }: IProps) {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </StylesProvider>
  );
}
