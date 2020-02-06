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
    [theme.breakpoints.down("sm")]: {
      width: 0
    },
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7)
    }
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
  sidebarDivider: {
    color: "white",
    backgroundColor: "white",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

export default navbarmenuStyle;
