// SignIn Styles
import { primaryColor, backgroundColor } from "../../assets/jss/mainStyle";

const landingStyle = theme => ({
  root: {
    flexGrow: 1,
    position: "relative",
    overflow: "hidden",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: backgroundColor,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    color: "white"
  },
  logos: {
    width: "100%",
    maxWidth: 600
  },
  container: {
    marginTop: "5%",
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginRight: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 350,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit,
    color: "white",
    borderBottomColor: "white"
  },
  noDeco: {
    textDecoration: "none",
    width: "100%"
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: backgroundColor,
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    }
  },
  paper: {
    backgroundColor: primaryColor,
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  title: {
    color: "white"
  }
});

export default landingStyle;
