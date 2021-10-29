import React from 'react';

import sharedClasses from '../../../common.module.css';

interface IProps {
  routes: {
    SIGN_IN: string;
    CAMPAIGNS: string;
  };
}

export default function Home({ routes }: IProps) {
  return (
    <div>
      <h1 className={sharedClasses.h1}>Home</h1>
    </div>
  );
}
