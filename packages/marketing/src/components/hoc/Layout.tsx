import React from 'react';

import classes from './layout.module.css';

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  return <div className={classes.marketingLayoutRoot}>{children}</div>;
}
