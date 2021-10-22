import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const mount = (mountPoint: HTMLElement) => {
  ReactDOM.render(<App />, mountPoint);
};

const mountPoint = document.getElementById('root')!;
mount(mountPoint);
