import React, { Component, Fragment } from "react";
// Material UI Components
import {
  Grid,
  Paper,
  TextField,
  MuiThemeProvider,
  Button
} from "@material-ui/core";
//Style
import profileStyle from "./configStyle";
import { withStyles } from "@material-ui/core/styles";
import { mainTheme } from "../../assets/jss/mainStyle";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  updateProfile = () => {
    
  }

  updateEmail = () => {

  }

  verifyEmail = () => {

  }

  updatePassword = () => {

  }

  resetPassword = () => {

  }

  deleteAccount = () => {

  }

  componentWillMount = () => {
    let user = this.props.firebase.auth().currentUser;
    this.setState({
      userAuth: user,
      name: user.displayName,
      phone: user.phoneNumber,
      email: user.email
    });
  }

  // Name
  // Profile Photo URL
  // Email
  // Verify email
  // Update password
  // Send password reset
  // Delete account

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MuiThemeProvider theme={mainTheme}>
          <div className={classes.root}>
            <Grid container spacing={40}>
              <Grid item sm>
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
                  <TextField
                    id="phone"
                    label="Phone Number"
                    className={classes.textField}
                    value={this.state.phone || ""}
                    InputProps={{
                      className: classes.textField
                    }}
                    InputLabelProps={{
                      style: {
                        color: 'white',
                      }
                    }}
                    onChange={val => this.setState({phone: val.target.value})}
                    margin="normal"
                  />
                  <Button fullWidth variant="contained" color="primary" className={classes.submit}>SUBMIT</Button>
                </Paper>
              </Grid>
              <Grid item sm>
                <Paper className={classes.paper}>
                  <h2 className={classes.postText}>Email Settings</h2>
                  <TextField
                    id="email"
                    label="Email"
                    className={classes.textField}
                    value={this.state.email || ""}
                    InputProps={{
                      className: classes.textField
                    }}
                    InputLabelProps={{
                      style: {
                        color: 'white',
                      }
                    }}
                    onChange={val => this.setState({email: val.target.value})}
                    margin="normal"
                  />
                  <Button fullWidth variant="contained" color="primary" className={classes.submit}>CHANGE EMAIL</Button>
                  {this.state.userAuth.emailVerified ? undefined : <Button fullWidth variant="contained" color="primary" className={classes.submitWarning}>VERIFY EMAIL</Button>}
                  
                </Paper>
              </Grid>
              <Grid item sm>
                <Paper className={classes.paper}>
                  <h2 className={classes.postText}>Administration</h2>
                  <TextField
                    id="curr-password"
                    label="Current Password"
                    type="password"
                    className={classes.textField}
                    value={""}
                    InputProps={{
                      className: classes.textField
                    }}
                    InputLabelProps={{
                      style: {
                        color: 'white'
                      }
                    }}
                    // onChange={TODO}
                    margin="normal"
                  />
                  <TextField
                    id="new-password"
                    label="New Password"
                    type="password"
                    className={classes.textField}
                    value={""}
                    InputProps={{
                      className: classes.textField
                    }}
                    InputLabelProps={{
                      style: {
                        color: 'white',
                      }
                    }}
                    // onChange={TODO}
                    margin="normal"
                  />
                  <Button fullWidth variant="contained" className={classes.submit}>UPDATE PASSWORD</Button>
                  <Button fullWidth variant="contained" className={classes.submit}>RESET PASSWORD</Button>
                  <Button fullWidth variant="contained" className={classes.submitDanger}>DELETE ACCOUNT</Button>
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
