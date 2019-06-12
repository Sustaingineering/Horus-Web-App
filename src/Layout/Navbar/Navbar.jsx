import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Material UI Components
import {
  AppBar,
  Toolbar,
  IconButton,
  Button
} from "@material-ui/core";
// Navbar Menu - drawer component
import NavBarMenu from "../NavBarMenu/NavBarMenu";
// Icons
import MenuIcon from "@material-ui/icons/Menu";
// Style
import navbarStyle from "./navbarStyle";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import { FirebaseContext } from "../../Firebase/firebase";

class Navbar extends Component {
  state = {
    anchorEl: null,
    open: false
  };

  // drawer
  handleDrawerOpen = () => {
    console.log("Open");
    this.setState({ open: true });
  };

  handleDrawerClose = drawerOpen => {
    console.log("Close");
    this.setState({ open: drawerOpen });
  };

  signOut = () => {
    this.props.firebase.auth().signOut();
  }

  render() {
    const { classes } = this.props;

    // Refresh to check if token is still valid on every nav
    this.props.firebase.auth().currentUser.reload();

    return (
      <Fragment>
        <div className={classes.root}>
          <AppBar
            position="static"
            className={classNames(
              classes.appBar,
              this.state.open && classes.appBarShift
            )}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.hide
                )}
              >
                <MenuIcon />
              </IconButton>
              {/* This is a hacky way of moving the signout button over. Fix later? */}
              <div className={classes.flex}></div>
              <Button className={classes.button} color="primary" onClick={this.signOut}>
                Sign Out
              </Button>
            </Toolbar>
          </AppBar>
          <FirebaseContext.Consumer>
            {firebase => 
              <NavBarMenu 
                firebase={firebase} 
                updateSensors={this.props.updateSensors} 
                sensors={this.props.sensors} 
                open={this.state.open} 
                changeOpen={this.handleDrawerClose.bind(this)} />
            }
          </FirebaseContext.Consumer>
          

        </div>
      </Fragment>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(navbarStyle, { withTheme: true })(Navbar);
