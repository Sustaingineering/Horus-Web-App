import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Material Ui
import Button from "@material-ui/core/Button";
// Routing
import { Link } from "react-router-dom";
// Style
import { withStyles } from "@material-ui/core/styles";

const style = {
  button: {
    margin: "20px"
  },
  noStyle: {
    textDecoration: "none"
  },
  input: {
    display: "none"
  },
  center: {
    padding: "30px",
    margin: "auto"
  }
};

class LandingPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <h1 className={classes.center}>Horus Home</h1>
        <Link className={classes.noStyle} to="/login">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            SignIn
          </Button>
        </Link>
        <Link className={classes.noStyle} to="/signup">
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Register
          </Button>
        </Link>
      </Fragment>
    );
  }
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(LandingPage);
