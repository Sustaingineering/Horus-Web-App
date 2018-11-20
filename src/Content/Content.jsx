import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Router
import { Route } from "react-router-dom";
// Style
import contentStyles from "./contentStyle";
import { withStyles } from "@material-ui/core/styles";
// Components
import Dashboard from "./Dashboard/Dashboard";
import Sensor from "./Dashboard/Sensor";
import Profile from "./Profile/Profile";
import NavBar from "../Layout/Navbar/Navbar";
import Footer from "../Layout/Footer/Footer";
// Electron
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sensorsList: [{}]
    };
  }

  componentWillMount = () => {
    ipcRenderer.on("get-sensor-list", (e, msg) => {
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

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.root}>
          <NavBar />
          <div className={classes.container}>
            <Route path="/" exact render={() => <h1>Home</h1>} />
            <Route path="/dashboard" exact render={() => <h1>Home</h1>} />
            {this.state.sensorsList.map(sensor => (
              <Route
                path={"/" + sensor.name}
                key={sensor.name}
                render={() => <Sensor sensorName={sensor.name} />}
              />
            ))}
            <Route path="/config" exact render={() => <h1>config</h1>} />
            <Route path="/profile" exact component={Profile} />
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(contentStyles)(Content);
