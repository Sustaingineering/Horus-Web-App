// Profile Styles
// SignIn Styles
import { warningColor, primaryColor, backgroundColor, dangerColor } from "../../assets/jss/mainStyle";


const profileStyle = theme => ({
  root: {
    // TODO CHANGE
    flexGrow: 1,
    // marginLeft: '100px',
    // marginRight: '30px',
    // paddingTop: 15,
    // height: '100%'
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    paddingTop: 50,
    paddingBottom: 50,
  },
  paper: {
    backgroundColor: primaryColor,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: 'white',
  },
  // picHeight: {
  //   maxHeight: '250px',
  //   maxWidth: '130px',
  //   minHeight: '120px',
  //   minWidth: '100px',
  //   width: 'auto',
  //   heigh: 'auto',
  //   marginLeft: 'auto',
  //   marginRight: 'auto',
  //   borderRadius: '100%',
  // },
  // container: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
  // textField: {
  //   marginLeft: theme.spacing.unit,
  //   marginRight: theme.spacing.unit,
  //   maxWidth: '250px',
  //   width: '100%',
  // },
  // textFieldDate: {
  //   marginTop: '16px',
  //   marginLeft: theme.spacing.unit,
  //   marginRight: theme.spacing.unit,
  //   maxWidth: '250px',
  //   width: '100%',
  // },
  // selectFormControl: {
  //   marginTop: '16px',
  //   marginLeft: theme.spacing.unit,
  //   marginRight: theme.spacing.unit,
  //   maxWidth: '250px',
  //   width: '100%',
  // },
  postText: {
    color: 'white'
  },
  // menu: {
  //   width: 200,
  // },
  // form: {
  //   width: "100%", // Fix IE11 issue.
  //   marginTop: theme.spacing.unit,
  //   color: "white",
  //   borderBottomColor: "white"
  // },
  // field: {
  //   color: "white",
  //   borderBottomColor: "white"
  // },
  // input: {
  //   color: "white"
  // },
  textField: {
    width: "100%",
    color: "white"
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: backgroundColor,
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    }
  },
  submitWarning: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: warningColor,
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    }
  },
  submitDanger: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: dangerColor,
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    }
  },
  // avatar: {
  //   margin: 'auto',
  //   height: '100%',
  //   width: '100%',
  //   maxHeight: '150px',
  //   maxWidth: '150px',
  //   borderRadius: '100%',
  // },
});

export default profileStyle;