import React, { Component, Fragment } from "react";
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
// Probably won't need to use moment, just multiply time by 1000
import moment from "moment";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      voltageData: [],
      currentData: [],
      powerData: [],
      tempData: []
    }
  }

  componentDidMount = () => {
    console.log("recalc");
    let voltageData = [];
    let currentData = [];
    let powerData = [];
    let tempData = [];
    (this.props.data || []).map((e) => {
      let timeString = moment.unix(e["time-stamp"]).toISOString();
      voltageData.push({"time": timeString, "voltage": e.voltage});
      currentData.push({"time": timeString, "current": e.current});
      powerData.push({"time": timeString, "power": e.power});
      tempData.push({"time": timeString, "opTemp": e["op-temp"], "suTemp": e["surface-temperature"]});
    });
    this.setState({
      value: 0,
      voltageData: voltageData,
      currentData: currentData,
      powerData: powerData,
      tempData: tempData
    });
  }

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
                      title="Voltage"
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

export default withStyles(dashboardStyle)(Dashboard);
