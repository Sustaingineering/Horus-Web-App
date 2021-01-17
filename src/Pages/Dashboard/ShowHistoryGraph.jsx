import React, { PureComponent } from "react";
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  withStyles,
} from "@material-ui/core"
import {
  DateTimePicker,
} from '@material-ui/lab';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { historyStyle } from "./dashboardStyle";
import { mainTheme } from "../../assets/jss/mainStyle";
import ChartContainer from "./ChartContainer";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

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
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Grid>
            <Paper>
              <Typography variant="h6" color="primary" gutterBottom>
                Date Range
              </Typography>
              <FormControl style={{ minWidth: 120 }}>
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
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid>
            <Paper>
              <Typography variant="h6" color="primary" gutterBottom>
                Pick from Calendar
              </Typography>
              <ThemeProvider theme={mainTheme}>
                <LocalizationProvider dateAdapter={DateFnsUtils}>
                  <DateTimePicker
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
                  />
                </LocalizationProvider>
              </ThemeProvider>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <ChartContainer
            data={this.historyData}
          />
        </Grid>
      </Grid>
    );
  }
}

export default ShowHistoryGraph;
