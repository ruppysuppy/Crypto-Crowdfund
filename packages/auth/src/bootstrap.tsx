import {
  History,
  MemoryHistory,
  createBrowserHistory,
  createMemoryHistory,
} from 'history';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

interface IOnNavigateProps {
  pathname: string;
}

interface IMountOptions {
  defaultHistory?: History | MemoryHistory;
  initialPath?: string;
  onNavigate?: (props: IOnNavigateProps) => void;
  routes: {
    SIGN_IN: string;
    SIGN_UP: string;
  };
}

const mount = (
  mountPoint: HTMLElement,
  { defaultHistory, initialPath, onNavigate, routes }: IMountOptions,
) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: initialPath ? [initialPath] : ['/sign-in'],
    });
  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} routes={routes} />, mountPoint);

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
    routes: {
      SIGN_IN: '/sign-in',
      SIGN_UP: '/sign-up',
    },
  });
}

export { mount };
