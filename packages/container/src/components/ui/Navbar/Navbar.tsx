import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Navlink from './Navlink/Navlink';
import Sidebar from './Sidebar/Sidebar';
import routes from '../../../shared/routes';

import classes from './navbar.module.css';
import logo from '../../../assets/logo.svg';
import { auth } from '../../../shared/firebase';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const signOutHandler = () => {
    auth.signOut();
  };

  const onMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isAuthenticated = auth.currentUser !== null;

  return (
    <>
      <nav className={classes.nav}>
        <Link to="/" className={classes.logo}>
          <img src={logo} alt="crypto-crowdfund-logo" />
        </Link>

        <div
          className={`${classes.navLinkContainer} ${
            isAuthenticated && classes.threeByThree
          }`}
        >
          <Navlink to={routes.CAMPAIGNS}>Campaigns</Navlink>
          {isAuthenticated && (
            <Navlink to={`${routes.ACCOUNT}?uid=${auth.currentUser!.uid}`}>
              Account
            </Navlink>
          )}
          {isAuthenticated ? (
            <Navlink to={routes.HOME} onClick={signOutHandler} shouldOverride>
              Sign Out
            </Navlink>
          ) : (
            <Navlink to={routes.SIGN_IN}>Sign In</Navlink>
          )}
        </div>

        <button className={classes.toggler} onClick={onMenuClick}>
          <div
            className={`${classes.bar1} ${isMenuOpen && classes.crossBar1}`}
          />
          <div
            className={`${classes.bar2} ${isMenuOpen && classes.crossBar2}`}
          />
          <div
            className={`${classes.bar3} ${isMenuOpen && classes.crossBar3}`}
          />
        </button>
      </nav>

      <Sidebar
        isAuthenticated={isAuthenticated}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
