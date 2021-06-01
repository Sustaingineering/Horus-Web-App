import React, { PureComponent } from "react";
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import ChartContainer from "./ChartContainer";

class ShowHistoryGraph extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  render() {
    const now = Date.now();

    this.selected = this.props.selected;
    this.start = this.props.start;
    this.end = this.props.end;
    this.changeRange = this.props.changeRange;
    this.historyData = this.props.historyData;
    this.changeCalStart = this.props.changeCalStart;
    this.changeCalEnd = this.props.changeCalEnd;

    return (
      <div>
        <div>
          <div>
            <div>
              <p variant="h6" color="primary" gutterBottom>
                Date Range
              </p>
              {/* <form style={{ minWidth: 120 }}>
                <InputLabel shrink htmlFor="range">Range</InputLabel>
                <Select
                  name="range-select"
                  autoWidth={true}
                  value={this.selected || 0}
                  onChange={event => this.changeRange(event.target.value)}
                >
                  <MenuItem value={0}>Select...</MenuItem>
                  <MenuItem value={1}>1 hour</MenuItem>
                  <MenuItem value={2}>2 hours</MenuItem>
                  <MenuItem value={3}>6 hours</MenuItem>
                  <MenuItem value={4}>24 hours</MenuItem>
                  <MenuItem value={5}>1 week</MenuItem>
                  <MenuItem value={6}>1 month</MenuItem>
                  <MenuItem value={7}>6 months</MenuItem>
                  <MenuItem value={8}>1 year</MenuItem>
                </Select>
              </form> */}
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <p variant="h6" color="primary" gutterBottom>
                Pick from Calendar
              </p>
                {/* <LocalizationProvider dateAdapter={DateFnsUtils}> */}
                  {/* <DateTimePicker
                    label="Start"
                    inputVariant="standard"
                    format="yyyy/MM/dd HH:mm"
                    value={this.start || now}
                    onChange={this.changeCalStart}
                    maxDate={this.end || now}
                  />
                  <DateTimePicker
                    label="End"
                    inputVariant="standard"
                    format="yyyy/MM/dd HH:mm"
                    value={this.end || now}
                    onChange={this.changeCalEnd}
                    maxDate={now}
                    minDate={this.start}
                  /> */}
                {/* </LocalizationProvider> */}
            </div>
          </div>
        </div>
        <div item xs={12} sm={12} md={12}>
          <ChartContainer
            data={this.historyData}
          />
        </div>
      </div>
    );
  }
}

export default ShowHistoryGraph;
