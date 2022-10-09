import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#979797',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E0E0E0',
    },
    background: {
      default: '#F2F2F2',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: ['Yu Gothic Pr6N'].join(','),
    fontSize: 14,
  },
});

export default theme;
