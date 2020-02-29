// Dashboard Styles
import { backgroundColor, primaryColor, secondaryColor, warningColor } from "../../assets/jss/mainStyle";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const dashboardStyle = theme => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(3) / 2
    },
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(3)
    }
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
  },
  select: {
    "&:before": {
      borderColor: "white"
    },
    "&:hover": {
      borderColor: "white"
    }
  }
});

const monitoringStyle = theme => ({
  card: {
    padding: 0,
    color: "white",
    backgroundColor: primaryColor,
    flex: 1
  },
  container: {
    display: "flex",
    height: "100%"
  },
  cardContent: {
    paddingTop: 0,
    textAlign: "center"
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

const historyStyle = theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: primaryColor
  },
  select: {
    "&:before": {
      borderColor: "white",
    },
    "&:after": {
      borderColor: "white",
    },
    color: "white",
  },
  inputLabel: {
    color: "white"
  },
  formControl: {
    color: "white"
  },
  icon: {
    fill: "white"
  },
  input: {
    color: "white"
  }
});

export { dashboardStyle, monitoringStyle, uploadStyle, historyStyle };