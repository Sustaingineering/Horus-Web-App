import React, { PureComponent, Fragment } from "react";
// Material UI Components
import {
  Grid,
  Paper,
  TextField,
  MuiThemeProvider,
  Button,
  Snackbar,
} from "@material-ui/core";
//Style
import profileStyle from "./configStyle";
import { withStyles } from "@material-ui/core/styles";
import { mainTheme } from "../../assets/jss/mainStyle";

class Profile extends PureComponent {
  constructor(props) {
    super(props);
    // Grab the initial cached state
    let user = this.props.firebase.auth().currentUser;
    this.state = {
      userAuth: user,
      name: user.displayName,
      phone: user.phoneNumber,
      email: user.email,
      password: "",
      isEmail: undefined,
      snack: undefined
    };
  }

  updateName = () => {
    this.state.userAuth.updateProfile({
      displayName: this.state.name,
    }).then((e) => {
      this.generateSnack("Updated name.");
      console.log(e);
    }).catch((e) => {
      this.generateSnack("Error in name update.");
      console.log(e);
    });
  }

  updateEmail = () => {
    console.log("Updating email");
    this.state.userAuth.updateEmail(this.state.email).then((e) => {
      this.generateSnack("Updated email.");
      console.log(e);
    }).catch((e) => {
      this.generateSnack("Error in email update.");
      console.log(e);
    });
    this.refresh();
  }

  verifyEmail = () => {
    console.log("Verify email");
    this.state.userAuth.sendEmailVerification().then(() => {
      this.generateSnack("Email verification sent.");
    }).catch((e) => {
      this.generateSnack("Error in email verification.");
      console.log(e);
    });
  }

  resetPassword = () => {
    console.log("Reset password");
    let emailAddress = this.state.userAuth.email;
    this.props.firebase.auth().sendPasswordResetEmail(emailAddress).then((e) => {
      this.generateSnack("Password reset email sent.");
    }).catch((e) => {
      this.generateSnack("Error in reset email. Try logging out.");
      console.log(e);
    });
  }

  deleteAccount = () => {
    console.log("Delete account");
    if (window.confirm("Are you sure? You CANNOT undo this.")) {
      // Delete the user settings first
      let uid = this.props.firebase.auth().currentUser.uid;
      let db = this.props.firebase.firestore();
      db.collection("users").doc(uid).delete().then(() => {
        this.state.userAuth.delete().then(() => {
          console.log("Auth deleted");
        }).catch((e) => {
          console.log(e);
        });
        console.log("Deleted records");
      }).catch((e) => {
        console.log(e);
      });
      
    }
  }

  componentDidMount = async () => {
    // Update the user details to the latest results
    await this.props.firebase.auth().currentUser.reload();
    let user = await this.props.firebase.auth().currentUser;
    // Check if it's an email auth
    let isEmail = (this.state.userAuth.providerData.length === 0) ?
      false : (this.state.userAuth.providerData[0].providerId === "password");
    this.setState({
      userAuth: user,
      name: user.displayName,
      phone: user.phoneNumber,
      email: user.email,
      isEmail: isEmail,
      refresh: true
    });
  }

  isAuthOld = () => {
    // Reauthenticate if it's been longer than 5 minutes
    let lastAuth = Date.parse(this.state.userAuth.metadata.lastSignInTime);
    let currentTime = Date.now();
    return currentTime - lastAuth >= 300000;
  }

  reauthFlow = () => {
    let { classes } = this.props;
    if (this.isAuthOld()) {
      if (this.state.isEmail) {
        // Reauthenticate with password here, given in TextField
        return (
          <Fragment>
            <TextField
              id="curr-password"
              label="Current Password"
              type="password"
              className={classes.textField}
              value={this.state.password}
              InputProps={{
                className: classes.textField
              }}
              InputLabelProps={{
                style: {
                  color: 'white'
                }
              }}
              onChange={val => this.setState({password: val.target.value})}
              margin="normal"
            />
            <Button fullWidth variant="contained" className={classes.submitInfo} onClick={this.reauthenticate}>REAUTHENTICATE</Button>
          </Fragment>
        );
      } else {
        // Reauthenticate with popup here
        return (
          <Fragment>
            <Button fullWidth variant="contained" className={classes.submitInfo} onClick={this.reauthenticate}>REAUTHENTICATE</Button>
          </Fragment>
        );
      }
    } else {
      return undefined;
    }
  }

