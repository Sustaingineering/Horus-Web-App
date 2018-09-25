import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Material UI Components
import { Drawer, Divider, List } from "@material-ui/core";
// Menu list Component
import {
  grlListItems,
  userListItems,
  adminListItems,
  settingsListItems
} from "./sidebarMenuLists";
// Icons
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// Style
import navbarmenuStyle from "./navbarmenuStyle";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

class NavBarMenu extends Component {
  constructor(props) {
    super();
    this.state = {
      openDrawer: false
    };
  }

  handleDrawerClose = () => {
    this.props.changeOpen(this.state.openDrawer);
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <Fragment>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.props.open && classes.drawerPaperClose
            )
          }}
          open={this.props.openMenu}
        >
          <div className={classes.toolbar}>
            <IconButton
              className={classes.chevron}
              onClick={this.handleDrawerClose.bind(this)}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>{grlListItems}</List>
          <Divider />
          <List>{userListItems}</List>
          <Divider />
          <List>{adminListItems}</List>
          <Divider />
          <List>{settingsListItems}</List>
        </Drawer>
      </Fragment>
    );
  }
}

NavBarMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(navbarmenuStyle, { withTheme: true })(NavBarMenu);
