import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Material UI Components
import { withStyles, Typography, MuiThemeProvider } from "@material-ui/core";
//Style
import dashboardStyle from "./dashboardStyle";
import { mainTheme } from "../../assets/jss/mainStyle";

class Sensor extends Component {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MuiThemeProvider theme={mainTheme}>
          <div className={classes.root}>
            <Typography variant="display1" color="primary" gutterBottom>
              {this.props.sensorName}
            </Typography>
          </div>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

Sensor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Sensor);
