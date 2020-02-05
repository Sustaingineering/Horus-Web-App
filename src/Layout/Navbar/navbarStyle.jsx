// Navbar Styles

import { drawerWidth, primaryColor } from "../../assets/jss/mainStyle";

const navbarStyle = theme => ({
  root: {
    position: "fixed",
    top: 0,
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      height: "56px"
    },
    [theme.breakpoints.up("sm")]: {
      height: "64px"
    },
    zIndex: 1,
    display: "flex",
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
