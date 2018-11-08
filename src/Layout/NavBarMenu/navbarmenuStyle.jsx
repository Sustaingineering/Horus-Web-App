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
    backgroundColor: primaryColor
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    backgroundColor: primaryColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  chevron: {
    color: "white"
  },
  listItems: {
    backgroundColor: primaryColor,
    color: "white"
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
