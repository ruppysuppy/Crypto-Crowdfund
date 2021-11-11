import React from 'react';

import classes from './loading.module.css';
import logo from '../../../assets/logo.svg';

export default function Loading() {
  return (
    <section className={classes.logoHolder}>
      <img src={logo} alt="crypto-crowdfund-logo" className={classes.img} />
    </section>
  );
}
