import React, { PureComponent } from "react";
// Material UI Components
import { withStyles } from "@material-ui/core";
//Style
import { dashboardStyle } from "./dashboardStyle";
import Dashboard from "./Dashboard";

class Sensor extends PureComponent {
  constructor(props) {
    super(props);
    this.db = null;
    this.state = {
      data: []
    };
  }

  // We wait until the component has been mounted (which means
  // other components are unmounted) before polling, so we don't
  // have multiple registers to a particular database
  componentDidMount = () => {
    this.getDatabase(this.props.sensorId);
  };

  getDatabase = sensorId => {
    this.db = this.props.firebase.database().ref(sensorId);
    let temp = [];
    // Use .once() to make it call less data
    this.db.limitToLast(30).once("value", e => {
      for (let i in e.val()) {
        temp.push(e.val()[i]);
      }
    });
    this.db.limitToLast(1).on("child_added", e => {
      temp = temp.slice();
      if (temp.length >= 30) temp.shift();
      temp.push(e.val());
      this.setState({
        data: temp
      });
    });
  };

  componentWillUnmount = () => {
    this.db.off();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Dashboard
          data={this.state.data}
          sensorName={this.props.sensorName}
          sensorId={this.props.sensorId}
          firebase={this.props.firebase}
        />
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Sensor);
