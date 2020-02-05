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
    width: "auto",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    paddingTop: 50,
    paddingBottom: 50
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
