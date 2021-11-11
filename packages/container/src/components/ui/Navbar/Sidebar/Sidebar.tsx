import React from 'react';
import { Link } from 'react-router-dom';

import Navlink from '../Navlink/Navlink';
import routes from '../../../../shared/routes';
import { auth } from '../../../../shared/firebase';

import classes from './sidebar.module.css';
import logo from '../../../../assets/logo.svg';

interface IProps {
  isAuthenticated?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isAuthenticated, isOpen, onClose }: IProps) {
  const signOutHandler = () => {
    auth.signOut();
  };

  return (
    <aside>
      <div
        className={`${classes.backdrop} ${
          isOpen ? classes.backdropOpen : classes.backdropClose
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`${classes.sideBarBody} ${
          isOpen ? classes.sideBarBodyOpen : classes.sideBarBodyClose
        }`}
      >
        <div className={`${classes.sideDrawerIcon}`}>
          <Link to={routes.HOME} onClick={onClose}>
            <img src={logo} alt="crypto-crowdfund-logo" />
          </Link>
        </div>

        <div className={classes.sideLinkContainer}>
          <Navlink to={routes.CAMPAIGNS} onClick={onClose}>
            Campaigns
          </Navlink>
          {isAuthenticated ? (
            <>
              <Navlink
                to={`${routes.ACCOUNT}?uid=${auth.currentUser!.uid}`}
                onClick={onClose}
              >
                Account
              </Navlink>
              <Navlink to={routes.HOME} onClick={signOutHandler} shouldOverride>
                Sign Out
              </Navlink>
            </>
          ) : (
            <Navlink to={routes.SIGN_IN} onClick={onClose}>
              Sign In
            </Navlink>
          )}
        </div>
      </div>
    </aside>
  );
}
