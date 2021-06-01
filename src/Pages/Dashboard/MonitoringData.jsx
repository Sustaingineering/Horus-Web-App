import React, { PureComponent } from "react";
import { Container } from "../../Components/Basics";
import { LightningBoltIcon, TrendingUpIcon, } from "@heroicons/react/outline";

const iconMap = (classes) => {
  return {
    voltage: <OfflineBolt />,
    current: <Timeline />,
    power: <PowerSettingsNew />,
    "op-temp": <AcUnit />,
    "surface-temperature": <AcUnit />,
    "water-breaker": <Waves />,
  };
};

const textMap = {
  voltage: "Load Voltage",
  current: "Load Current",
  power: "Power Absorbed",
  "op-temp": "Operating Temperature",
  "surface-temperature": "Surface Temperature",
  "water-breaker": "Water Breaker",
};

class MonitoringData extends PureComponent {
  generateInfoBoxes = (data) => {
    let { classes } = this.props;
    let boxes = [];
    let icons = iconMap(classes);
    for (let type in textMap) {
      boxes.push(
        <Grid item xs={12} sm={6} md={4} key={type}>
          <div>
            <Card>
              <CardHeader
                avatar={icons[type]}
                title={textMap[type]}
                titleTypographyProps={{ variant: "button" }}
              />
              <CardContent>
                <Typography color="primary" variant="h5">
                  {data[type] !== undefined
                    ? data[type] % 1 === 0
                      ? data[type]
                      : Number(data[type] * 1000).toFixed(2)
                    : undefined}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Grid>
      );
    }
    return boxes;
  };

  render() {
    let data = {};
    if (this.props.data.length !== 0) {
      data = this.props.data[this.props.data.length - 1];
    }
    return (
      <Container>
        <div className="grid-flow-row lg:grid-cols-3 md:grid-cols-2 grid-cols-1 stats w-full rounded-lg shadow-lg">
          {Object.keys(textMap).map((type) => (<div className="stat" key={`monitoring-data-${type}`}>
            <div className="stat-figure text-info">{}</div>
            <div className="stat-title">{textMap[type]}</div>
            <div className="stat-value text-info">{Number(data[type]).toFixed(2)}</div>
            {/* <div className="stat-desc">21% more than last month</div> */}
          </div>))}
          {/* <div className="stat">
            <div className="stat-figure text-primary"></div>
          </div>
          <div className="stat">
            <div className="stat-figure text-info"></div>
            <div className="stat-title">Page Views</div>
            <div className="stat-value text-info">2.6M</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-info">
              <div className="avatar online">
                <div className="w-16 h-16 p-1 mask mask-squircle bg-base-100">
                  <img
                    src="/tailwind-css-component-profile-5@56w.png"
                    alt="Avatar Tailwind CSS Component"
                    className="mask mask-squircle"
                  />
                </div>
              </div>
            </div>
            <div className="stat-value">86%</div>
            <div className="stat-title">Tasks done</div>
            <div className="stat-desc text-info">31 tasks remaining</div>
          </div> */}
        </div>
      </Container>
    );
  }
}

export default MonitoringData;
