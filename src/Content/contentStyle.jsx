// Content Styles

import { backgroundColor } from "../assets/jss/mainStyle";

const contentStyle = theme => ({
  root: {
    position: "relative",
    minHeight: "calc(100vh - 70px)",
    paddingBottom: "30px",
    backgroundColor: backgroundColor
  },
  container: {
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      marginTop: "5%",
      marginRight: "5%",
      marginLeft: "calc(57px + 5%)"
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: "2%",
      marginRight: "2%",
      marginLeft: "calc(73px + 2%)"
    }
  }
});

export default contentStyle;
