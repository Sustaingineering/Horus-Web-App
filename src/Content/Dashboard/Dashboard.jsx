import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Material UI Components
import {
  Grid,
  withStyles,
  Tabs,
  Tab,
  Typography,
  MuiThemeProvider
} from "@material-ui/core";
// Components
import MonitoringData from "./MonitoringData";
import Chart from "./Chart";
import HistoryChart from "./historyChart";
//Style
import dashboardStyle from "./dashboardStyle";
import { mainTheme } from "../../assets/jss/mainStyle";
// Electron
// const electron = window.require("electron");
// const ipcRenderer = electron.ipcRenderer;

class Dashboard extends Component {
  state = {
    value: 0,
    voltageData: [],
    currentData: [],
    powerData: [],
    tempData: []
  };

  tick = () => {
    // ipcRenderer.send("get-sensor-data", { sensorId: this.props.sensorName });
  };

  componentWillMount = () => {
    this.interval = setInterval(this.tick.bind(this), 500);
    // ipcRenderer.on("get-sensor-data", (e, msg) => {
    //   console.log("renderer", msg.data[0], msg.data);
    //   if (msg.error) {
    //     // return alert(msg.error);
    //   } else {
    //     const voltageDummyData = msg.data[0];
    //     const currentDummyData = msg.data[1];
    //     const powerDummyData = msg.data[2];
    //     const tempDummyData = msg.data[3];
    //     this.setState({
    //       voltageData: voltageDummyData,
    //       currentData: currentDummyData,
    //       powerData: powerDummyData,
    //       tempData: tempDummyData
    //     });
    //   }
    // });
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Fragment>
        <MuiThemeProvider theme={mainTheme}>
          <div className={classes.root}>
            <Typography variant="h4" color="primary" gutterBottom>
              {this.props.sensorName + " Dashboard"}
            </Typography>
            <MonitoringData />
            <br />
            <Tabs
              value={value}
              className={classes.tabs}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              // scrollable
              // scrollButtons="auto"
            >
              <Tab className={classes.tab} label="Current" />
              <Tab className={classes.tab} label="History" />
              <Tab className={classes.tab} label="Summary" />
            </Tabs>
            {value === 0 && (
              <Fragment>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Chart
                      data={this.state.voltageData}
                      type="Voltage"
                      title={"Voltage"}
                      dataKey1="voltage"
                      dataKey2=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Chart
                      data={this.state.currentData}
                      type="Current"
                      title={"Current"}
                      dataKey1="current"
                      dataKey2=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Chart
                      data={this.state.powerData}
                      type="Power"
                      title={"Power"}
                      dataKey1="power"
                      dataKey2=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Chart
                      data={this.state.tempData}
                      type="Temperature"
                      title={"Temperature"}
                      dataKey1="opTemp"
                      dataKey2="suTemp"
                    />
                  </Grid>
                </Grid>
              </Fragment>
            )}
            {value === 1 && (
              <Fragment>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={12} md={6}>
                    <HistoryChart
                      data={this.state.voltageData}
                      type="Voltage"
                      title={"Voltage"}
                      dataKey1="voltage"
                      dataKey2=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <HistoryChart
                      data={this.state.currentData}
                      type="Current"
                      title={"Current"}
                      dataKey1="current"
                      dataKey2=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <HistoryChart
                      data={this.state.powerData}
                      type="Power"
                      title={"Power"}
                      dataKey1="power"
                      dataKey2=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <HistoryChart
                      data={this.state.tempData}
                      type="Temperature"
                      title={"Temperature"}
                      dataKey1="opTemp"
                      dataKey2="suTemp"
                    />
                  </Grid>
                </Grid>
              </Fragment>
            )}
            {value === 2 && <Fragment>Summary</Fragment>}
          </div>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
