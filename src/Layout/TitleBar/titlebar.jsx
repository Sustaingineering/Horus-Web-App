import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import titlebarStyle from "./titlebarStyle.jsx";
// Icons
import MenuIcon from "@material-ui/icons/Menu";
// Electron
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
const remote = electron.remote;

class TitleBar extends Component {
  componentDidMount = async () => {
    ipcRenderer.on("log-in-app", (e, msg) => {
      if (msg.error) {
        alert(msg.error);
        return console.log(msg.error);
      }
      this.setState({
        authUser: true
      });
    });

    ipcRenderer.on("sign-up", (e, msg) => {
      if (msg.error) {
        alert(msg.error);
        return console.log(msg.error);
      }
      this.setState({
        loggedIn: true
      });
    });
  };

  displayMenu = event => {
    ipcRenderer.send("display-app-menu", {
      x: event.x,
      y: event.y
    });
  };

  minimizeMenu = () => {
    remote.getCurrentWindow().minimize();
  };

  min_maxMenu = () => {
    const currentWindow = remote.getCurrentWindow();
    if (currentWindow.isMaximized()) {
      currentWindow.unmaximize();
    } else {
      currentWindow.maximize();
    }
  };

  closeApp = () => {
    remote.app.quit();
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.title_bar}>
          <div className={classes.menu_button_container}>
            <button
              className={classes.menu_button_cont}
              id="menu-button"
              onClick={this.displayMenu.bind(this)}
            >
              <MenuIcon className={classes.menu_button} />
            </button>
          </div>
          <div className={classes.app_name_container}>
            <p>Horus</p>
          </div>
          <div className={classes.window_controls_container}>
            <button
              id="minimize-button"
              className={classes.minimize_button}
              onClick={this.minimizeMenu.bind(this)}
            />
            <button
              id="min-max-button"
              className={classes.min_max_button}
              onClick={this.min_maxMenu.bind(this)}
            />
            <button
              id="close-button"
              className={classes.close_button}
              onClick={this.closeApp.bind(this)}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(titlebarStyle)(TitleBar);
