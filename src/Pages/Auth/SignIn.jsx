import React, { Component, Fragment } from "react";
// Router
import { withRouter } from "react-router-dom";
// Material UI Components
import {
  Avatar,
  CssBaseline
} from "@material-ui/core";
// Icons
import LockIcon from "@material-ui/icons/LockOutlined";
//Style
import signinStyle from "./signinStyle";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { mainTheme } from "../../assets/jss/mainStyle";
// Firebase 
import * as firebaseui from "firebaseui";

class SignInPage extends Component {
  constructor(props) {
    super(props);
    console.log("SigninPage");
  }

  componentDidMount = () => {
    console.log("Starting component");
    console.log(firebaseui.auth.AuthResult);
    let ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(this.props.firebase.auth());
    ui.start("#firebaseui-auth-container", {
      signInOptions: [
        {
          provider: this.props.firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false
        },
        this.props.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          return true;
        }
      },
      signInFlow: "popup",
      credentialHelper: firebaseui.auth.CredentialHelper.NONE
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={mainTheme}>
          <div className={classes.root}>
            <div className={classes.container}>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockIcon />
                </Avatar>
                <div id="firebaseui-auth-container"></div>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default withRouter(withStyles(signinStyle)(SignInPage));
