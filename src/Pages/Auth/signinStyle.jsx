// SignIn Styles
import { primaryColor, backgroundColor } from "../../assets/jss/mainStyle";

const signinStyle = theme => ({
  root: {
    flexGrow: 1,
    position: "relative",
    overflow: "hidden",
    display: "flex",
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: backgroundColor,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white"
  },
  container: {
    marginTop: "5%",
    width: "100%",
    display: "block", // Fix IE11 issue.
  },
  paper: {
    backgroundColor: backgroundColor,
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme
      .spacing.unit * 1.5}px`
  },
  avatar: {
    margin: theme.spacing(1),
    marginBottom: "40px",
    backgroundColor: primaryColor
  },
});

export default signinStyle;
