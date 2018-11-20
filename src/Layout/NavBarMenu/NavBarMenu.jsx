import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Material UI Components
import {
  Drawer,
  Divider,
  List,
  MuiThemeProvider,
  withStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography
} from "@material-ui/core";
// Routing
import { Link } from "react-router-dom";
// Icons
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Dashboard from "@material-ui/icons/Dashboard";
import Settings from "@material-ui/icons/SettingsRounded";
import GraphicEQ from "@material-ui/icons/GraphicEq";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
// Style
import navbarmenuStyle from "./navbarmenuStyle";
import classNames from "classnames";
import { mainTheme } from "../../assets/jss/mainStyle";
// Electron
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

const style = {
  textDecoration: "none",
  color: "white"
};

class NavBarMenu extends Component {
  constructor(props) {
    super();
    this.state = {
      openDrawer: false,
      open: false,
      sensorsList: [{}]
    };
  }

  componentWillMount = () => {
    ipcRenderer.on("get-sensors", (e, msg) => {
      if (msg.error) {
        // return alert(msg.error);
      } else {
        // return alert(msg);
      }
    });
    var temp = [
      { name: "S1", type: "default" },
      { name: "S2", type: "default" },
      { name: "S3", type: "default" },
      { name: "S4", type: "default" },
      { name: "S5", type: "default" }
    ];
    this.setState({ sensorsList: temp });
  };

  handleClick = () => {
    this.setState(state => ({
      open: !state.open
    }));
    this.props.changeOpen(!this.state.openDrawer);
  };

  handleDrawerClose = () => {
    this.setState(state => ({
      open: false
    }));
    this.props.changeOpen(this.state.openDrawer);
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <Fragment>
        <div className={classes.root}>
          <MuiThemeProvider theme={mainTheme}>
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
              <List>
                <Link style={style} to="/dashboard">
                  <ListItem button onClick={this.handleDrawerClose}>
                    <ListItemIcon>
                      <Dashboard style={style} />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.listItems}
                      primary={
                        <Typography type="body2" style={{ color: "#FFFFFF" }}>
                          Dashboard
                        </Typography>
                      }
                    />
                  </ListItem>
                </Link>

                <ListItem style={style} button onClick={this.handleClick}>
                  <ListItemIcon>
                    <GraphicEQ style={style} />
                  </ListItemIcon>
                  <ListItemText
                    key="SensorList"
                    inset
                    primary={
                      <Typography type="body2" style={{ color: "#FFFFFF" }}>
                        Sensor
                      </Typography>
                    }
                  />
                  {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {this.state.sensorsList.map(sensor => (
                      <Link key={sensor.name} style={style} to={sensor.name}>
                        <ListItem
                          key={sensor.name}
                          button
                          onClick={this.handleDrawerClose}
                        >
                          <ListItemIcon>
                            <Dashboard style={style} />
                          </ListItemIcon>
                          <ListItemText
                            className={classes.listItems}
                            primary={
                              <Typography
                                type="body2"
                                style={{ color: "#FFFFFF" }}
                              >
                                {sensor.name}
                              </Typography>
                            }
                          />
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </List>
              <Divider className={classes.sidebarDivider} />
              <List className={classes.settings}>
                <Link style={style} to="/config">
                  <ListItem button onClick={this.handleDrawerClose}>
                    <ListItemIcon>
                      <Settings style={style} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography type="body2" style={{ color: "#FFFFFF" }}>
                          Config
                        </Typography>
                      }
                    />
                  </ListItem>
                </Link>
              </List>
            </Drawer>
          </MuiThemeProvider>
        </div>
      </Fragment>
    );
  }
}

NavBarMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(navbarmenuStyle, { withTheme: true })(NavBarMenu);
