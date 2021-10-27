import React from 'react';

import classes from './input.module.css';
import sharedClasses from '../../../common.module.css';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
  fullwidth?: boolean;
}

export default function Input({
  error,
  fullwidth,
  helperText,
  ...props
}: IProps) {
  return (
    <>
      <input
        className={`${classes.input} ${sharedClasses.p} ${
          fullwidth && classes.fullwidth
        } ${error && classes.error}`}
        {...props}
      />
      {helperText && (
        <p
          className={`${sharedClasses.p} ${classes.helperText} ${
            error && classes.helperTextError
          }`}
        >
          {helperText}
        </p>
      )}
    </>
  );
}
