import React, { HTMLInputTypeAttribute } from 'react';

import classes from './input.module.css';
import sharedClasses from '../../../common.module.css';

interface IProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  error?: boolean;
  helperText?: string;
  fullwidth?: boolean;
  type?: HTMLInputTypeAttribute | 'area' | undefined;
  rows?: number;
}

export default function Input({
  error,
  fullwidth,
  helperText,
  rows,
  type,
  ...props
}: IProps) {
  return (
    <>
      {type === 'area' ? (
        // @ts-ignore
        <textarea
          className={`${classes.input} ${sharedClasses.p} ${
            fullwidth && classes.fullwidth
          } ${error && classes.error}`}
          rows={rows}
          {...props}
        />
      ) : (
        <input
          className={`${classes.input} ${sharedClasses.p} ${
            fullwidth && classes.fullwidth
          } ${error && classes.error}`}
          type={type}
          {...props}
        />
      )}
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
