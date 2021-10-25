import { createTheme, responsiveFontSizes } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      background: {
        default: '#111111',
        paper: '#222222',
      },
      primary: {
        main: '#eeeeee',
        dark: '#dddddd',
        light: '#ffffff',
      },
      text: {
        primary: '#ffffff',
        secondary: '#aaaaaa',
      },
      type: 'dark',
    },
  }),
);

const useSharedStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  primaryText: {
    color: theme.palette.text.primary,
  },
}));

export default theme;
export { useSharedStyles };
