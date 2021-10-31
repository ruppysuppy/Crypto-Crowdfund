import React, { useState } from 'react';

import classes from './accordian.module.css';
import sharedClasses from '../../../common.module.css';

interface IProps {
  title: string;
  children: React.ReactNode;
}

export default function Accordian({ title, children }: IProps) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={`${classes.accordianRoot} ${isActive && classes.active}`}>
      <button
        className={`${classes.accordion} ${sharedClasses.p}`}
        onClick={() => setIsActive(!isActive)}
      >
        <span>{title}</span>
        <i className="fas fa-chevron-down" />
      </button>
      <div className={`${classes.panel} ${sharedClasses.p}`}>{children}</div>
    </div>
  );
}
