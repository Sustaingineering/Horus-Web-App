// SignIn Styles
import { primaryColor, backgroundColor } from "../../assets/jss/mainStyle";
import { inherits } from "util";

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
    marginBottom: theme.spacing.unit * 1,
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    }
  },
  forgotPassword: {
    margin: "0, auto",
    color: "white",
    display: "block",
    marginTop: "12px",
    marginLeft: "auto",
    marginRight: "auto",
    textTransform: "capitalize",
    fontSize: "14.5px",
    fontWeight: "450",
    "&:hover": {
      backgroundColor: "inherit",
      color: "rgb(82, 205, 204)"
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
      .spacing.unit * 1.5}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: primaryColor
  },
  title: {
    color: "white"
  },
  titleForgotAndNewPassword: {
    color: "white",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "20px",
    marginBottom: "10px",
    textAlign: "center"
  },
  paperForgotAndNewPassword: {
    backgroundColor: backgroundColor,
    marginTop: theme.spacing.unit * 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 0}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 6}px`
  },
  avatarForgotAndNewPassword: {
    marginTop: "30px",
    backgroundColor: primaryColor,
    width: 50,
    height: 50
  },
  formHidden: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit,
    color: "white",
    borderBottomColor: "white"
  },
  submitForgotAndNewPassword: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: primaryColor,
    color: "white",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    }
  },
  skipAhead: {
    textDecoration: "none",
    width: "100%",
    color: "rgb(82, 205, 204)"
  }
});

export default signinStyle;
