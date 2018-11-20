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
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

class Dashboard extends Component {
  state = {
    value: 0,
    voltageData: [],
    currentData: [],
    powerData: [],
    tempData: []
  };

  tick = () => {
    ipcRenderer.on("get-sensor-data" + this.props.sensorName, (e, msg) => {
      if (msg.error) {
        // return alert(msg.error);
      } else {
        // return alert(msg);
      }
    });
    const voltageDummyData = [{ name: "11/9/18", voltage: 174 }];
    const currentDummyData = [{ name: "11/9/18", current: 734 }];
    const powerDummyData = [{ name: "11/9/18", power: 4 }];
    const tempDummyData = [{ name: "11/9/18", opTemp: 74, suTemp: 2.2 }];
    this.setState({
      voltageData: voltageDummyData,
      currentData: currentDummyData,
      powerData: powerDummyData,
      tempData: tempDummyData
    });
  };

  componentWillMount = () => {
    this.interval = setInterval(this.tick.bind(this), 1000);
    ipcRenderer.on("get-sensor-data" + this.props.sensorName, (e, msg) => {
      if (msg.error) {
        // return alert(msg.error);
      } else {
        // return alert(msg);
      }
    });
    const voltageDummyData = [
      { name: "11/9/18", voltage: 174 },
      { name: "11/9/18", voltage: 134 },
      { name: "11/9/18", voltage: 184 }
    ];
    const currentDummyData = [
      { name: "11/9/18", current: 734 },
      { name: "11/9/18", current: 740 },
      { name: "11/9/18", current: 800 }
    ];
    const powerDummyData = [
      { name: "11/9/18", power: 4 },
      { name: "11/9/18", power: 5 },
      { name: "11/9/18", power: 8 }
    ];
    const tempDummyData = [
      { name: "11/9/18", opTemp: 74, suTemp: 2.2 },
      { name: "12/9/18", opTemp: 64, suTemp: 0.7 },
      { name: "13/9/18", opTemp: 12, suTemp: 1.6 },
      { name: "14/9/18", opTemp: 79, suTemp: 0.8 },
      { name: "15/9/18", opTemp: 82, suTemp: 5.1 }
    ];
    this.setState({
      voltageData: voltageDummyData,
      currentData: currentDummyData,
      powerData: powerDummyData,
      tempData: tempDummyData
    });
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
            <Typography variant="display1" color="primary" gutterBottom>
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