  reauthenticate = () => {
    if (this.state.isEmail) {
      let credential = this.props.firebase.auth.EmailAuthProvider.credential(
        this.state.email,
        this.state.password
      );
      this.props.firebase.auth().currentUser.reauthenticateWithCredential(credential).then((result) => {
        this.generateSnack("Reauthorized.");
        this.refresh();
      }).catch((e) => {
        console.log(e);
      });
    } else {
      let provider = new this.props.firebase.auth.GoogleAuthProvider();
      this.props.firebase.auth().currentUser.reauthenticateWithPopup(provider).then((result) => {
        this.generateSnack("Reauthorized.");
        this.refresh();
      }).catch((e) => {
        console.log(e);
      });
    }
  }

  // Hacky refresh
  refresh = () => {
    this.setState({
      refresh: !this.state.refresh
    });
  }

  generateSnack = (snack) => {
    this.setState({
      snack: snack
    });
  }

  handleCloseSnack = (event, reason) => {
    this.setState({
      snack: undefined
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MuiThemeProvider theme={mainTheme}>
          <div className={classes.root}>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={this.state.snack !== undefined}
            autoHideDuration={4000}
            onClose={this.handleCloseSnack}
            message={<span>{this.state.snack}</span>}
          >
          </Snackbar>
            <Grid container spacing={40}>
              <Grid item sm xs={12}>
                <Paper className={classes.paper}>
                  <h2 className={classes.postText}>Profile</h2>
                  <TextField
                    id="name"
                    label="Name"
                    className={classes.textField}
                    value={this.state.name || ""}
                    InputProps={{
                      className: classes.textField
                    }}
                    InputLabelProps={{
                      style: {
                        color: 'white',
                      }
                    }}
                    onChange={val => this.setState({name: val.target.value})}
                    margin="normal"
                  />         
                  <Button 
                    fullWidth 
                    variant="contained" 
                    color="primary" 
                    className={classes.submit} 
                    onClick={this.updateName}>
                    SUBMIT
                  </Button>
                </Paper>
              </Grid>
              <Grid item sm xs={12}>
                <Paper className={classes.paper}>
                  <h2 className={classes.postText}>Email Settings</h2>
                  <TextField
                    id="email"
                    label="Email"
                    className={classes.textField}
                    value={this.state.email || ""}
                    InputProps={{
                      classes:{
                        disabled: classes.textFieldDisabled,
                        root: classes.textField,
                      },
                      disabled: !this.state.isEmail
                    }}
                    InputLabelProps={{
                      style: {
                        color: 'white',
                      }
                    }}
                    onChange={val => this.setState({email: val.target.value})}
                    margin="normal"
                  />
                  {this.state.isEmail ? <Button 
                      fullWidth 
                      variant="contained" 
                      color="primary" 
                      className={classes.submit}
                      disabled={this.isAuthOld()}
                      onClick={this.updateEmail}>
                        CHANGE EMAIL
                    </Button> : undefined}
                  {this.state.isEmail && !this.state.userAuth.emailVerified ? 
                    <Button 
                      fullWidth 
                      variant="contained" 
                      color="primary" 
                      className={classes.submitWarning} 
                      onClick={this.verifyEmail}>
                      VERIFY EMAIL
                    </Button> : undefined}
                </Paper>
              </Grid>
              <Grid item sm xs={12}>
                <Paper className={classes.paper}>
                  <h2 className={classes.postText}>Administration</h2>
                  {this.reauthFlow()}
                  {this.state.isEmail ? <Button fullWidth variant="contained" className={classes.submit} onClick={this.resetPassword}>SEND PASSWORD RESET</Button> : undefined}
                  <Button fullWidth variant="contained" disabled={this.isAuthOld()} className={classes.submitDanger} onClick={this.deleteAccount}>DELETE ACCOUNT</Button>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default withStyles(profileStyle)(Profile);
