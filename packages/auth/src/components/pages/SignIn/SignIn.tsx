import { Auth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Button from '../../ui/Button/Button';
import ErrorBanner from '../../ui/ErrorBanner/ErrorBanner';
import Input from '../../ui/Input/Input';
import Spinner from '../../ui/Spinner/Spinner';
import { emailRegex } from '../../../shared/regex';
import { IOnAuthStateChanged } from '../../../shared/authTypes';

import classes from '../../../common.module.css';
import sharedClasses from '../../../common.module.css';

interface IProps {
  auth: Auth;
  routes: {
    CAMPAIGNS: string;
    SIGN_UP: string;
  };
  onAuthStateChangedHandler?: IOnAuthStateChanged;
}

export default function SignIn({
  auth,
  routes,
  onAuthStateChangedHandler,
}: IProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const validate = () => {
    setEmailError('');
    setPasswordError('');
    setError('');
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser!;
      onAuthStateChangedHandler &&
        onAuthStateChangedHandler({
          uid: user.uid,
          photoURL: user.photoURL,
          displayName: user.displayName,
        });
      history.push(routes.CAMPAIGNS);
    } catch (error) {
      // @ts-ignore
      setError(error.code);
    }
    setIsLoading(false);
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
        {error && <ErrorBanner>{error}</ErrorBanner>}
        <p className={classes.p}>
          Not a member yet?{' '}
          <Link to={routes.SIGN_UP} className={sharedClasses.link}>
            Sign up
          </Link>
        </p>
        {isLoading ? <Spinner /> : <Button type="submit">Sign In</Button>}
      </form>
    </section>
  );
}
