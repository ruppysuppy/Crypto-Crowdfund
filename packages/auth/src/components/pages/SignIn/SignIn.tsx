import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import { emailRegex } from '../../../shared/regex';

import classes from '../../../common.module.css';
import sharedClasses from '../../../common.module.css';

interface IProps {
  routes: {
    SIGN_IN: string;
    SIGN_UP: string;
  };
}

export default function SignIn({ routes }: IProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validate = () => {
    setEmailError('');
    setPasswordError('');
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Email is invalid');
      isValid = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }
  };

  return (
    <section>
      <h1 className={classes.h1}>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          error={!!emailError}
          helperText={emailError}
          autoFocus
          fullwidth
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          error={!!passwordError}
          helperText={passwordError}
          fullwidth
        />
        <p className={classes.p}>
          Not a member yet?{' '}
          <Link to={routes.SIGN_UP} className={sharedClasses.link}>
            Sign up
          </Link>
        </p>
        <Button type="submit">Sign In</Button>
      </form>
    </section>
  );
}
