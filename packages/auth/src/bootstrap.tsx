import {
  History,
  MemoryHistory,
  createBrowserHistory,
  createMemoryHistory,
} from 'history';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

interface IMountOptions {
  defaultHistory?: History | MemoryHistory;
  initialPath?: string;
  onNavigate?: () => void;
}

const mount = (
  mountPoint: HTMLElement,
  { defaultHistory, initialPath, onNavigate }: IMountOptions,
) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: initialPath ? [initialPath] : ['/signin'],
    });
  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, mountPoint);
};

const authMountPoint = document.getElementById('_auth-dev-root')!;
if (process.env.NODE_ENV === 'development' && authMountPoint) {
  mount(authMountPoint, {
    defaultHistory: createBrowserHistory(),
  });
}

export { mount };
