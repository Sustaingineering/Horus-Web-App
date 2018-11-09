import React, { Fragment } from "react";
// Material UI Components
import { Paper, withStyles } from "@material-ui/core";
//Style
import dashboardStyle from "./dashboardStyle";

// Recharts
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area
} from "recharts";

class Chart extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        {(() => {
          switch (this.props.type) {
            case "voltage":
              return (
                <Paper className={classes.paper}>
                  <div className={classes.title}>{this.props.title}</div>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={this.props.data}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="5 5"
                        verticalFill={["263148", "#444444"]}
                        fillOpacity={0.2}
                      />
                      <defs>
                        <linearGradient
                          id="colorvoltage"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#f7ff00"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#f7ff00"
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
                        dataKey={this.props.dataKey1}
                        stackId="1"
                        stroke="#f7ff00"
                        strokeWidth="3"
                        fillOpacity={1}
                        fill="url(#colorvoltage)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Paper>
              );
            case "current":
              return (
                <Paper className={classes.paper}>
                  <div className={classes.title}>{this.props.title}</div>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={this.props.data}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="5 5"
                        verticalFill={["263148", "#444444"]}
                        fillOpacity={0.2}
                      />
                      <defs>
                        <linearGradient
                          id="colorcurrent"
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
                        dataKey={this.props.dataKey1}
                        stackId="1"
                        stroke="#1d8cf8"
                        strokeWidth="3"
                        fillOpacity={1}
                        fill="url(#colorcurrent)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Paper>
              );
            case "power":
              return (
                <Paper className={classes.paper}>
                  <div className={classes.title}>{this.props.title}</div>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={this.props.data}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="5 5"
                        verticalFill={["263148", "#444444"]}
                        fillOpacity={0.2}
                      />
                      <defs>
                        <linearGradient
                          id="colorpower"
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
                        dataKey={this.props.dataKey1}
                        stackId="1"
                        stroke="#00f2c3"
                        strokeWidth="3"
                        fillOpacity={1}
                        fill="url(#colorpower)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Paper>
              );
            case "temp":
              return (
                <Paper className={classes.paper}>
                  <div className={classes.title}>{this.props.title}</div>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={this.props.data}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="5 5"
                        verticalFill={["263148", "#444444"]}
                        fillOpacity={0.2}
                      />
                      <defs>
                        <linearGradient
                          id="colortemp1"
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
                        <linearGradient
                          id="colortemp2"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#FD5F00"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#FD5F00"
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
                        dataKey={this.props.dataKey1}
                        stackId="1"
                        stroke="#fd5d93"
                        strokeWidth="3"
                        fillOpacity={1}
                        fill="url(#colortemp1)"
                      />
                      <Area
                        type="monotone"
                        dataKey={this.props.dataKey1}
                        stackId="1"
                        stroke="#FD5F00"
                        strokeWidth="3"
                        fillOpacity={1}
                        fill="url(#colortemp2)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Paper>
              );
            default:
              return null;
          }
        })()}
      </Fragment>
    );
  }
}

export default withStyles(dashboardStyle)(Chart);
