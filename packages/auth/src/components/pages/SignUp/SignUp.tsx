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
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validate = () => {
    setEmailError('');
    setPasswordError('');
    setUsernameError('');
    setConfirmPasswordError('');
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
    if (!username) {
      setUsernameError('Username is required');
      isValid = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Confirm Password does not match');
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
      <h1 className={classes.h1}>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          type="username"
          error={!!usernameError}
          helperText={usernameError}
          autoFocus
          fullwidth
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          error={!!emailError}
          helperText={emailError}
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
        <Input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          type="password"
          error={!!confirmPasswordError}
          helperText={confirmPasswordError}
          fullwidth
        />
        <p className={classes.p}>
          Already a member yet?{' '}
          <Link to={routes.SIGN_IN} className={sharedClasses.link}>
            Sign in
          </Link>
        </p>
        <Button type="submit">Sign Up</Button>
      </form>
    </section>
  );
}
