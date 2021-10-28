import React from 'react';
import { Link } from 'react-router-dom';

import Navlink from './Navlink/Navlink';
import routes from '../../../shared/routes';

import classes from './navbar.module.css';
import logo from '../../../assets/logo.svg';

interface IProps {
  isAuthenticated?: boolean;
}

export default function Navbar({ isAuthenticated }: IProps) {
  return (
    <nav className={classes.nav}>
      <Link to="/" className={classes.logo}>
        <img src={logo} />
      </Link>

      <div
        className={`${classes.navLinkContainer} ${
          isAuthenticated && classes.threeByThree
        }`}
      >
        <Navlink to={routes.CAMPAIGNS}>Campaigns</Navlink>
        <Navlink to={routes.SIGN_IN}>Sign In</Navlink>
      </div>
    </nav>
  );
}
