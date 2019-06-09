import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Router
import { Route } from "react-router-dom";
// Style
import contentStyles from "./contentStyle";
import { withStyles } from "@material-ui/core/styles";
// Components
import Sensor from "./Dashboard/Sensor";
import Config from "./Config/Config";
import Home from "../Content/Home/home";
// Electron 
// const electron = window.require("electron");
// const ipcRenderer = electron.ipcRenderer;
// Firebase
import { FirebaseContext } from "../Firebase/firebase.js";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sensorsList: [{}]
    };
  }

  componentWillMount = () => {
    var temp = [
      { name: "S1", type: "default" },
      { name: "S2", type: "default" },
      { name: "S3", type: "default" },
      { name: "S4", type: "default" },
      { name: "S5", type: "default" },
      { name: "se", type: "default" },
      { name: "sdf", type: "default"}
    ];
    this.setState({ sensorsList: temp });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.root}>
          <div className={classes.container}>
            <Route path="/" exact component={Home} />
            <Route path="/dashboard" exact component={Home} />
            {this.state.sensorsList.map(sensor => (
              <Route
                path={"/" + sensor.name}
                key={sensor.name}
                render={() => <Sensor sensorName={sensor.name} />}
              />
            ))}
            <Route path="/config" exact render={(props) =>
              <FirebaseContext.Consumer>
                {firebase => <Config {...props} firebase={firebase} />}
              </FirebaseContext.Consumer>
            } />
          </div>
        </div>
      </Fragment>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(contentStyles)(Content);
// export default Content;