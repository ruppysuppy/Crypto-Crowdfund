import { Button, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useSharedStyles } from '../../../shared/theme';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sharedClasses = useSharedStyles();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <Typography variant="h4" className={sharedClasses.primaryText}>
        Sign In
      </Typography>
      <br />

      <form onSubmit={handleSubmit}>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          label="Email"
          type="email"
          autoFocus
          fullWidth
        />
        <br /> <br />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          label="Password"
          type="password"
          fullWidth
        />
        <br /> <br />
        <Typography variant="body2">
          Not a member yet?{' '}
          <Link to="/signup" className={sharedClasses.link}>
            Sign up
          </Link>
        </Typography>
        <br />
        <Button variant="outlined" type="submit">
          Sign In
        </Button>
      </form>
    </div>
  );
}
