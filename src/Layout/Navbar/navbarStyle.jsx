// Navbar Styles

import { drawerWidth, primaryColor } from "../../assets/jss/mainStyle";

const navbarStyle = theme => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      height: "56px"
    },
    [theme.breakpoints.up("sm")]: {
      height: "64px"
    },
    zIndex: 1,
    overflow: "hidden",
    display: "flex"
  },
  hide: {
    display: "none"
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
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
  }
});

export default navbarStyle;
