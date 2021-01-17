import React, { PureComponent } from "react";
// Material UI Components
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Grid,
  ClickAwayListener
} from "@material-ui/core";
// Navbar Menu - drawer component
import NavBarMenu from "../NavBarMenu/NavBarMenu";
// Icons
import MenuIcon from "@material-ui/icons/Menu";
// Style

class Navbar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      sensorsOpen: false
    };
  }

  setSensorOpenState = state => {
    this.setState({
      sensorsOpen: state
    });
  };

  setDrawerOpenState = state => {
    this.setState({
      drawerOpen: state
    });
  };

  signOut = () => {
    this.props.firebase.auth().signOut();
  };

  render() {
    // Refresh to check if token is still valid on every nav
    this.props.firebase.auth().currentUser.reload();

    return (
      <ClickAwayListener
        onClickAway={() => {
          this.setDrawerOpenState(false);
          this.setSensorOpenState(false);
        }}
      >
        <div>
          <AppBar position="static">
            <Toolbar>
              <Grid justify="space-between" container spacing={0}>
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => {
                      this.setDrawerOpenState(!this.state.drawerOpen);
                      this.setSensorOpenState(false);
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Button
                    color="primary"
                    onClick={this.signOut}
                  >
                    Sign Out
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <NavBarMenu
            firebase={this.props.firebase}
            sensors={this.props.sensors}
            isDrawerOpen={this.state.drawerOpen}
            isSensorsOpen={this.state.sensorsOpen}
            setDrawerOpenState={this.setDrawerOpenState}
            setSensorOpenState={this.setSensorOpenState}
          />
        </div>
      </ClickAwayListener>
    );
  }
}

export default Navbar;
