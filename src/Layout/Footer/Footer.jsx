import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Material UI Components
// import { Paper } from '@material-ui/core/';
// Style
import footerStyle from "./footerStyle";
import { withStyles, Typography, MuiThemeProvider } from "@material-ui/core";
import { mainTheme } from "../../assets/jss/mainStyle";

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
        <MuiThemeProvider theme={mainTheme}>
          <div className={classes.root}>
            <Typography
              className={classes.content}
              color="primary"
              variant="body1"
              gutterBottom
              align="right"
            >
              Horus
            </Typography>
          </div>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
