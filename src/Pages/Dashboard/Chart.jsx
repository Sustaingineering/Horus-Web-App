import React, { PureComponent } from "react";
// Material UI Components
import { Paper, withStyles } from "@material-ui/core";
//Style
import { dashboardStyle } from "./dashboardStyle";

// Recharts
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
  Label
} from "recharts";

import moment from "moment";

class Chart extends PureComponent {
  renderSecondArea = () => {
    return (
      <Area
        isAnimationActive={false}
        type="monotone"
        dataKey={this.props.dataKey2}
        stackId="1"
        stroke={this.props.color}
        strokeWidth="3"
        fillOpacity="1"
        fill={`url(#${this.props.title}Color)`}
      />
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <ResponsiveContainer width="100%" height={310}>
          <AreaChart
            data={this.props.data}
            margin={{ top: 30, right: 30, left: 0, bottom: 15 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              verticalFill={[ "263148", "#444444" ]}
              fillOpacity={0.1}
            />
            <defs>
              <linearGradient
                id={`${this.props.title}Color`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={this.props.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={this.props.color}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time-stamp"
              name="Time"
              tick={{ fill: "white" }}
              stroke="#efefef"
              type="number"
              domain={[ "dataMin", "dataMax" ]}
              minTickGap={200}
              tickFormatter={unixTime =>
                moment(unixTime * 1000).format("hh:mm:ss")
              }
              scale="time"
            >
              <Label
                value="Time"
                offset={0}
                fill="white"
                position="insideBottom"
                dy={15}
              />
              <Label
                value={this.props.title}
                offset={0}
                fontSize={20}
                fill="white"
                position="top"
                dy={-250}
              />
            </XAxis>
            <YAxis
              tick={{ fill: "white" }}
              stroke="#efefef"
              label={{
                value: this.props.unit,
                fill: "white",
                angle: -90,
                position: "insideLeft"
              }}
            />
            <Tooltip
              labelFormatter={unixTime => moment(unixTime * 1000).toString()}
              formatter={(value, name, props) => [
                `${value} ${this.props.unit}`,
                this.props.title
              ]}
            />
            <Area
              isAnimationActive={false}
              type="monotone"
              dataKey={this.props.dataKey1}
              stackId="1"
              stroke={this.props.color}
              strokeWidth="3"
              fillOpacity="1"
              fill={`url(#${this.props.title}Color)`}
            />
            {this.props.dataKey2 !== undefined
              ? this.renderSecondArea()
              : undefined}
          </AreaChart>
        </ResponsiveContainer>
      </Paper>
    );
  }
}

export default withStyles(dashboardStyle)(Chart);
