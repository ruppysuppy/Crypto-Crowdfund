import React from 'react';

import classes from './button.module.css';
import sharedClasses from '../../../common.module.css';

export default function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${classes.root} ${sharedClasses.p} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
