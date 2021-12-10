import React from 'react';

import sharedClasses from '../../../../common.module.css';
import classes from './infoItem.module.css';

interface IProps {
  description: string;
  title: string;
  value: string | number;
}

export default function InfoItem({ description, title, value }: IProps) {
  return (
    <div className={classes.root}>
      <strong className={sharedClasses.h3}>{title}</strong>
      <span className={`${classes.value} ${sharedClasses.h3}`}>{value}</span>
      <span className={`${classes.description} ${sharedClasses.p}`}>
        {description}
      </span>
    </div>
  );
}
