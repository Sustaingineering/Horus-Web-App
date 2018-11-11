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
  Area,
  Label
} from "recharts";

class Chart extends React.Component {
  render() {
    const { classes } = this.props;
    let Voltage = "Voltage";
    let Current = "Current";
    let Power = "Power";
    let Temperature = "Temperature";

    return (
      <Fragment>
        {(() => {
          switch (this.props.type) {
            case Voltage:
              return (
                <Paper className={classes.paper}>
                  {/* <div className={classes.title}>{this.props.title}</div> */}
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={this.props.data}
                      margin={{ top: 30, right: 30, left: 0, bottom: 10 }}
                    >
                      <CartesianGrid
                        strokeDasharray="5 5"
                        verticalFill={["263148", "#444444"]}
                        fillOpacity={0.2}
                      />
                      
            {/* <XAxis dataKey="name">
              <Label value="Time" offset={0} fill= 'white' position="insideBottom" dy={10}/>
              <Label value={this.props.title} offset={0} fontSize={20} fill= 'white' position="top" dy={-240} />
            </XAxis> */}

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
                      >
                        <Label value="Time" offset={0} fill= 'white' position="insideBottom" dy={10}/>
                        <Label value={Voltage} offset={0} fontSize={20} fill= 'white' position="top" dy={-245} />      
                      </XAxis>
                      <YAxis tick={{ fill: "white" }} stroke="#efefef" 
                      label={{value: "Volts", fill: 'white', angle: -90, position: 'insideLeft' }} />
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
            case Current:
              return (
                <Paper className={classes.paper}>
                  {/* <div className={classes.title}>{this.props.title}</div> */}
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={this.props.data}
                      margin={{ top: 30, right: 30, left: 0, bottom: 10 }}                    >
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
                      >
                        <Label value="Time" offset={0} fill= 'white' position="insideBottom" dy={10}/>
                        <Label value={Current} offset={0} fontSize={20} fill= 'white' position="top" dy={-245} />  
                      </XAxis>
                                         

                      <YAxis tick={{ fill: "white" }} stroke="#efefef" 
                             label={{value: "Amps", fill: 'white', angle: -90, position: 'insideLeft' }} />/>
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
            case Power:
              return (
                <Paper className={classes.paper}>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={this.props.data}
                      margin={{ top: 30, right: 30, left: 0, bottom: 10 }}                    >
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
                      >
                        <Label value="Time" offset={0} fill= 'white' position="insideBottom" dy={10}/>
                        <Label value={Power} offset={0} fontSize={20} fill= 'white' position="top" dy={-245} /> 
                      </XAxis>
                      <YAxis tick={{ fill: "white" }} stroke="#efefef" 
                              label={{value: "Watts", fill: 'white', angle: -90, position: 'insideLeft' }} />
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
            case Temperature:
              return (
                <Paper className={classes.paper}>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={this.props.data}
                      margin={{ top: 30, right: 30, left: 0, bottom: 10 }}                    >
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
                      >
                        <Label value="Time" offset={0} fill= 'white' position="insideBottom" dy={10}/>
                        <Label value={Temperature} offset={0} fontSize={20} fill= 'white' position="top" dy={-245} /> 
                      </XAxis>
                      <YAxis tick={{ fill: "white" }} stroke="#efefef" 
                             label={{value: "Celsius", fill: 'white', angle: -90, position: 'insideLeft' }} />
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
