import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../ui/Button/Button';

import classes from './home.module.css';
import sharedClasses from '../../../common.module.css';
import logo from '../../../assets/logo.svg';

interface IProps {
  isAuthenticated?: boolean;
  routes: {
    SIGN_IN: string;
    CAMPAIGNS: string;
  };
}

export default function Home({ isAuthenticated, routes }: IProps) {
  return (
    <div className={classes.root}>
      <section className={classes.imgHolder}>
        <img src={logo} alt="crypto-crowdfund-logo" className={classes.img} />
      </section>

      <section className={classes.info}>
        <h2 className={sharedClasses.h2}>Crypto Crowdfund</h2>
        <p className={sharedClasses.p}>
          Crypto Crowdfund is a platform for creating and managing crowdfunding
          campaigns. We help you to turn your creative ideas to reality.
        </p>
        <div className={classes.buttonHolder}>
          <Link
            to={routes.CAMPAIGNS}
            className={`${classes.link} ${sharedClasses.p}`}
          >
            <Button>View Campaigns</Button>
          </Link>
          {!isAuthenticated && (
            <Link
              to={routes.SIGN_IN}
              className={`${classes.link} ${sharedClasses.p}`}
            >
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
