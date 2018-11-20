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
// Electron
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
// const fs = electron.remote.require("fs");

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: null,
      openDialog: false,
      isRemembered: false
    };
  }

  componentDidMount = () => {
    ipcRenderer.on("log-in", (e, msg) => {
      if (msg.error) {
        return alert(msg.error);
      }
      return alert(msg);
    });
  };

  login = () => {
    const tpas = this.state.password;
    const username = this.state.username;
    const tisRemembered = this.state.isRemembered;
    ipcRenderer.send("log-in", {
      password: tpas,
      username: username,
      email: username,
      isRemembered: tisRemembered
    });
    console.log("click");
  };

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
                <Typography variant="headline" className={classes.title}>
                  Sign in
                </Typography>
                <form className={classes.form}>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      className={classes.field}
                      autoFocus
                      autoComplete="username"
                      type="username"
                      name="username"
                      id="username"
                      label="Username"
                      onChange={this.handleChange}
                      value={this.state.username}
                      InputProps={{
                        className: classes.input
                      }}
                      InputLabelProps={{
                        className: classes.input
                      }}
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      className={classes.field}
                      autoComplete="current-password"
                      id="password"
                      label="Password"
                      name="password"
                      type="password"
                      onChange={this.handleChange}
                      value={this.state.password}
                      InputProps={{
                        className: classes.input
                      }}
                      InputLabelProps={{
                        className: classes.input
                      }}
                    />
                  </FormControl>
                  <Button
                    fullWidth
                    className={classes.submit}
                    variant="contained"
                    onClick={() => this.login()}
                    color="primary"
                  >
                    Sign in
                  </Button>
                  <Link className={classes.noDeco} to="/signup">
                    <Button
                      fullWidth
                      className={classes.submit}
                      variant="contained"
                      color="secondary"
                    >
                      Register
                    </Button>
                  </Link>
                  <Link className={classes.noDeco} to="/forgotPassword">
                    <Button
                      size="small"
                      className={classes.forgotPassword}
                      disableRipple="true"
                    >
                      Forgot Password
                    </Button>
                  </Link>
                </form>
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

SignInPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(signinStyle)(SignInPage));
