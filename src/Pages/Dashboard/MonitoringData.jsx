import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { monitoringStyle } from "./dashboardStyle";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography } from "@material-ui/core";

import Timeline from "@material-ui/icons/Timeline";
import AcUnit from "@material-ui/icons/AcUnit";
import Waves from "@material-ui/icons/Waves";
import OfflineBolt from "@material-ui/icons/OfflineBolt";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";

const iconMap = classes => {
  return {
    voltage: <OfflineBolt className={classes.icon} />,
    current: <Timeline className={classes.icon} />,
    power: <PowerSettingsNew className={classes.icon} />,
    "op-temp": <AcUnit className={classes.icon} />,
    "surface-temperature": <AcUnit className={classes.icon} />,
    "water-breaker": <Waves className={classes.icon} />
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
  generateInfoBoxes = (data) => {
    let { classes } = this.props;
    let boxes = [];
    let icons = iconMap(classes);
    for (let type in textMap) {
      boxes.push(
        <Grid item xs={12} sm={4} md={4} key={type}>
          <div className={classes.container}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={16}>
              <Grid item>{icons[type]}</Grid>
              <Grid item xs>
                <Typography
                  color="primary"
                  variant="caption"
                  gutterBottom
                  align="center"
                >
                  {textMap[type]}
                </Typography>
                <Typography color="primary" variant="h5">
                  {data[type] !== undefined
                    ? data[type] % 1 === 0
                      ? data[type]
                      : Number(data[type]).toFixed(2)
                    : undefined}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          </div>
        </Grid>
      );
    }
    return boxes;
  };

  render() {
    const { classes } = this.props;
    let data = {};
    if (this.props.data.length !== 0) {
      data = this.props.data[this.props.data.length - 1];
    }
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          {this.generateInfoBoxes(data)}
        </Grid>
      </div>
    );
  }
}

export default withStyles(monitoringStyle)(MonitoringData);
