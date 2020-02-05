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
    height: "auto",
    maxWidth: 600
  },
  container: {
    marginTop: "5%",
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 350,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing(1),
    color: "white",
    borderBottomColor: "white"
  },
  noDeco: {
    textDecoration: "none",
    width: "100%"
  },
  submit: {
    marginTop: theme.spacing(3),
    backgroundColor: backgroundColor,
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    }
  },
  paper: {
    backgroundColor: primaryColor,
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme
      .spacing.unit * 3}px`
  },
  title: {
    color: "white"
  }
});

export default landingStyle;
