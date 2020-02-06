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
  ListItemSecondaryAction,
  Collapse,
  Typography,
  Button,
  TextField,
  Switch,
  Fade
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
import EditIcon from "@material-ui/icons/Edit";
// Style
import navbarmenuStyle from "./navbarmenuStyle";
import classNames from "classnames";

class NavBarMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      dialogInfoText: undefined,
      editMode: false
    };
  }

  setDialogOpenState = state => {
    this.setState({
      dialogOpen: state,
      dialogInfoText: undefined
    });
  };

  setEditModeState = state => {
    this.setState({
      editMode: state
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
          <ListItem
            key={sensor}
            button
            onClick={() => {
              this.props.setDrawerOpenState(false);
              this.props.setSensorOpenState(false);
            }}
          >
            <ListItemIcon>
              <SensorIcon className={classes.white} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography noWrap className={classes.white} type="body1">
                  {sensor}
                </Typography>
              }
            />
            <Fade in={this.state.editMode}>
              <ListItemSecondaryAction>
                <IconButton
                  onClick={e => {
                    this.deleteSensor(e, sensor);
                  }}
                  className={classes.white}
                >
                  <CloseIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </Fade>
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
          PaperProps={{ className: classes.paper }}
        >
          <DialogTitle id="form-dialog-title">Add a sensor</DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.textField}>
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
              className={classes.textField}
              InputLabelProps={{
                className: classes.textField
              }}
              InputProps={{
                className: classes.textField
              }}
              fullWidth
            />
            <TextField
              margin="dense"
              id="unique-sensor-id"
              label="Unique Sensor ID"
              className={classes.textField}
              InputLabelProps={{
                className: classes.textField
              }}
              InputProps={{
                className: classes.textField
              }}
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
              !this.props.isDrawerOpen && classes.drawerPaperClose
            )
          }}
          open={this.props.isDrawerOpen}
        >
          <div className={classes.toolbar}></div>
          <List>
            <Link className={classes.white} to="/">
              <ListItem
                button
                onClick={() => {
                  this.props.setDrawerOpenState(false);
                  this.props.setSensorOpenState(false);
                }}
              >
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
              onClick={() => {
                this.props.setDrawerOpenState(true);
                this.props.setSensorOpenState(!this.props.isSensorsOpen);
              }}
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
              {this.props.isSensorsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.props.isSensorsOpen} timeout="auto">
              <List>
                <ListItem key={"EditSensor-button"}>
                  <ListItemIcon>
                    <EditIcon className={classes.white} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography className={classes.white} type="body1">
                        Edit mode
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={this.state.editMode}
                      onChange={e => this.setEditModeState(e.target.checked)}
                      size="small"
                    ></Switch>
                  </ListItemSecondaryAction>
                </ListItem>
                {this.processSensors()}
                <Collapse in={this.state.editMode} timeout="auto">
                  <ListItem
                    key={"AddSensor-button"}
                    button
                    onClick={() => this.setDialogOpenState(true)}
                    className={classes.white}
                  >
                    <ListItemIcon>
                      <AddButton className={classes.white} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography className={classes.white} type="body1">
                          Add...
                        </Typography>
                      }
                    />
                  </ListItem>
                </Collapse>
              </List>
            </Collapse>
          </List>
          <Divider className={classes.sidebarDivider} />
          <List>
            <Link className={classes.white} to="/config">
              <ListItem
                button
                onClick={() => {
                  this.props.setSensorOpenState(false);
                  this.props.setDrawerOpenState(false);
                }}
              >
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
