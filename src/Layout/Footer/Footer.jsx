import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Material UI Components
// import { Paper } from '@material-ui/core/';
// Style
import footerStyle from "./footerStyle";
import { withStyles } from "@material-ui/core/styles";

class Footer extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.root} />
      </Fragment>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
