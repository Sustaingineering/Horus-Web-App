import React, { PureComponent, Fragment } from "react";
// Components
import MonitoringData from "./MonitoringData";
import ChartContainer from "./ChartContainer";
import UploadData from "./UploadData";
import ShowHistoryGraph from "./ShowHistoryGraph";
import { Container } from "../../Components/Basics";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      data: null,
      error: null,
      historyData: null,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value: value });
  };

  render() {
    const { value } = this.state;
    const data = (this.props.data || []).slice();

    return (
      <Container>
        <div className="card max-w-6xl">
          <p className="card-title">{this.props.sensorName + " Dashboard"}</p>
          {/* <MonitoringData data={data} /> */}
          <br />
          <div className="tabs">
            <a className="tab tab-bordered">Data</a>
            <a className="tab tab-bordered">History</a>
            <a className="tab tab-bordered">Upload CSV</a>
          </div>
          {/* <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Data" />
            <Tab label="History" />
            <Tab label="Upload CSV" />
          </Tabs> */}
          <br />
          <br />
          {
            [
              <ChartContainer data={this.props.data} />,
              <ShowHistoryGraph
                selected={this.props.selected}
                start={this.props.start}
                end={this.props.end}
                changeRange={this.props.changeRange}
                changeCalStart={this.props.changeCalStart}
                changeCalEnd={this.props.changeCalEnd}
                historyData={this.props.historyData}
              />,
              <UploadData
                firebase={this.props.firebase}
                sensorId={this.props.sensorId}
              />,
            ][value]
          }
        </div>
      </Container>
    );
  }
}

export default Dashboard;
