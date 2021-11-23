import React from 'react';

import classes from './errorBanner.module.css';
import sharedClasses from '../../../common.module.css';

interface IProps {
  children: React.ReactNode;
}

export default function ErrorBanner({ children }: IProps) {
  return (
    <p className={`${sharedClasses.p} ${classes.banner}`}>
      <strong>{children}</strong>
    </p>
  );
}
