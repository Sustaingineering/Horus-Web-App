// Variables - Styles that are used on more than one component
// MUI THEME
import { createMuiTheme } from "@material-ui/core/styles";

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
const primaryColor = "#27293d";
const secondaryColor = "#fff";
const backgroundColor = "#1e1e2d";
const backgroundColorGradient = "linear-gradient(#1e1e2f,#1e1e24)";
const successColor = "#00f2c3";
const successColorGradient =
  "linear-gradient(to bottom left,#00f2c3,#0098f0,#00f2c3)";
const infoColor = "#1d8cf8";
const infoColorGradient =
  "linear-gradient(to bottom left,#1d8cf8,#3358f4,#1d8cf8)";
const warningColor = "#ff8d72";
const warningColorGradient =
  "linear-gradient(to bottom left,#ff8d72,#ff6491,#ff8d72)";
const dangerColor = "#fd5d93";
const dangerColorGradient =
  "linear-gradient(to bottom left,#fd5d93,#ec250d,#fd5d93)";
const defaultColor = "#344675";
const defaultColorGradient =
  "linear-gradient(to bottom left,#344675,#263148,#344675)";

// MuiTheme
const mainTheme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  },
  palette: {
    primary: {
      light: "#fff",
      main: "#fff",
      dark: "#fff",
      contrastText: "#fff"
    },
    secondary: {
      light: "#fff",
      main: "#fff",
      dark: "#fff",
      contrastText: "#fff"
    },
    overrides: {
      MuiInput: {
        // Name of the styleSheet
        underline: {
          "&:hover:not($disabled):before": {
            backgroundColor: "#fff",
            height: 1
          }
        }
      }
    }
  }
});

export {
  //variables
  drawerWidth,
  transition,
  container,
  defaultFont,
  backgroundColor,
  primaryColor,
  secondaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  mainTheme,
  backgroundColorGradient,
  successColorGradient,
  infoColorGradient,
  warningColorGradient,
  dangerColorGradient,
  defaultColor,
  defaultColorGradient
};