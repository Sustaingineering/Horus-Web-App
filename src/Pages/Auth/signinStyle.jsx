// SignIn Styles
import { primaryColor, backgroundColor } from "../../assets/jss/mainStyle";

const signinStyle = theme => ({
  root: {
    flexGrow: 1,
    position: "relative",
    overflow: "hidden",
    display: "flex",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: primaryColor,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white"
  },
  container: {
    marginTop: "5%",
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginRight: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
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
  field: {
    color: "white",
    borderBottomColor: "white"
  },
  noDeco: {
    textDecoration: "none",
    width: "100%"
  },
  input: {
    color: "white"
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: primaryColor,
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    }
  },
  iconBack: {
    minHeight: "30px",
    width: "auto"
  },
  paper: {
    backgroundColor: backgroundColor,
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: primaryColor
  },
  title: {
    color: "white"
  }
});

export default signinStyle;
