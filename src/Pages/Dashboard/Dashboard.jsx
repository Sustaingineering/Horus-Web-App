import React, { PureComponent, Fragment } from "react";
// Components
import MonitoringData from "./MonitoringData";
import ChartContainer from "./ChartContainer";
import UploadData from "./UploadData";
import ShowHistoryGraph from "./ShowHistoryGraph";
import { Container, Section } from "../../Components/Basics";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";

const Tabs = ["Realtime Data", "Historical Data", "Upload Data", "Settings"];

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      data: null,
      error: null,
      historyData: null,
      currentTab: Tabs[0],
    };
  }

  handleChange = (event, value) => {
    this.setState({ value: value });
  };

  setTab = (tab) => {
    this.setState({
      currentTab: tab,
    });
  };

  render() {
    const data = (this.props.data || []).slice();

    return (
      <Container>
        <Section text={`${this.props.sensorName} Dashboard`} subText={`ID: ${this.props.sensorId}`} />
        <div className="justify-center flex flex-wrap content-center">
          <RadioGroup
            as="div"
            className="tabs tabs-boxed"
            value={this.state.currentTab}
            onChange={this.setTab}
          >
            {Tabs.map((tab) => (
              <RadioGroup.Option value={tab}>
                {({ checked }) => (
                  <a className={clsx("tab", checked ? "tab-active" : "")}>
                    {tab}
                  </a>
                )}
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>

        {
          {
            [Tabs[0]]: (
              <Fragment>
                <MonitoringData data={data} />
                <ChartContainer data={this.props.data} />
              </Fragment>
            ),
            [Tabs[1]]: (
              <ShowHistoryGraph
                selected={this.props.selected}
                start={this.props.start}
                end={this.props.end}
                changeRange={this.props.changeRange}
                changeCalStart={this.props.changeCalStart}
                changeCalEnd={this.props.changeCalEnd}
                historyData={this.props.historyData}
              />
            ),
            [Tabs[2]]: (
              <UploadData
                firebase={this.props.firebase}
                sensorId={this.props.sensorId}
              />
            ),
          }[this.state.currentTab]
        }
      </Container>
    );
  }
}

export default Dashboard;
