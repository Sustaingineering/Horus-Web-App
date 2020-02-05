import React, { PureComponent } from "react";
import { Paper, Button, Typography } from "@material-ui/core";
import logos from "../../assets/images/logos.png";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import landingStyle from "./landingStyle";

class LandingPage extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div>
            <img className={classes.logos} src={logos} alt="logos" />
          </div>
        </Paper>
        <div className={classes.container}>
          <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.title}>
              Horus Monitoring
            </Typography>
            <form className={classes.form}>
              <Link to="/login">
                <Button
                  fullWidth
                  className={classes.submit}
                  variant="contained"
                  color="primary"
                >
                  SIGN IN
                </Button>
              </Link>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(landingStyle)(LandingPage);
