import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Router
import { Link } from "react-router-dom";
// Material UI Components
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton
} from "@material-ui/core";
// Navbar Menu - drawer component
import NavBarMenu from "../NavBarMenu/NavBarMenu";
// Icons
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
// Style
import navbarStyle from "./navbarStyle";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
// Firebase
import SignOutButton from "../../Pages/Auth/SignOut";

const nameStyle = {
  textDecoration: "none",
  color: "white"
};

const profileStyle = {
  textDecoration: "none"
};

class Navbar extends Component {
  state = {
    anchorEl: null,
    open: false
  };

  // profile icon
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  // drawer
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = drawerOpen => {
    this.setState({ open: drawerOpen });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

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
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                <Link style={nameStyle} to="/">
                  Horus
                </Link>
              </Typography>
              <IconButton
                aria-owns={open ? "menu-appbar" : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={this.handleClose}
              >
                <Link style={profileStyle} to="/">
                  <MenuItem
                    className={classes.button}
                    onClick={this.handleClose}
                  >
                    <AccountCircle className={classes.ltf} />
                    Profile
                  </MenuItem>
                </Link>
                <MenuItem>
                  <SignOutButton />
                </MenuItem>
              </Menu>
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
