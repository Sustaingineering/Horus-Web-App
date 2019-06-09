import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Router
import { Link } from "react-router-dom";
// Material UI Components
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";
// Navbar Menu - drawer component
import NavBarMenu from "../NavBarMenu/NavBarMenu";
// Icons
import MenuIcon from "@material-ui/icons/Menu";
// Style
import navbarStyle from "./navbarStyle";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
// Firebase
import SignOutButton from "../../Pages/Auth/SignOut";

import { FirebaseContext } from "../../Firebase/firebase.js";

const nameStyle = {
  textDecoration: "none",
  color: "white"
};

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

  render() {
    const { classes } = this.props;
    // const { anchorEl } = this.state;
    // const open = Boolean(anchorEl);

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
              <Typography variant="h6" color="inherit" className={classes.flex}>
                <Link style={nameStyle} to="/">
                  Horus
                </Link>
              </Typography>
              <FirebaseContext.Consumer>
                {firebase => <SignOutButton firebase={firebase} />}
              </FirebaseContext.Consumer>
            </Toolbar>
          </AppBar>
          <NavBarMenu
            open={this.state.open}
            changeOpen={this.handleDrawerClose.bind(this)}
          />
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
