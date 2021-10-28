import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './navlink.module.css';

interface IProps {
  children: React.ReactNode;
  to: string;
}

export default function Navlink({ children, to }: IProps) {
  return (
    <NavLink
      to={to}
      className={classes.navlink}
      activeClassName={classes.navlinkActive}
      isActive={(_, location) => location.pathname === to}
    >
      {children}
    </NavLink>
  );
}
