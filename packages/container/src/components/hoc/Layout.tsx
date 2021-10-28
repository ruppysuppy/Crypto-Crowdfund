import React from 'react';

import Footer from '../ui/Footer/Footer';
import Navbar from '../ui/Navbar/Navbar';

import classes from './layout.module.css';

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <div className={classes.containerRoot}>
      <Navbar />
      <div className={classes.body}>
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
