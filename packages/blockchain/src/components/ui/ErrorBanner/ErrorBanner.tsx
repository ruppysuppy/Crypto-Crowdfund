import React from 'react';

import classes from './errorBanner.module.css';
import sharedClasses from '../../../common.module.css';

interface IProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function ErrorBanner({ children, style }: IProps) {
  return (
    <p className={`${sharedClasses.p} ${classes.banner}`} style={style}>
      <strong>{children}</strong>
    </p>
  );
}
