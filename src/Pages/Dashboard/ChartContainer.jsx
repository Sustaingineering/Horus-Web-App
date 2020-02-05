import React, { PureComponent } from "react";
import { Grid } from "@material-ui/core";
import Chart from "./Chart";

const dataset = [
  {
    color: "#fd5d93",
    title: "Voltage",
    unit: "Volts",
    dataKey1: "voltage"
  },
  {
    color: "#efefef",
    title: "Current",
    unit: "Amps",
    dataKey1: "current"
  },
  {
    color: "#1d8cf8",
    title: "Power",
    unit: "Watts",
    dataKey1: "power"
  },
  {
    color: "#00f2c3",
    title: "Temperature",
    unit: "Celcius",
    dataKey1: "op-temp",
    dataKey2: "surface-temperature"
  }
];

class ChartContainer extends PureComponent {
  render() {
    const data = (this.props.data || []).slice();
    return (
      <Grid container spacing={3}>
        {dataset.map(e => {
          return (
            <Grid key={e.title} item xs={12} sm={12} md={6}>
              <Chart
                data={data}
                color={e.color}
                title={e.title}
                unit={e.unit}
                dataKey1={e.dataKey1}
                dataKey2={e.dataKey2}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default ChartContainer;
