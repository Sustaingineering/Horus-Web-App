import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid, Avatar, Typography } from "@material-ui/core";
import { primaryColor } from "../../assets/jss/mainStyle";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: "white",
    backgroundColor: primaryColor
  }
});

function MonitoringData(props) {
  const { classes } = props;
  const voltajeInt = 243546;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={16}>
              <Grid item>
                <Avatar>G</Avatar>
              </Grid>
              <Grid item xs>
                <Typography color="primary" variant="Subheading">
                  Voltaje
                </Typography>
                <Typography color="primary" variant="headline">
                  {voltajeInt}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

MonitoringData.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MonitoringData);
