// @ts-ignore
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'

export const darkThemeOptions: ThemeOptions = {
  palette: {
    type: 'dark',
    mode: 'dark',
    primary: {
      main: '#5b45ff',
      dark: '#714fff',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d56aff',
    },
    background: {
      default: '#2c2c2c',
      paper: '#2f2f2f',
    },
    divider: 'rgba(129,129,129,0.12)',
    yellow: "#edc709"
  },
};


export const themeOptions: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#5b45ff',
      dark: '#714fff',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d56aff',
    },
    yellow: "#edc709"
  },
};