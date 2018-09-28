// Dashboard Styles
import { primaryColor } from "../../assets/jss/mainStyle";

const dashboardStyle = theme => ({
  root: {
    flexGrow: 1,
    // marginLeft: '100px',
    // marginRight: '30px',
    height: "100%"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: primaryColor
  }
});

export default dashboardStyle;
