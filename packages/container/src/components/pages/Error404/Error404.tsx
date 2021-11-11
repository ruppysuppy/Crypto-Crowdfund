import React from 'react';

import classes from './error404.module.css';
import sharedClasses from '../../../common.module.css';

export default function Error404() {
  return (
    <section className={classes.body}>
      <br />
      <h1 className={`${sharedClasses.h1} ${classes.h1}`}>ERROR 404</h1>
      <hr />
      <h2 className={`${sharedClasses.h2} ${classes.h2}`}>
        It seems like you are lost! 😵😨
      </h2>
    </section>
  );
}
