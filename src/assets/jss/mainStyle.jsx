// Variables - Styles that are used on more than one component
// MUI THEME
import { createMuiTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const transition = {
  transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
};

const container = {
  paddingRight: "15px",
  paddingLeft: "15px",
  marginRight: "auto",
  marginLeft: "auto"
};

const defaultFont = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: "300",
  lineHeight: "1.5em"
};

// Colors
const primaryColor = "#9368E9";
const warningColor = "#ff9800";
const dangerColor = "#f44336";
const successColor = "#4caf50";
const infoColor = "#00acc1";
const roseColor = "#e91e63";
const grayColor = "#999999";

// MuiTheme
const mainTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#9368E9',
      main: '#9368E9',
      dark: '#9368E9',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      dark: '#fff',
      contrastText: '#9368E9',
    },
  },
});

export {
  //variables
  drawerWidth,
  transition,
  container,
  defaultFont,
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  mainTheme,
};
