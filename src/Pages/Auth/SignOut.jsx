import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Router
import { Link } from "react-router-dom";
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
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MuiThemeProvider theme={mainTheme}>
          <Link to="/login" className={classes.noDec}>
            <Button className={classes.button} color="primary" onClick={"s"}>
              Sign Out
            </Button>
          </Link>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

SignOutButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignOutButton);
