import React, { PureComponent } from "react";
// Material UI Components
import { AppBar, Toolbar, IconButton, Button, Grid } from "@material-ui/core";
// Navbar Menu - drawer component
import NavBarMenu from "../NavBarMenu/NavBarMenu";
// Icons
import MenuIcon from "@material-ui/icons/Menu";
// Style
import navbarStyle from "./navbarStyle";
import { withStyles } from "@material-ui/core";

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
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Grid justify="space-between" container spacing={0}>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => {
                    this.setDrawerOpenState(!this.state.open);
                  }}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Button
                  className={classes.button}
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
          isOpen={this.state.open}
          changeDrawerOpen={this.setDrawerOpenState}
        />
      </div>
    );
  }
}

export default withStyles(navbarStyle)(Navbar);
