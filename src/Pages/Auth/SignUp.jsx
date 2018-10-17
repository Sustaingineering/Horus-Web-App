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
import ChevronLeft from "@material-ui/icons/ChevronLeft";
//Style
import signinStyle from "./signinStyle";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { mainTheme } from "../../assets/jss/mainStyle";
// Electron
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      organization: "",
      username: "",
      email: "",
      password: "",
      error: null,
      openDialog: false
    };
  }

  signUp = () => {
    const password = this.state.password;
    const email = this.state.email;
    const organization = this.state.organization;
    const username = this.state.username;
    ipcRenderer.send("sign-up", { password, email, organization, username });
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
    const { organization, username, email, password} = this.state;

    const isInvalid =
      organization === "" ||
      username === "" ||
      email === "" ||
      password=== "";

    return (
      <Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={mainTheme}>
          <div className={classes.root}>
            <div className={classes.container}>
              <Paper className={classes.paper}>
                <Link to="/login">
                  <ChevronLeft className={classes.iconBack} className={classes.title} />
                </Link>
                <Avatar className={classes.avatar}>
                  <LockIcon />
                </Avatar>
                <Typography variant="headline" className={classes.title}>Register</Typography>
                <form className={classes.form}>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      id="organization"
                      label="Organization" //this
                      placeholder="Organization" //this 
                      type="text"
                      name="organization" 
                      onChange={this.handleChange}
                      value={this.state.organization}
                      defaultValue="color"
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
                      id="username"
                      label="Username"
                      placeholder="Username"
                      type="text"
                      name="username"
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
                      id="emailField"
                      label="Email address"
                      placeholder="Email address"
                      type="email"
                      name="email"
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
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      id="password"
                      label="Password"
                      placeholder="Password"
                      type="password"
                      name="password"
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
                    disabled={isInvalid}
                    variant="contained"
                    onClick={this.signUp}
                    type="submit"
                    color="primary"
                    className={classes.submit}
                  >
                    Register
                  </Button>
                </form>
              </Paper>
            </div>
          </div>

          <ErrorDialog
            error={this.state.error}
            openDialog={this.state.openDialog}
            dialogClose={this.dialogClose}
          />
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

SignUpPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(signinStyle)(SignUpPage));
