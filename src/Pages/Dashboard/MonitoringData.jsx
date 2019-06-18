import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography } from '@material-ui/core';
import { primaryColor } from '../../assets/jss/mainStyle';

import Timeline from '@material-ui/icons/Timeline';
import ACUNIT from '@material-ui/icons/AcUnit';
import Waves from '@material-ui/icons/Waves';
import OfflineBolt from '@material-ui/icons/OfflineBolt';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'center',
    verticalAlign: 'center',
    color: 'white',
    backgroundColor: primaryColor
  },
  icon: {
    fontSize: '40px'
  }
})

class MonitoringData extends PureComponent {
  render() {
    const { classes } = this.props;
    let data = undefined;
    if (this.props.data.length === 0) {
      data = {
        voltage: undefined,
        current: undefined,
        power: undefined,
        "op-temp": undefined,
        "surface-temperature": undefined,
        "water-breaker": undefined
      }
    } else {
      data = this.props.data[this.props.data.length - 1];
    }
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={4} md={4}>
            <Paper className={classes.paper}>
              <Grid container wrap='nowrap' spacing={16}>
                <Grid item>
                  <OfflineBolt className={classes.icon} />
                </Grid>
                <Grid item xs>
                  <Typography
                    color='primary'
                    variant='caption'
                    gutterBottom
                    align='center'
                  >
                    Load Voltage
                  </Typography>
                  <Typography color='primary' variant='headline'>
                    {data["voltage"]}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Paper className={classes.paper}>
              <Grid container wrap='nowrap' spacing={16}>
                <Grid item>
                  <Timeline className={classes.icon} />
                </Grid>
                <Grid item xs>
                  <Typography
                    color='primary'
                    variant='caption'
                    gutterBottom
                    align='center'
                  >
                    Load Current
                  </Typography>
                  <Typography color='primary' variant='headline'>
                    {data["current"]}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Paper className={classes.paper}>
              <Grid container wrap='nowrap' spacing={16}>
                <Grid item>
                  <PowerSettingsNew className={classes.icon} />
                </Grid>
                <Grid item xs>
                  <Typography
                    color='primary'
                    variant='caption'
                    gutterBottom
                    align='center'
                  >
                    Power Absorbed
                  </Typography>
                  <Typography color='primary' variant='headline'>
                    {data["power"]}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Paper className={classes.paper}>
              <Grid container wrap='nowrap' spacing={16}>
                <Grid item>
                  <ACUNIT className={classes.icon} />
                </Grid>
                <Grid item xs>
                  <Typography
                    color='primary'
                    variant='caption'
                    gutterBottom
                    align='center'
                  >
                    Operating Temperature
                  </Typography>
                  <Typography color='primary' variant='headline'>
                    {data["op-temp"]}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Paper className={classes.paper}>
              <Grid container wrap='nowrap' spacing={16}>
                <Grid item>
                  <ACUNIT className={classes.icon} />
                </Grid>
                <Grid item xs>
                  <Typography
                    color='primary'
                    variant='caption'
                    gutterBottom
                    align='center'
                  >
                    Surface Temperature
                  </Typography>
                  <Typography color='primary' variant='headline'>
                    {data["surface-temperature"]}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Paper className={classes.paper}>
              <Grid container wrap='nowrap' spacing={16}>
                <Grid item>
                  <Waves className={classes.icon} />
                </Grid>
                <Grid item xs>
                  <Typography
                    color='primary'
                    variant='caption'
                    gutterBottom
                    align='center'
                  >
                    Water Breaker
                  </Typography>
                  <Typography color='primary' variant='headline'>
                    {data["water-breaker"]}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}
  

export default withStyles(styles)(MonitoringData);
