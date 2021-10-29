import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../../../shared/routes';

import classes from './footer.module.css';
import sharedClasses from '../../../common.module.css';

export default function Footer() {
  const Company = (
    <section>
      <h2 className={sharedClasses.h2}>Company</h2>

      <div className={classes.linkHolder}>
        <Link
          to={routes.ABOUT}
          className={`${sharedClasses.p} ${sharedClasses.link} ${classes.link}`}
        >
          About
        </Link>
        <Link
          to={routes.FAQ}
          className={`${sharedClasses.p} ${sharedClasses.link} ${classes.link}`}
        >
          FAQ
        </Link>
        <a
          href="mailto:no-mail@email.com"
          className={`${sharedClasses.p} ${sharedClasses.link} ${classes.link}`}
        >
          Contact
        </a>
      </div>
    </section>
  );

  const Legal = (
    <section>
      <h2 className={sharedClasses.h2}>Legal</h2>

      <div className={classes.linkHolder}>
        <Link
          to={routes.TERMS_AND_CONDITIONS}
          className={`${sharedClasses.p} ${sharedClasses.link} ${classes.link}`}
        >
          Terms & Conditions
        </Link>
        <Link
          to={routes.PRIVACY_POLICY}
          className={`${sharedClasses.p} ${sharedClasses.link} ${classes.link}`}
        >
          Privacy
        </Link>
        <Link
          to={routes.DISCLAIMER}
          className={`${sharedClasses.p} ${sharedClasses.link} ${classes.link}`}
        >
          Disclaimer
        </Link>
      </div>
    </section>
  );

  const Social = (
    <section className={classes.social}>
      <a
        className={`${classes.socialMediaBtn} ${classes.faceBook} ${sharedClasses.h2}`}
        href="https://www.facebook.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-facebook" aria-hidden="true" />
      </a>
      <a
        className={`${classes.socialMediaBtn} ${classes.twitter} ${sharedClasses.h2}`}
        href="https://twitter.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-twitter" aria-hidden="true" />
      </a>
      <a
        className={`${classes.socialMediaBtn} ${classes.instagram} ${sharedClasses.h2}`}
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-instagram" aria-hidden="true" />
      </a>
      <a
        className={`${classes.socialMediaBtn} ${classes.youtube} ${sharedClasses.h2}`}
        href="https://www.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-youtube" aria-hidden="true" />
      </a>
    </section>
  );

  const Copyright = (
    <section className={classes.copyright}>
      <p className={sharedClasses.p}>
        COPYRIGHT © {new Date().getFullYear()} TAP COINS LTD. | ALL RIGHTS
        RESERVED
      </p>
    </section>
  );

  return (
    <>
      <footer className={classes.footerRoot}>
        <div className={classes.footerContent}>
          {Company}
          {Legal}
          {Social}
        </div>
      </footer>
      {Copyright}
    </>
  );
}
