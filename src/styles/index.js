import { createMuiTheme } from '@material-ui/core';

import MuiButton from './MuiButton';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4696ec',
      main: '#4696ec',
      dark: '#4696ec',
      contrastText: '#fff',
    },
  },
  overrides: {
    MuiButton,
  },
});
