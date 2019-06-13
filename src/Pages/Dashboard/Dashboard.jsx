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
// import HistoryChart from "./historyChart";
//Style
import dashboardStyle from "./dashboardStyle";
import { mainTheme } from "../../assets/jss/mainStyle";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    }
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const data = (this.props.data || []).slice();
    return (
      <Fragment>
        <MuiThemeProvider theme={mainTheme}>
          <div className={classes.root}>
            <Typography variant="h4" color="primary" gutterBottom>
              {this.props.sensorName + " Dashboard"}
            </Typography>
            <MonitoringData data={data} />
            <br />
            <Tabs
              value={value}
              className={classes.tabs}
              // onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              // scrollable
              // scrollButtons="auto"
            >
              <Tab className={classes.tab} label="Data" />
              {/* <Tab className={classes.tab} label="History" />
              <Tab className={classes.tab} label="Summary" /> */}
            </Tabs>
              <Fragment>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Chart
                      data={data}
                      type="Voltage"
                      title="Voltage"
                      dataKey1="voltage"
                      dataKey2=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Chart
                      data={data}
                      type="Current"
                      title={"Current"}
                      dataKey1="current"
                      dataKey2=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Chart
                      data={data}
                      type="Power"
                      title={"Power"}
                      dataKey1="power"
                      dataKey2=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Chart
                      data={data}
                      type="Temperature"
                      title={"Temperature"}
                      dataKey1="op-temp"
                      dataKey2="suTemp"
                    />
                  </Grid>
                </Grid>
              </Fragment>
          </div>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);
