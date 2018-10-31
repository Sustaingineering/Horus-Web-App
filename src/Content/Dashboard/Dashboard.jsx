import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Material UI Components
import {
  Grid,
  Paper,
  withStyles,
  Tabs,
  Tab,
  Typography,
  MuiThemeProvider
} from "@material-ui/core";
import MonitoringData from "./MonitoringData";
//Style
import dashboardStyle from "./dashboardStyle";

import Chart from "./Chart";



// Recharts
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  ScatterChart,
  Scatter,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadarChart,
  Radar,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie
} from "recharts";
import {
  data,
  data1,
  data2,
  data3,
  data4,
  data5,
  colors,
  renderCustomizedLabel,
  RadialBarChartStyle
} from "./data";
import { mainTheme } from "../../assets/jss/mainStyle";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class Dashboard extends Component {
  state = {
    value: 0
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
              Dashboard
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
              <Tab className={classes.tab} label="Real-Time" />
              <Tab className={classes.tab} label="History" />
              <Tab className={classes.tab} label="Summary" />
            </Tabs>
            {value === 0 && (
              <TabContainer>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={12} md={6}>
                    <div className="first_column">
                      <Chart data={data} title={"Voltage"}/>
                      <br />
                      <Chart data={data1} title={"Current"}/>
                    </div>
                    <br />
                    <Chart data={data2} title={"Power"}/>
                    <br />
                    <Chart data={data} title={"Temperature"}/>
                  </Grid>
                </Grid>
              </TabContainer>
            )}
            {value === 1 && 
            <TabContainer>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={6}>
                  <Chart data={data} title={"Voltage"}/>
                  <br />
                  <Chart data={data1} title={"Current"}/>
                  <br />
                  <Chart data={data2} title={"Power"}/>
                  <br />
                  <Chart data={data} title={"Temperature"}/>
                </Grid>
              </Grid>
            </TabContainer>}
            {value === 2 && <TabContainer>Summary</TabContainer>}
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
