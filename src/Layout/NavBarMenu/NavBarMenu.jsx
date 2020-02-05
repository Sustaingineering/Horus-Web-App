import React, { PureComponent } from "react";
// Material UI Components
import {
  Drawer,
  Divider,
  List,
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
import Dashboard from "@material-ui/icons/Dashboard";
import SensorIcon from "@material-ui/icons/Folder";
import CloseIcon from "@material-ui/icons/Close";
import Settings from "@material-ui/icons/SettingsRounded";
import GraphicEQ from "@material-ui/icons/GraphicEq";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AddButton from "@material-ui/icons/Add";
// Dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// Style
import navbarmenuStyle from "./navbarmenuStyle";
import classNames from "classnames";

class NavBarMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.toggle = false;
    this.state = {
      dialogOpen: false,
      dialogInfoText: undefined,
      sensorDetailsOpen: false,
      sensorsList: [{}]
    };
  }

  toggleSensorList = () => {
    this.setState(
      {
        sensorDetailsOpen: !this.state.sensorDetailsOpen
      },
      () => {
        this.props.changeDrawerOpen(true);
      }
    );
  };

  setDrawerClose = () => {
    this.setState({
      sensorDetailsOpen: false
    });
    this.props.changeDrawerOpen(false);
  };

  setDialogOpenState = state => {
    this.setState({
      dialogOpen: state,
      dialogInfoText: undefined
    });
  };

  addSensor = () => {
    let sensorName = document.getElementById("unique-sensor-name").value;
    let sensorId = document.getElementById("unique-sensor-id").value;

    if (sensorName && sensorId) {
      let db = this.props.firebase.firestore();
      let uid = this.props.firebase.auth().currentUser.uid;
      let add = { sensors: {} };
      add.sensors[sensorName] = sensorId;
      db.collection("users")
        .doc(uid)
        .set(add, { merge: true })
        .then(() => {
          this.setDialogOpenState(false);
        });
    } else {
      this.setState({
        dialogInfoText: "Name or ID were malformed!"
      });
    }
  };

  deleteSensor = (e, sensor) => {
    e.preventDefault();
    e.stopPropagation();
    let db = this.props.firebase.firestore();
    let uid = this.props.firebase.auth().currentUser.uid;
    let remove = {};
    remove[
      ["sensors." + sensor]
    ] = this.props.firebase.firestore.FieldValue.delete();
    db.collection("users")
      .doc(uid)
      .update(remove);
  };

  processSensors = () => {
    let { classes } = this.props;
    let sensorPages = [];
    for (let sensor in this.props.sensors) {
      sensorPages.push(
        <Link key={sensor + "-key"} className={classes.white} to={"/" + sensor}>
          <ListItem key={sensor} button onClick={this.setDrawerClose}>
            <ListItemIcon>
              <SensorIcon className={classes.white} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.white} type="body1">
                  {sensor}
                </Typography>
              }
            />
            <IconButton
              onClick={e => {
                this.deleteSensor(e, sensor);
              }}
              className={classes.close}
            >
              <CloseIcon />
            </IconButton>
          </ListItem>
        </Link>
      );
    }
    return sensorPages;
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Dialog
          open={this.state.dialogOpen}
          onClose={() => this.setDialogOpenState(false)}
        >
          <DialogTitle id="form-dialog-title">Add a sensor</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a sensor, give it a descriptive (unique) name, and input
              its unique ID.
            </DialogContentText>
            <DialogContentText className={classes.infoText}>
              {this.state.dialogInfoText}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="unique-sensor-name"
              label="Unique Sensor Name"
              fullWidth
            />
            <TextField
              margin="dense"
              id="unique-sensor-id"
              label="Unique Sensor ID"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setDialogOpenState(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={this.addSensor} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.props.isOpen && classes.drawerPaperClose
            )
          }}
          open={this.props.isOpen}
        >
          <div className={classes.toolbar}>
          </div>
          <List>
            <Link className={classes.white} to="/">
              <ListItem button onClick={this.setDrawerClose}>
                <ListItemIcon>
                  <Dashboard className={classes.white} />
                </ListItemIcon>
                <ListItemText
                  key="Home-button"
                  primary={
                    <Typography className={classes.white} type="body1">
                      Home
                    </Typography>
                  }
                />
              </ListItem>
            </Link>
            <ListItem
              className={classes.white}
              button
              onClick={this.toggleSensorList}
            >
              <ListItemIcon>
                <GraphicEQ className={classes.white} />
              </ListItemIcon>
              <ListItemText
                key="SensorList-button"
                primary={
                  <Typography className={classes.white} type="body1">
                    Sensor
                  </Typography>
                }
              />
              {this.state.sensorDetailsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={this.state.sensorDetailsOpen}
              timeout="auto"
              unmountOnExit
            >
              <List>
                {this.processSensors()}
                <ListItem
                  key={"AddSensor-button"}
                  button
                  onClick={() => this.setDialogOpenState(true)}
                >
                  <ListItemIcon>
                    <AddButton className={classes.white} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography className={classes.white} type="body1">
                        Add sensor...
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Collapse>
          </List>
          <Divider className={classes.sidebarDivider} />
          <List>
            <Link className={classes.white} to="/config">
              <ListItem button onClick={this.setDrawerClose}>
                <ListItemIcon>
                  <Settings className={classes.white} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography className={classes.white} type="body1">
                      Config
                    </Typography>
                  }
                />
              </ListItem>
            </Link>
          </List>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(navbarmenuStyle)(NavBarMenu);
