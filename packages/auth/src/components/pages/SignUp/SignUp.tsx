import React from 'react';
import { Typography } from '@material-ui/core';

import { useSharedStyles } from '../../../shared/theme';

export default function SignUp() {
  const sharedClasses = useSharedStyles();

  return (
    <div>
      <Typography variant="h4" className={sharedClasses.primaryText}>
        Sign Up
      </Typography>
    </div>
  );
}
