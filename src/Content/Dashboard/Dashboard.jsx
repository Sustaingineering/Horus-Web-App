import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Material UI Components
import { Grid, Paper } from "@material-ui/core";
//Style
import dashboardStyle from "./dashboardStyle";
import { withStyles } from "@material-ui/core/styles";
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

class Dashboard extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={5}>
              <Paper className={classes.paper}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart
                    // width="100%"
                    // height="100%"
                    onMouseEnter={this.onPieEnter}
                  >
                    <Pie
                      dataKey="value"
                      data={data5}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                    >
                      {data5.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={colors[index % colors.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
              <Paper className={classes.paper}>
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart
                    // width="100%"
                    // height="100%"
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={160}
                    barSize={15}
                    data={data}
                  >
                    <RadialBar
                      minAngle={15}
                      label={{ position: "insideStart", fill: "#fff" }}
                      background
                      clockWise={true}
                      dataKey="uv"
                    />
                    <Legend
                      iconSize={10}
                      width={100}
                      height={100}
                      layout="vertical"
                      // chartHeight="100%"
                      wrapperStyle={RadialBarChartStyle}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Paper className={classes.paper}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={data1}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="female" stackId="a" fill="#8884d8" />
                    <Bar dataKey="male" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="uv" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Paper className={classes.paper}>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={data2}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="uv"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Area
                      type="monotone"
                      dataKey="pv"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                    />
                    <Area
                      type="monotone"
                      dataKey="amt"
                      stackId="1"
                      stroke="#ffc658"
                      fill="#ffc658"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper className={classes.paper}>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="85%"
                    // width="100%"
                    // height="100%"
                    data={data3}
                    margin={{ top: 0, right: 35, bottom: 0, left: 35 }}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar
                      name="Mike"
                      dataKey="A"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.5}
                    />
                    <Radar
                      name="Lily"
                      dataKey="B"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.5}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart
                    width={400}
                    height={400}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <XAxis
                      type="number"
                      dataKey={"x"}
                      name="stature"
                      unit="cm"
                    />
                    <YAxis
                      type="number"
                      dataKey={"y"}
                      name="weight"
                      unit="kg"
                    />
                    <CartesianGrid />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter name="A school" data={data4} fill="#8884d8">
                      {data4.map((entry, index) => {
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                          />
                        );
                      })}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
