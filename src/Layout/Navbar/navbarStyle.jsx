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
  hide: {
    display: "none"
  },
  flex: {
    flex: 1
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
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
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
  },
  lft: {
    paddingLeft: 10,
    paddingRight: 20
  }
});

export default navbarStyle;
