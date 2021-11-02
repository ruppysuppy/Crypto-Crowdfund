import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './navlink.module.css';

interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  shouldOverride?: boolean;
  to: string;
}

export default function Navlink({
  children,
  shouldOverride,
  to,
  ...props
}: IProps) {
  return shouldOverride ? (
    <a href={to} className={`${classes.navlink} ${props.className}`} {...props}>
      {children}
    </a>
  ) : (
    <NavLink
      to={to}
      className={`${classes.navlink} ${props.className}`}
      activeClassName={classes.navlinkActive}
      isActive={(_, location) => location.pathname === to}
      {...props}
    >
      {children}
    </NavLink>
  );
}
