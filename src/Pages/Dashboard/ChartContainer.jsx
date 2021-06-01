import React, { PureComponent } from "react";
import { Container } from "../../Components/Basics";
import Chart from "./Chart";

const dataset = [
  {
    color: "#fd5d93",
    title: "Voltage",
    unit: "Volts",
    dataKey1: "voltage",
  },
  {
    color: "#efefef",
    title: "Current",
    unit: "Amps",
    dataKey1: "current",
  },
  {
    color: "#1d8cf8",
    title: "Power",
    unit: "Watts",
    dataKey1: "power",
  },
  {
    color: "#00f2c3",
    title: "Temperature",
    unit: "Celcius",
    dataKey1: "op-temp",
    dataKey2: "surface-temperature",
  },
];

class ChartContainer extends PureComponent {
  render() {
    const data = (this.props.data || []).slice();
    return (
      <Container>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {dataset.map((e) => {
            return (
              <div className="card bg-white p-5 rounded-lg shadow-lg" key={`chart-${e.title}`}>
                <span className="w-screen"></span>
                <Chart
                  data={data}
                  color={e.color}
                  title={e.title}
                  unit={e.unit}
                  dataKey1={e.dataKey1}
                  dataKey2={e.dataKey2}
                />
              </div>
            );
          })}
        </div>
      </Container>
    );
  }
}

export default ChartContainer;
