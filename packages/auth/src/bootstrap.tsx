import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const authMountPoint = document.getElementById('_auth-dev-root');
if (process.env.NODE_ENV === 'development' && authMountPoint) {
  ReactDOM.render(<App />, authMountPoint);
}
