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

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
  openDialog: false
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  signIn = event => {
    // const { email, passwordOne } = this.state;
    // const { history } = this.props;
    // auth
    //   .doCreateUserWithEmailAndPassword(email, passwordOne)
    //   .then(authUser => {
    //     this.setState(() => ({ ...INITIAL_STATE }));
    //     history.push("/dashboard");
    //   })
    //   .catch(error => {
    //     this.setState(byPropKey("error", error));
    //     this.dialogPromptOpen(error.message);
    //   });
    // event.preventDefault();
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
    const { firstName, lastName, email, passwordOne, passwordTwo } = this.state;

    const isInvalid =
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      passwordOne === "" ||
      passwordTwo === "" ||
      firstName === lastName ||
      passwordOne !== passwordTwo;

    return (
      <Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={mainTheme}>
          <div className={classes.root}>
            <div className={classes.container}>
              <Paper className={classes.paper}>
                <Link to="/login">
                  <ChevronLeft className={classes.iconBack} />
                </Link>
                <Avatar className={classes.avatar}>
                  <LockIcon />
                </Avatar>
                <Typography variant="headline">Register</Typography>
                <form className={classes.form}>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      id="firstName"
                      label="First Name"
                      placeholder="First Name"
                      type="text"
                      name="firstName"
                      onChange={this.handleChange}
                      value={this.state.firstName}
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      id="lastName"
                      label="Last Name"
                      placeholder="Last Name"
                      type="text"
                      name="lastName"
                      onChange={this.handleChange}
                      value={this.state.lastName}
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
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      id="passwordOne"
                      label="Password"
                      placeholder="Password"
                      type="password"
                      name="passwordOne"
                      onChange={this.handleChange}
                      value={this.state.passwordOne}
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      id="passwordTwo"
                      label="Confirm Password"
                      placeholder="Confirm Password"
                      type="password"
                      name="passwordTwo"
                      onChange={this.handleChange}
                      value={this.state.passwordTwo}
                    />
                  </FormControl>
                  <Button
                    fullWidth
                    disabled={isInvalid}
                    variant="contained"
                    onClick={this.signIn}
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
