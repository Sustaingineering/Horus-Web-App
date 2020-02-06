// Navbar Styles

import { primaryColor } from "../../assets/jss/mainStyle";

const navbarStyle = theme => ({
  root: {
    position: "fixed",
    top: 0,
    [theme.breakpoints.down("sm")]: {
      height: theme.spacing(7)
    },
    [theme.breakpoints.up("sm")]: {
      height: theme.spacing(8)
    },
    zIndex: 1,
    color: "white"
  },
  menuButton: {
    position: "relative",
    left: -15,
    marginLeft: 0,
    marginRight: 20
  },
  appBar: {
    backgroundColor: primaryColor,
    position: "fixed",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  button: {
    textAlign: "center",
    marginTop: theme.spacing(1),
    backgroundColor: primaryColor,
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    }
  }
});

export default navbarStyle;
