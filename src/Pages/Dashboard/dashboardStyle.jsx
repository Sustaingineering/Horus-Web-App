// Dashboard Styles
import { primaryColor } from "../../assets/jss/mainStyle";

const dashboardStyle = theme => ({
  root: {
    flexGrow: 1,
    // marginLeft: '100px',
    // marginRight: '30px',
    paddingTop: 15,
    height: "100%"
  },
  title: {
    color: "white",
    fontSize: 20
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: primaryColor
  },
  tabs: {
    borderBottom: "1px solid #e8e8e8"
  },
  tab: {
    color: "white",
    "&:hover": {
      color: "white",
      opacity: 1
    }
  }
});

const monitoringStyle = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    verticalAlign: "center",
    color: "white",
    backgroundColor: primaryColor,
    flex: 1
  },
  container: {
    display: "flex",
    height: "100%"
  },
  icon: {
    fontSize: "40px"
  }
});

const uploadStyle = theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: primaryColor
  },
  input: {
    color: "white"
  }
});

export { dashboardStyle, monitoringStyle, uploadStyle };
