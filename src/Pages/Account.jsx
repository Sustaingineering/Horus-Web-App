import React, { PureComponent } from "react";
import { Container, Section } from "../Components/Basics";

export default class Account extends PureComponent {
  constructor(props) {
    super(props);
    // Grab the initial cached state
    let user = props.firebase.auth().currentUser;
    this.snackRef = React.createRef();
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
    this.props.setPath("account");
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
    setTimeout(() => {
      if (this.snackRef) {
        this.setState({
          snack: undefined,
        });
      }
    }, 2000);
  };

  render() {
    return (
      <Container>
        <Section text="Account" subText="Settings related to your account" />
        {this.state.snack ? (
          <div
            className="absolute bottom-0 right-0 alert alert-info shadow-lg mx-5 my-5"
            ref={this.snackRef}
          >
            {this.state.snack}
          </div>
        ) : undefined}
        <div className="grid md:grid-cols-1 grid-cols-1 gap-6 md:p-10">
          <div className="card bg-white rounded-lg shadow-lg">
            <div className="card-body">
              <p className="card-title">Profile</p>
              {/* Weird hack below to make it actually take up the entire row */}
              <span className="w-screen"></span>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your new name..."
                    className="w-full pr-16 input input-primary input-bordered"
                    value={this.state.name || ""}
                    onChange={(val) =>
                      this.setState({ name: val.target.value })
                    }
                    onKeyPress={(e) =>
                      e.key === "Enter" ? this.updateName() : undefined
                    }
                  />
                  <button
                    className="absolute right-0 top-0 rounded-l-none btn btn-primary"
                    onClick={this.updateName}
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-white rounded-lg shadow-lg">
            <div className="card-body">
              <p className="card-title">Email</p>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your new email..."
                    className="w-full pr-16 input input-primary input-bordered"
                    value={this.state.email || ""}
                    disabled={!this.state.isEmail}
                    onChange={(val) =>
                      this.setState({ email: val.target.value })
                    }
                    onKeyPress={(e) =>
                      e.key === "Enter" ? this.updateEmail() : undefined
                    }
                  />
                  <button
                    className="absolute right-0 top-0 rounded-l-none btn btn-primary"
                    disabled={!this.state.isEmail}
                    onClick={this.updateEmail}
                  >
                    Change
                  </button>
                </div>
              </div>
              {this.state.isEmail && !this.state.userAuth.emailVerified ? (
                <button
                  className="my-2 btn btn-warning"
                  onClick={this.verifyEmail}
                >
                  Verify Email
                </button>
              ) : undefined}
            </div>
          </div>

          <div className="card bg-white rounded-lg shadow-lg">
            <div className="card-body">
              <p className="card-title">Administration</p>
              {this.isAuthOld() ? (
                this.state.isEmail ? (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Current Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Password..."
                        className="w-full pr-16 input input-warning input-bordered"
                        value={this.state.password}
                        onChange={(val) =>
                          this.setState({ password: val.target.value })
                        }
                        onKeyPress={(e) =>
                          e.key === "Enter" ? this.reauthenticate() : undefined
                        }
                      />
                      <button
                        className="absolute right-0 top-0 rounded-l-none btn btn-warning"
                        onClick={this.reauthenticate}
                      >
                        Reauth
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="my-2 btn btn-warning"
                    onClick={this.reauthenticate}
                  >
                    Reauth
                  </button>
                )
              ) : undefined}
              {this.state.isEmail ? (
                <button
                  className="my-2 btn btn-warning"
                  onClick={this.resetPassword}
                >
                  Send Password Reset
                </button>
              ) : undefined}
              <button
                className="my-2 btn btn-warning"
                disabled={this.isAuthOld()}
                onClick={this.deleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
