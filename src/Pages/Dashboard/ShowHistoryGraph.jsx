import React, {PureComponent} from "react";
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
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {historyStyle, materialTheme} from "./dashboardStyle";
import ChartContainer from "./ChartContainer";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

class ShowHistoryGraph extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  handleStartDateTimeChange = (startDate) => {
    this.setState({ startDate })
  };

  handleEndDateTimeChange = (endDate) => {
    this.setState({ endDate })
  };


  render() {
    const {classes} = this.props;

    this.selected = this.props.selected;
    this.changeRange = this.props.changeRange;
    this.historyData = this.props.historyData;

    return (
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Grid xs={12} spacing={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6" color="primary" gutterBottom>
                Date Range
              </Typography>
              <FormControl style={{minWidth: 120}} className={classes.formControl}>
                <InputLabel shrink htmlFor="range" className={classes.inputLabel}>Range</InputLabel>
                <Select
                  name="range-select"
                  className={classes.select}
                  inputProps={{
                    classes: {
                      icon: classes.icon,
                    },
                  }}
                  autoWidth={[true]}
                  value={this.selected}
                  onChange={event => this.changeRange(event.target.value)}
                >
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
          <Grid xs={12} spacing={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6" color="primary" gutterBottom>
                Pick from Calendar
              </Typography>
              <ThemeProvider theme={materialTheme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    InputLabelProps={{ className: classes.select }}
                    InputProps={{ className: classes.select }}
                    rightArrowIconProps={{ className: classes.icon }}
                    label="Start"
                    inputVariant="standard"
                    value={this.state.startDate || Date.now()}
                    onChange={this.handleStartDateTimeChange}
                    maxDate={this.state.endDate || Date.now()}
                  />
                  <DateTimePicker
                    InputLabelProps={{ className: classes.select }}
                    InputProps={{ className: classes.select }}
                    rightArrowIconProps={{ className: classes.icon }}
                    label="End"
                    inputVariant="standard"
                    value={this.state.endDate || Date.now()}
                    onChange={this.handleEndDateTimeChange}
                    maxDate={Date.now()}
                    minDate={this.state.startDate}
                  />
                </MuiPickersUtilsProvider>
              </ThemeProvider>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={24} sm={24} md={12}>
          <ChartContainer
            data={this.historyData}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(historyStyle)(ShowHistoryGraph);
