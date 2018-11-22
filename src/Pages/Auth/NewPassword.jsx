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
  TextField,
  Grid
} from "@material-ui/core";
import ErrorDialog from "./ErrorDialog";
// Icons
import EmailIcon from "@material-ui/icons/Backup";
//Style
import signinStyle from "./signinStyle";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { mainTheme } from "../../assets/jss/mainStyle";
// Electron
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
const {getCurrentWindow} = electron.remote;

class NewPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      verificationCode: "",
      newPassword: "",
      error: null,
      openDialog: false
    };
  }

  dialogPromptOpen = message => {
    this.setState({
      openDialog: true,
      error: message
    });
  };

  dialogClose = () => {
    this.setState({ openDialog: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleVerifyAndUpdatePassword = () => {
    const email = this.state.email;
    const verificationCode = this.state.verificationCode;
    const newPassword = this.state.newPassword;
    const msg = {
      email: email,
      verificationCode: verificationCode,
      newPassword: newPassword
    };
    if (email === "" || verificationCode === "" || newPassword === "") {
      return alert("Please fill all blank fields");
    }
    ipcRenderer.send("verify-and-update-password", {
      email: msg.email,
      token: msg.verificationCode,
      password: msg.newPassword
    });
  };

  componentDidMount = async () => {
    ipcRenderer.on("verify-and-update-password", (e, msg) => {
      if (msg.error) {
        alert(msg.error);
      } else {
        alert(msg.success);
        const { history } = this.props;
        history.push("/login");
        getCurrentWindow().reload();
      }
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={mainTheme}>
          <div className={classes.root}>
            <div className={classes.container}>
              <Paper className={classes.paperForgotAndNewPassword}>
                <Avatar className={classes.avatarForgotAndNewPassword}>
                  <EmailIcon />
                </Avatar>
                <Typography
                  variant="headline"
                  className={classes.titleForgotAndNewPassword}
                >
                  Almost there! Just one more step
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.titleForgotAndNewPassword}
                >
                  Please provide your email, verification code, and your new
                  password on the fields below.
                </Typography>
                <form className={classes.form}>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      className={classes.field}
                      autoFocus
                      autoComplete="email"
                      type="email"
                      name="email"
                      id="email"
                      label="Email"
                      onChange={this.handleChange}
                      value={this.state.email}
                      InputProps={{
                        className: classes.input
                      }}
                      InputLabelProps={{
                        className: classes.input
                      }}
                    />
                  </FormControl>
                </form>
                <form className={classes.form}>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      className={classes.field}
                      autoComplete="verificationCode"
                      name="verificationCode"
                      id="verificationCode"
                      label="Verification Code"
                      onChange={this.handleChange}
                      value={this.state.verificationCode}
                      InputProps={{
                        className: classes.input
                      }}
                      InputLabelProps={{
                        className: classes.input
                      }}
                    />
                  </FormControl>
                </form>
                <form className={classes.form}>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      className={classes.field}
                      autoComplete="newPassword"
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      label="New Password"
                      onChange={this.handleChange}
                      value={this.state.newPassword}
                      InputProps={{
                        className: classes.input
                      }}
                      InputLabelProps={{
                        className: classes.input
                      }}
                    />
                  </FormControl>
                </form>
                <Button
                  className={classes.submitForgotAndNewPassword}
                  variant="contained"
                  onClick={this.handleVerifyAndUpdatePassword}
                  color="primary"
                  type="button"
                >
                  Submit
                </Button>
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <Link className={classes.noDeco} to="/login">
                      <Button
                        size="small"
                        className={classes.forgotPassword}
                        disableRipple="true"
                      >
                        Sign In
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={6}>
                    <Link className={classes.noDeco} to="/signup">
                      <Button
                        size="small"
                        className={classes.forgotPassword}
                        disableRipple="true"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Paper>
              <ErrorDialog
                error={this.state.error}
                openDialog={this.state.openDialog}
                dialogClose={this.dialogClose}
              />
            </div>
          </div>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

NewPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(signinStyle)(NewPassword));
