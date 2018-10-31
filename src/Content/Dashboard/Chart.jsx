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
  Pie,
  Label
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

class Chart extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const { classes } = this.props;
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
        );
    }
}


export default withStyles(dashboardStyle)(Chart);