import React, { PureComponent, Fragment } from "react";
// Material UI Components
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
// Navbar Menu - drawer component
import NavBarMenu from "../NavBarMenu/NavBarMenu";
// Icons
import MenuIcon from "@material-ui/icons/Menu";
// Style
import navbarStyle from "./navbarStyle";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

class Navbar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  setDrawerOpenState = open => {
    this.setState({ open });
  };

  signOut = () => {
    this.props.firebase.auth().signOut();
  };

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
                onClick={() => {
                  this.setDrawerOpenState(true);
                }}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.hide
                )}
              >
                <MenuIcon />
              </IconButton>
              <div className={classes.flex}></div>
              <Button
                className={classes.button}
                color="primary"
                onClick={this.signOut}
              >
                Sign Out
              </Button>
            </Toolbar>
          </AppBar>
          <NavBarMenu
            firebase={this.props.firebase}
            updateSensors={this.props.updateSensors}
            sensors={this.props.sensors}
            isOpen={this.state.open}
            changeDrawerOpen={this.setDrawerOpenState}
          />
        </div>
      </Fragment>
    );
  }
}

export default withStyles(navbarStyle)(Navbar);
