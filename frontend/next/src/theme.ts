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
    fontFamily: [
      'adobe-garamond-pro',
      '游ゴシック体',
      'YuGothic',
      '游ゴシック',
      'Yu Gothic',
      'sans-serif',
      'Kaisei Opti',
      'serif',
    ].join(','),
    fontSize: 14,
  },
});

export default theme;
