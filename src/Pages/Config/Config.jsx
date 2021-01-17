import React, { PureComponent, Fragment } from "react";
// Material UI Components
import {
  Grid,
  TextField,
  Button,
  Snackbar,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";

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
      snack: undefined,
    };
  }

  updateName = () => {
    this.state.userAuth
      .updateProfile({
        displayName: this.state.name,
      })
      .then(() => {
        this.generateSnack("Updated name.");
      })
      .catch((e) => {
        this.generateSnack(e.message);
      });
  };

  updateEmail = () => {
    this.state.userAuth
      .updateEmail(this.state.email)
      .then(() => {
        this.generateSnack("Updated email.");
      })
      .catch((e) => {
        this.generateSnack(e.message);
      });
  };

  verifyEmail = () => {
    this.state.userAuth
      .sendEmailVerification()
      .then(() => {
        this.generateSnack("Email verification sent.");
      })
      .catch((e) => {
        this.generateSnack(e.message);
      });
  };

  resetPassword = () => {
    let emailAddress = this.state.userAuth.email;
    this.props.firebase
      .auth()
      .sendPasswordResetEmail(emailAddress)
      .then(() => {
        this.generateSnack("Password reset email sent.");
      })
      .catch((e) => {
        this.generateSnack(e.message);
      });
  };

  deleteAccount = () => {
    if (window.confirm("Are you sure? You CANNOT undo this.")) {
      try {
        // Unsubscribe the listeners
        this.props.firestoreSubscribers.forEach((unsubscribe) => unsubscribe());
      } catch (e) {
        console.log(e);
      } finally {
        // Delete the user settings first
        let uid = this.props.firebase.auth().currentUser.uid;
        let db = this.props.firebase.firestore();
        db.collection("users")
          .doc(uid)
          .delete()
          .then(() => {
            this.state.userAuth
              .delete()
              .then(() => {
                console.log("Auth deleted");
              })
              .catch((e) => {
                console.log(e);
              });
            console.log("Deleted records");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  };

  componentDidMount = async () => {
    // Update the user details to the latest results
    await this.props.firebase.auth().currentUser.reload();
    let user = this.props.firebase.auth().currentUser;
    // Check if it's an email auth
    let isEmail =
      this.state.userAuth.providerData.length === 0
        ? false
        : this.state.userAuth.providerData[0].providerId === "password";
    this.setState({
      userAuth: user,
      name: user.displayName,
      phone: user.phoneNumber,
      email: user.email,
      isEmail: isEmail,
    });
  };

  isAuthOld = () => {
    // Reauthenticate if it's been longer than 5 minutes
    let lastAuth = Date.parse(this.state.userAuth.metadata.lastSignInTime);
    let currentTime = Date.now();
    return currentTime - lastAuth >= 300000;
  };

  reauthFlow = () => {
    if (this.isAuthOld()) {
      if (this.state.isEmail) {
        // Reauthenticate with password here, given in TextField
        return (
          <Fragment>
            <TextField
              fullWidth
              id="curr-password"
              label="Current Password"
              type="password"
              value={this.state.password}
              onChange={(val) => this.setState({ password: val.target.value })}
              margin="normal"
            />
            <Button fullWidth variant="contained" onClick={this.reauthenticate}>
              REAUTHENTICATE
            </Button>
          </Fragment>
        );
      } else {
        // Reauthenticate with popup here
        return (
          <Button fullWidth variant="contained" onClick={this.reauthenticate}>
            REAUTHENTICATE
          </Button>
        );
      }
    } else {
      return undefined;
    }
  };

  reauthenticate = () => {
    if (this.state.isEmail) {
      let credential = this.props.firebase.auth.EmailAuthProvider.credential(
        this.state.email,
        this.state.password
      );
      this.props.firebase
        .auth()
        .currentUser.reauthenticateWithCredential(credential)
        .then((result) => {
          this.props.firebase
            .auth()
            .currentUser.reload()
            .then(() => {
              this.generateSnack("Reauthorized.");
            });
        })
        .catch((e) => {
          this.generateSnack(e.message);
        });
    } else {
      let provider = new this.props.firebase.auth.GoogleAuthProvider();
      this.props.firebase
        .auth()
        .currentUser.reauthenticateWithPopup(provider)
        .then((result) => {
          this.props.firebase
            .auth()
            .currentUser.reload()
            .then(() => {
              this.generateSnack("Reauthorized.");
            });
        })
        .catch((e) => {
          this.generateSnack(e.message);
        });
    }
  };

  generateSnack = (snack) => {
    this.setState({
      snack: snack,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={this.state.snack !== undefined}
          autoHideDuration={4000}
          onClose={() => this.generateSnack(undefined)}
          message={<span>{this.state.snack}</span>}
        />
        <Grid container spacing={4}>
          <Grid item md sm={6} xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Profile</Typography>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  value={this.state.name || ""}
                  onChange={(val) => this.setState({ name: val.target.value })}
                  margin="normal"
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={this.updateName}
                >
                  SUBMIT
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md sm={6} xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Email Settings</Typography>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  value={this.state.email || ""}
                  InputProps={{
                    disabled: !this.state.isEmail,
                  }}
                  onChange={(val) => this.setState({ email: val.target.value })}
                  margin="normal"
                />
                {this.state.isEmail ? (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={this.isAuthOld()}
                    onClick={this.updateEmail}
                  >
                    CHANGE EMAIL
                  </Button>
                ) : undefined}
                {this.state.isEmail && !this.state.userAuth.emailVerified ? (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.verifyEmail}
                  >
                    VERIFY EMAIL
                  </Button>
                ) : undefined}
              </CardContent>
            </Card>
          </Grid>
          <Grid item md sm={12} xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Administration</Typography>
                {this.reauthFlow()}
                {this.state.isEmail ? (
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={this.resetPassword}
                  >
                    SEND PASSWORD RESET
                  </Button>
                ) : undefined}
                <Button
                  fullWidth
                  variant="contained"
                  disabled={this.isAuthOld()}
                  onClick={this.deleteAccount}
                >
                  DELETE ACCOUNT
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Profile;
