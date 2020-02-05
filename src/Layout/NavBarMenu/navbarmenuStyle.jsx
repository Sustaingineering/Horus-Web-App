// NavbarMenu Styles
import { drawerWidth, primaryColor } from "../../assets/jss/mainStyle";

const navbarmenuStyle = theme => ({
  sidebar: {},
  drawerPaper: {
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    backgroundColor: primaryColor,
    position: "fixed"
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7
  },
  white: {
    color: "white"
  },
  toolbar: {
    backgroundColor: primaryColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  infoText: {
    color: "red"
  },
  close: {
    opacity: 0,
    color: "white",
    padding: 0,
    transition: "opacity 0.3s",
    "&:hover": {
      opacity: 1
    },
    [theme.breakpoints.down("sm")]: {
      opacity: 1
    },
    [theme.breakpoints.up("sm")]: {
      opacity: 0
    },
    zIndex: 100
  },
  listItems: {
    backgroundColor: primaryColor,
    color: "white",
    transition: "background-color 1s",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)"
    }
  },
  sidebarDivider: {
    color: "white",
    backgroundColor: "white",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

export default navbarmenuStyle;
