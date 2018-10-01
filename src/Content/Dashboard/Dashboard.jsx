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
                    <Paper className={classes.paper}>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart
                          data={data2}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid
                            strokeDasharray="5 5"
                            verticalFill={["263148", "#444444"]}
                            fillOpacity={0.2}
                          />
                          <defs>
                            <linearGradient
                              id="colorUv"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#1d8cf8"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="#1d8cf8"
                                stopOpacity={0}
                              />
                            </linearGradient>
                            <linearGradient
                              id="colorPv"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#00f2c3"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="#00f2c3"
                                stopOpacity={0}
                              />
                            </linearGradient>
                            <linearGradient
                              id="colorAmt"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#fd5d93"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="#fd5d93"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <XAxis
                            dataKey="name"
                            tick={{ fill: "white" }}
                            stroke="#efefef"
                          />
                          <YAxis tick={{ fill: "white" }} stroke="#efefef" />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="uv"
                            stackId="1"
                            stroke="#1d8cf8"
                            strokeWidth="3"
                            fill="#1d8cf8"
                            fillOpacity={1}
                            fill="url(#colorUv)"
                          />
                          <Area
                            type="monotone"
                            dataKey="pv"
                            stackId="1"
                            stroke="#00f2c3"
                            strokeWidth="3"
                            fill="#00f2c3"
                            fillOpacity={1}
                            fill="url(#colorPv)"
                          />
                          <Area
                            type="monotone"
                            dataKey="amt"
                            stackId="1"
                            stroke="#fd5d93"
                            strokeWidth="3"
                            fill="#fd5d93"
                            fillOpacity={1}
                            fill="url(#colorAmt)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Paper>
                  </Grid>
                </Grid>
              </TabContainer>
            )}
            {value === 1 && <TabContainer>History</TabContainer>}
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
