import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Material UI Components
import { withStyles, MuiThemeProvider } from "@material-ui/core";
//Style
import dashboardStyle from "./dashboardStyle";
import { mainTheme } from "../../assets/jss/mainStyle";
import Dashboard from "./Dashboard";

class Sensor extends Component {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MuiThemeProvider theme={mainTheme}>
          <div className={classes.root}>
            <Dashboard sensorName={this.props.sensorName} />
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
