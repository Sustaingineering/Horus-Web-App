import React, { PureComponent } from "react";


const iconMap = classes => {
  return {
    voltage: <OfflineBolt />,
    current: <Timeline />,
    power: <PowerSettingsNew />,
    "op-temp": <AcUnit />,
    "surface-temperature": <AcUnit />,
    "water-breaker": <Waves />
  };
};

const textMap = {
  voltage: "Load Voltage",
  current: "Load Current",
  power: "Power Absorbed",
  "op-temp": "Operating Temperature",
  "surface-temperature": "Surface Temperature",
  "water-breaker": "Water Breaker"
};

class MonitoringData extends PureComponent {
  generateInfoBoxes = data => {
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
                      : Number(data[type]).toFixed(2)
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
      <Grid container spacing={3}>
        {this.generateInfoBoxes(data)}
      </Grid>
    );
  }
}

export default MonitoringData;
