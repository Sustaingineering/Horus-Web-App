// Profile Styles
// SignIn Styles
import {
  infoColor,
  warningColor,
  primaryColor,
  backgroundColor,
  dangerColor
} from "../../assets/jss/mainStyle";

const profileStyle = theme => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(3) / 2
    },
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(3)
    }
  },
  paper: {
    backgroundColor: primaryColor,
    padding: theme.spacing(2),
    textAlign: "center",
    color: "white"
  },
  postText: {
    color: "white"
  },
  textField: {
    width: "100%",
    color: "white"
  },
  textFieldDisabled: {
    width: "100%",
    color: "#9e9e9e"
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
  submitWarning: {
    marginTop: theme.spacing(3),
    backgroundColor: warningColor,
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    }
  },
  submitDanger: {
    marginTop: theme.spacing(3),
    backgroundColor: dangerColor,
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    }
  },
  submitInfo: {
    marginTop: theme.spacing(3),
    backgroundColor: infoColor,
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    }
  }
});

export default profileStyle;
