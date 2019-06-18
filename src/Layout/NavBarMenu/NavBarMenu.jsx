import React, { PureComponent, Fragment } from "react";
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
  Typography,
  Button,
  TextField
} from "@material-ui/core";
// Routing
import { Link } from "react-router-dom";
// Icons
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Dashboard from "@material-ui/icons/Dashboard";
import SensorIcon from "@material-ui/icons/Folder";
import Settings from "@material-ui/icons/SettingsRounded";
import GraphicEQ from "@material-ui/icons/GraphicEq";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AddButton from "@material-ui/icons/Add";
import DeleteButton from "@material-ui/icons/Delete";
// Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// Style
import navbarmenuStyle from "./navbarmenuStyle";
import classNames from "classnames";
import { mainTheme } from "../../assets/jss/mainStyle";

const style = {
  textDecoration: "none",
  color: "white"
};

class NavBarMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.toggle = false;
    this.state = {
      drawerOpen: false,
      dialog: undefined,
      sensorName: undefined,
      sensorId: undefined,
      sensorsList: [{}]
    };
  }

  toggleDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
    this.props.changeOpen(!this.toggle);
  };

  handleDrawerClose = () => {
    this.setState({
      drawerOpen: false
    });
    this.props.changeOpen(this.toggle);
  };

  modifySensor = () => {
    console.log(this.state.sensorId, this.state.sensorName);
    let db = this.props.firebase.firestore();
    let uid = this.props.firebase.auth().currentUser.uid;
    if (this.state.sensorName !== undefined) {
      if (this.state.dialog === "add" && this.state.sensorId !== undefined) {
        let add = {sensors: {}};
        // Cannot use variables as keys otherwise :(
        add.sensors[this.state.sensorName] = this.state.sensorId;
        db.collection("users").doc(uid).set(add, {merge: true}).then(() => this.props.updateSensors());
        console.log("Added");
      } else if (this.state.dialog === "remove") {
        let remove = {};
        remove[["sensors." + this.state.sensorName]] = this.props.firebase.firestore.FieldValue.delete();
        console.log(remove);
        db.collection("users").doc(uid).update(remove).then(() => this.props.updateSensors());
        console.log("Removed");
      }
    }
    this.closeDialog();
  }

  closeDialog = () => {
    this.handleDrawerClose();
    this.setState({
      dialog: undefined,
      sensorId: undefined,
      sensorName: undefined
    });
  }

  openDialog = (type) => {
    return () => {
      this.setState({
        dialog: type
      });
    }
  }

  processSensors = () => {
    let sensorPages = [];
    for (let sensor in this.props.sensors) {
      sensorPages.push(
      <Link key={sensor + "-key"} style={style} to={"/" + sensor}>
        <ListItem key={sensor} button onClick={this.handleDrawerClose}>
          <ListItemIcon>
            <SensorIcon style={style} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography type="body2" style={{ color: "#FFFFFF" }}>
                {sensor}
              </Typography>
            }
          />
        </ListItem>
      </Link>);
    }
    return sensorPages;
  }

  renderDialog = () => {
    // We return each different dialog state to prevent the flashing on
    // render change when we return to an undefined dialog state
    if (this.state.dialog === "remove") {
      return (<Fragment><DialogTitle id="form-dialog-title">Delete a sensor</DialogTitle>
      <DialogContent>
        <DialogContentText>
        To delete an existing sensor from your account, simply type in its readable name.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="sensor-name"
          label="Unique Sensor Name"
          value={this.state.sensorName || ""}
          onChange={val => this.setState({sensorName: val.target.value})}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={this.closeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={this.modifySensor} color="primary">
          Delete
        </Button>
      </DialogActions></Fragment>);
    } else if (this.state.dialog === "add") {
      return (<Fragment><DialogTitle id="form-dialog-title">Add a sensor</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a sensor, give it a descriptive (unique) name, and input its unique ID.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="sensor-name"
          label="Unique Sensor Name"
          value={this.state.sensorName || ""}
          onChange={val => this.setState({sensorName: val.target.value})}
          fullWidth
        />
        <TextField
          margin="dense"
          id="unique-sensor-id"
          label="Unique Sensor ID"
          value={this.state.sensorId || ""}
          onChange={val => this.setState({sensorId: val.target.value})}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={this.closeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={this.modifySensor} color="primary">
          Add
        </Button>
      </DialogActions></Fragment>);
    } else {
      return (<DialogActions></DialogActions>)
    }
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <Fragment>
        <div className={classes.root}>
          <Dialog open={this.state.dialog !== undefined} onClose={this.closeDialog}>
            {this.renderDialog()}
          </Dialog>
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
                <Link style={style} to="/">
                  <ListItem button onClick={this.handleDrawerClose}>
                    <ListItemIcon>
                      <Dashboard style={style} />
                    </ListItemIcon>
                    <ListItemText
                      key="Home-button"
                      primary={
                        <Typography type="body2" style={{ color: "#FFFFFF" }}>
                          Home
                        </Typography>
                      }
                    />
                  </ListItem>
                </Link>

                <ListItem style={style} button onClick={this.toggleDrawer}>
                  <ListItemIcon>
                    <GraphicEQ style={style} />
                  </ListItemIcon>
                  <ListItemText
                    key="SensorList-button"
                    primary={
                      <Typography type="body2" style={{ color: "#FFFFFF" }}>
                        Sensor
                      </Typography>
                    }
                  />
                  {this.state.drawerOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.drawerOpen} timeout="auto" unmountOnExit>
                  <List>
                    {this.processSensors(classes).map((e) => e)}
                    <ListItem key={"DeleteSensor-button"} button onClick={this.openDialog("remove")}>
                      <ListItemIcon>
                        <DeleteButton style={style} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography type="body2" style={{ color: "#FFFFFF" }}>
                            Delete
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem key={"AddSensor-button"} button onClick={this.openDialog("add")}>
                      <ListItemIcon>
                        <AddButton style={style} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography type="body2" style={{ color: "#FFFFFF" }}>
                            Add..
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </Collapse>
              </List>
              <Divider className={classes.sidebarDivider} />
              <List>
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

export default withStyles(navbarmenuStyle, { withTheme: true })(NavBarMenu);
