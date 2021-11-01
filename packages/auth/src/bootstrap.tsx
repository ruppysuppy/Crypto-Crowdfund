import {
  History,
  MemoryHistory,
  createBrowserHistory,
  createMemoryHistory,
} from 'history';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { IOnAuthStateChanged } from './shared/authTypes';

interface IOnNavigateProps {
  pathname: string;
}

interface IMountOptions {
  defaultHistory?: History | MemoryHistory;
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    appId: string;
  };
  initialPath?: string;
  routes: {
    CAMPAIGNS: string;
    FAQ: string;
    SIGN_IN: string;
    SIGN_UP: string;
  };
  onAuthStateChangedHandler?: IOnAuthStateChanged;
  onNavigate?: (props: IOnNavigateProps) => void;
}

const mount = (
  mountPoint: HTMLElement,
  {
    defaultHistory,
    firebaseConfig,
    initialPath,
    routes,
    onAuthStateChangedHandler,
    onNavigate,
  }: IMountOptions,
) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: initialPath ? [initialPath] : ['/sign-in'],
    });
  if (onNavigate) {
    history.listen(onNavigate);
  }

  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);

  ReactDOM.render(
    <App
      auth={auth}
      history={history}
      routes={routes}
      onAuthStateChangedHandler={onAuthStateChangedHandler}
    />,
    mountPoint,
  );

  return {
    onParentNavigate: ({ pathname: nextPathname }) => {
      const { pathname } = history.location;
      if (nextPathname !== pathname) {
        history.push(nextPathname);
      }
    },
  };
};

const authMountPoint = document.getElementById('_auth-dev-root')!;
const isStandAlone = process.env.NODE_ENV === 'development' && authMountPoint;

if (isStandAlone) {
  mount(authMountPoint, {
    defaultHistory: createBrowserHistory(),
    firebaseConfig: {
      apiKey: process.env.API_KEY as string,
      authDomain: process.env.AUTH_DOMAIN as string,
      projectId: process.env.PROJECT_ID as string,
      appId: process.env.APP_ID as string,
    },
    routes: {
      CAMPAIGNS: '/campaigns',
      SIGN_IN: '/sign-in',
      SIGN_UP: '/sign-up',
      FAQ: '/faq',
    },
  });
}

export { mount };
