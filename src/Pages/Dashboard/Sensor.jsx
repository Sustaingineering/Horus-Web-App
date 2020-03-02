import React, { PureComponent } from "react";
// Material UI Components
import { withStyles } from "@material-ui/core";
//Style
import { dashboardStyle } from "./dashboardStyle";
import Dashboard from "./Dashboard";

const timeOffsetMap = {
  0: 0,
  1: 60 * 60 * 1000,
  2: 2 * 60 * 60 * 1000,
  3: 6 * 60 * 60 * 1000,
  4: 24 * 60 * 60 * 1000,
  5: 7 * 24 * 60 * 60 * 1000,
  6: 30 * 24 * 60 * 60 * 1000,
  7: 183 * 24 * 60 * 60 * 1000,
  8: 365 * 24 * 60 * 60 * 1000,
};

class Sensor extends PureComponent {
  constructor(props) {
    super(props);
    this.db = null;
    this.state = {
      data: [],
      historyData: []
    };
    let date = new Date();
    let now = date.getTime();
    let d = now - (30 * 24 * 60 * 60 * 1000);
    this.timestamp = Math.floor(d / 1000);
    this.nowstamp = Math.floor(now / 1000);
    this.liveDataStamp = Math.floor((now - (20 * 24 * 60 * 60 * 1000)) / 1000);
  }

  // We wait until the component has been mounted (which means
  // other components are unmounted) before polling, so we don't
  // have multiple registers to a particular database
  componentDidMount = () => {
    this.initDatabase(this.props.sensorId);
    this.initLiveData()
  };

  changeRange = (value) => {
    this.setState({ selected: value });
    let offset;
    offset = timeOffsetMap[value];
    let date = new Date();
    let now = date.getTime();
    let d = now - offset;
    this.timestamp = Math.floor(d / 1000);
    this.nowstamp = Math.floor(now / 1000);
    this.setState({ range: this.timestamp });
    this.getHistoricalData();
  };

  handleStartDateTimeChange = (startDate) => {
    this.setState({ start: startDate });
    let startTime = startDate.getTime();
    this.timestamp = Math.floor(startTime / 1000);
    this.setState({ range: this.timestamp });
    this.getHistoricalData();
  };

  handleEndDateTimeChange = (endDate) => {
    this.setState({ end: endDate });
    let endTime = endDate.getTime();
    this.nowstamp = Math.floor(endTime / 1000);
    this.setState({ range: this.nowstamp });
    this.getHistoricalData();
  };


  initDatabase = sensorId => {
    this.db = this.props.firebase.database().ref(sensorId);
  };


  initLiveData = () => {
    let temp = [];
    this.db.orderByKey()
      .startAt(this.liveDataStamp.toString())
      .endAt(this.nowstamp.toString())
      .once("value", e => {
        for (let i in e.val()) {
          temp.push(e.val()[i]);
          // temp.push(e.val()[i]); //removed so that main data page shows only live data
        }
        temp = temp.slice();
        if (temp.length >= 30) temp.shift();
        this.setState({
          data: temp
        });
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

  getHistoricalData = () => {
    let tempHistory = [];

    this.db.orderByKey()
      .startAt(this.timestamp.toString())
      .endAt(this.nowstamp.toString())
      .once("value", e => {
        for (let i in e.val()) {
          tempHistory.push(e.val()[i]);
        }
        this.setState({
          historyData: tempHistory
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
          historyData={this.state.historyData}
          sensorName={this.props.sensorName}
          sensorId={this.props.sensorId}
          changeRange={this.changeRange}
          changeCalStart={this.handleStartDateTimeChange}
          changeCalEnd={this.handleEndDateTimeChange}
          selected={this.state.selected}
          start={this.state.start}
          end={this.state.end}
          firebase={this.props.firebase}
        />
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Sensor);
