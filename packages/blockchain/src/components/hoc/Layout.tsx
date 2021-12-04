import React from 'react';
import { Link } from 'react-router-dom';

import classes from './layout.module.css';
import sharedClasses from '../../common.module.css';

interface IProps {
  children: React.ReactNode;
  faqLink: string;
  sidebar?: React.ReactNode;
  sidebarAddition?: React.ReactNode;
}

export default function Layout({
  children,
  faqLink,
  sidebar,
  sidebarAddition,
}: IProps) {
  return (
    <div className={classes.root}>
      <section>{children}</section>

      <section>
        {sidebar ? (
          sidebar
        ) : (
          <>
            <h2 className={sharedClasses.h2}>
              <strong> Warning </strong>
            </h2>
            <p className={sharedClasses.p}>
              All actions modifying the BlockChain incurs the use of gas, which
              costs a small amount of Ether. For details, click{' '}
              <Link to={faqLink} className={sharedClasses.link}>
                here
              </Link>
            </p>
            {sidebarAddition}
          </>
        )}
      </section>
    </div>
  );
}
