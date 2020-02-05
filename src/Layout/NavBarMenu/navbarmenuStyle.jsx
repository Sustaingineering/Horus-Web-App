// NavbarMenu Styles
import { drawerWidth, primaryColor } from "../../assets/jss/mainStyle";

const navbarmenuStyle = theme => ({
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
    width: theme.spacing(7)
  },
  white: {
    color: "white"
  },
  paper: {
    backgroundColor: primaryColor,
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
  sidebarDivider: {
    color: "white",
    backgroundColor: "white",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

export default navbarmenuStyle;
