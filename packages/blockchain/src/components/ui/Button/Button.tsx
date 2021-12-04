import React from 'react';

import classes from './button.module.css';
import sharedClasses from '../../../common.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export default function Button({
  children,
  className,
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${classes.root} ${sharedClasses.p} ${
        fullWidth ? classes.fullWidth : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export { ButtonProps };
