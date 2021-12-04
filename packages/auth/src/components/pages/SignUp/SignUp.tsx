import { FirebaseApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
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
  firebaseApp: FirebaseApp;
  routes: {
    CAMPAIGNS: string;
    SIGN_IN: string;
  };
  onAuthStateChangedHandler?: IOnAuthStateChanged;
}

export default function SignIn({
  firebaseApp,
  routes,
  onAuthStateChangedHandler,
}: IProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  const validate = () => {
    setEmailError('');
    setPasswordError('');
    setUsernameError('');
    setConfirmPasswordError('');
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
    } else if (password.length < 6) {
      setPasswordError('Password must contain at least 6 characters');
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, 'users', auth.currentUser!.uid), {
        username,
      });

      const user = auth.currentUser!;
      onAuthStateChangedHandler &&
        onAuthStateChangedHandler({
          uid: user.uid,
          photoURL: user.photoURL,
          username: user.displayName,
        });
      history.push(routes.CAMPAIGNS);
    } catch (error) {
      // @ts-ignore
      setError(error.code);
      setIsLoading(false);
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
        {error && <ErrorBanner>{error}</ErrorBanner>}
        <p className={classes.p}>
          Already a member yet?{' '}
          <Link to={routes.SIGN_IN} className={sharedClasses.link}>
            Sign in
          </Link>
        </p>
        {isLoading ? <Spinner /> : <Button type="submit">Sign Up</Button>}
      </form>
    </section>
  );
}
