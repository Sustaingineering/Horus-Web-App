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
// const fs = electron.remote.require("fs");

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
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

  handleSendVerificationCode = () => {
    const email = this.state.email;
    if (email === "") {
      return alert("Blank email. Please write your email");
    }
    ipcRenderer.send("generate-password-token", {
      email: email
    });
  };

  componentDidMount = async () => {
    ipcRenderer.on("generate-password-token", (e, msg) => {
      if (msg.error) {
        alert(msg.error);
      } else {
        alert(
          msg.success + ". Please check your email for the verification code."
        );
        const { history } = this.props;
        history.push("/newPassword");
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
                  Don't worry, we got you covered
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.titleForgotAndNewPassword}
                >
                  Please write your email below to retrieve your password.
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
                <Button
                  className={classes.submitForgotAndNewPassword}
                  variant="contained"
                  onClick={this.handleSendVerificationCode}
                  color="primary"
                >
                  Send
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

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(signinStyle)(ForgotPassword));
