import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';

import Footer from '../ui/Footer/Footer';
import Navbar from '../ui/Navbar/Navbar';

import classes from './layout.module.css';

interface IProps {
  children: React.ReactNode;
}

let lastPathName = '';

const Layout = ({ children }: IProps) => {
  // workaround for scroll to top on route change
  const ref = useRef<HTMLDivElement | null>(null);
  const history = useHistory();

  useEffect(() => {
    const scrollToTop = () => {
      if (ref.current) {
        ref.current.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    };

    const interval = setInterval(() => {
      if (history.location.pathname !== lastPathName) {
        scrollToTop();
        lastPathName = history.location.pathname;
      }
    }, 250);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={classes.containerRoot}>
      <Navbar />
      <div className={classes.body} ref={ref}>
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
