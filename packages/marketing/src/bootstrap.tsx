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
    HOME: string;
    ABOUT: string;
    FAQ: string;
    TERMS_AND_CONDITIONS: string;
    PRIVACY_POLICY: string;
    DISCLAIMER: string;
    CAMPAIGNS: string;
    SIGN_IN: string;
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

const authMountPoint = document.getElementById('_marketing-dev-root')!;
const isStandAlone = process.env.NODE_ENV === 'development' && authMountPoint;

if (isStandAlone) {
  mount(authMountPoint, {
    defaultHistory: createBrowserHistory(),
    routes: {
      HOME: '/',
      ABOUT: '/about',
      FAQ: '/faq',
      TERMS_AND_CONDITIONS: '/terms-and-conditions',
      PRIVACY_POLICY: '/privacy-policy',
      DISCLAIMER: '/disclaimer',
      CAMPAIGNS: '/campaigns',
      SIGN_IN: '/sign-in',
    },
  });
}

export { mount };
