import React from 'react';

import Navbar from '../ui/Navbar';

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <span>Footer</span>
    </>
  );
};

export default Layout;
