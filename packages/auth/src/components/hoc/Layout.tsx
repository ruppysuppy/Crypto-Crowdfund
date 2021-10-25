import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { useSharedStyles } from '../../shared/theme';

interface IProps {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.secondary,
    minHeight: '100vh',
    boxSizing: 'border-box',
    padding: `${theme.spacing(10)}px ${theme.spacing(1)}px`,
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '1rem',

    [theme.breakpoints.up('xl')]: {
      padding: `${theme.spacing(24)}px ${theme.spacing(8)}px`,
    },
    [theme.breakpoints.up('lg')]: {
      padding: `${theme.spacing(16)}px ${theme.spacing(6)}px`,
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '5fr 2fr',
      padding: `${theme.spacing(12)}px ${theme.spacing(4)}px`,
    },
  },
  warning: {
    display: 'none',

    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
}));

export default function Layout({ children }: IProps) {
  const classes = useStyles();
  const sharedClasses = useSharedStyles();

  return (
    <div className={classes.root}>
      {children}

      <div className={classes.warning}>
        <Typography variant="h5" className={sharedClasses.primaryText}>
          <strong> Warning </strong>
        </Typography>
        <Typography variant="body2">
          All actions modifying the BlockChain incurs the use of gas, which
          costs a small amount of Ether. For details, click{' '}
          <Link to="/signin" className={sharedClasses.link}>
            here
          </Link>
          .
        </Typography>
      </div>
    </div>
  );
}
