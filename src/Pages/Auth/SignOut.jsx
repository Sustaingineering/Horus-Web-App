import React, { Component, Fragment } from "react";
// Material UI
import Button from "@material-ui/core/Button";
// Styles
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { mainTheme, primaryColor } from "../../assets/jss/mainStyle";

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit,
    backgroundColor: primaryColor,
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    }
  },
  noDec: {
    textDecoration: "none"
  }
});

class SignOutButton extends Component {
  signOut = () => {
    this.props.firebase.auth().signOut();
  }
  
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MuiThemeProvider theme={mainTheme}>
          <Button className={classes.button} color="primary" onClick={this.signOut}>
            Sign Out
          </Button>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default withStyles(styles)(SignOutButton);
