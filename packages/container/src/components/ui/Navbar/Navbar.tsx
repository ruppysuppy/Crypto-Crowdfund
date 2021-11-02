import React from 'react';
import { Link } from 'react-router-dom';

import Navlink from './Navlink/Navlink';
import routes from '../../../shared/routes';

import classes from './navbar.module.css';
import logo from '../../../assets/logo.svg';
import { auth } from '../../../shared/firebase';

interface IProps {
  isAuthenticated?: boolean;
}

export default function Navbar({ isAuthenticated }: IProps) {
  const signOutHandler = () => {
    auth.signOut();
  };

  return (
    <nav className={classes.nav}>
      <Link to="/" className={classes.logo}>
        <img src={logo} alt="crypto-crowdfund" />
      </Link>

      <div
        className={`${classes.navLinkContainer} ${
          isAuthenticated && classes.threeByThree
        }`}
      >
        <Navlink to={routes.CAMPAIGNS}>Campaigns</Navlink>
        {isAuthenticated && <Navlink to={routes.ACCOUNT}>Account</Navlink>}
        {isAuthenticated ? (
          <Navlink to={routes.HOME} onClick={signOutHandler} shouldOverride>
            Sign Out
          </Navlink>
        ) : (
          <Navlink to={routes.SIGN_IN}>Sign In</Navlink>
        )}
      </div>
    </nav>
  );
}
