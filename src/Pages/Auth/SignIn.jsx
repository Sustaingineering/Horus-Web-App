import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// Router
import { Link, withRouter } from "react-router-dom";
// Material UI Components
import {
  Paper,
  Button,
  FormControl,
  Typography,
  Avatar,
  CssBaseline,
  TextField
} from "@material-ui/core";
import ErrorDialog from "./ErrorDialog";
// Icons
import LockIcon from "@material-ui/icons/LockOutlined";
//Style
import signinStyle from "./signinStyle";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { mainTheme } from "../../assets/jss/mainStyle";

// Firebase 
import * as firebaseui from "firebaseui";
import * as firebase from "firebase";

// var uiConfig = 
// Electron
// const electron = window.require("electron");
// const ipcRenderer = electron.ipcRenderer;
// const fs = electron.remote.require("fs");

class SignInPage extends Component {
  constructor(props) {
    super(props);
    console.log("SigninPage");
    this.state = {
      ui: undefined,
      // username: "admin@gmail.com",
      // password: "root",
      // error: null,
      // openDialog: false,
      // isRemembered: false
    };
  }

  componentDidMount = () => {
    console.log("Starting component");
    console.log(firebaseui.auth.AuthResult);
    if (this.state.ui === undefined) {
      this.setState({
        ui: new firebaseui.auth.AuthUI(firebase.auth())
      },
        this.authFlow
      );
    }
  }

  authFlow = () => {
    this.state.ui.start("#firebaseui-auth-container", {
      // signInSuccessUrl: "/",
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          this.props.auth(authResult);
          return true;
        }
      }
    });
  }

  // login = () => {
  //   const tpas = this.state.password;
  //   const username = this.state.username;
  //   const tisRemembered = this.state.isRemembered;
  //   console.log("sending");
  //   // ipcRenderer.send("log-in", {
  //   //   password: tpas,
  //   //   username: username,
  //   //   email: username,
  //   //   isRemembered: tisRemembered
  //   // });
  // };

  // dialogPromptOpen = message => {
  //   this.setState({
  //     openDialog: true,
  //     error: message
  //   });
  // };

  // dialogClose = () => {
  //   this.setState({ openDialog: false });
  // };

  // handleChange = event => {
  //   this.setState({ [event.target.name]: event.target.value });
  // };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={mainTheme}>
          <div className={classes.root}>
            <div className={classes.container}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockIcon />
                </Avatar>
                <Typography variant="h5" className={classes.title}>
                  Sign in
                </Typography>
                <div id="firebaseui-auth-container"></div>
              </Paper>
            </div>
          </div>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

SignInPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(signinStyle)(SignInPage));
