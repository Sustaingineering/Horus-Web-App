import React, { PureComponent, Fragment } from "react";
// Material UI Components
import { withStyles, MuiThemeProvider } from "@material-ui/core";
//Style
import dashboardStyle from "./dashboardStyle";
import { mainTheme } from "../../assets/jss/mainStyle";
import Dashboard from "./Dashboard";

class Sensor extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MuiThemeProvider theme={mainTheme}>
          <div className={classes.root}>
            <Dashboard data={this.props.data} sensorName={this.props.sensorName} sensorId={this.props.sensorId} />
          </div>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default withStyles(dashboardStyle)(Sensor);
