import React, { Component, Fragment } from "react";
// Material Ui
import { Paper, Button, Typography, CssBaseline } from "@material-ui/core";
// Logos
import logos from "../../assets/images/logos.png";
// Routing
import { Link } from "react-router-dom";
// Style
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import landingStyle from "./landingStyle";
import { mainTheme } from "../../assets/jss/mainStyle";

class LandingPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={mainTheme}>
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
                  <Link className={classes.noDeco} to="/login">
                    <Button
                      fullWidth
                      className={classes.submit}
                      variant="contained"
                      color="primary"
                    >
                      START
                    </Button>
                  </Link>
                </form>
              </Paper>
            </div>
          </div>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default withStyles(landingStyle)(LandingPage);
