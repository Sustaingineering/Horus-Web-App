import React, { PureComponent, Fragment } from "react";
// Material UI Components
import {
  Grid,
  withStyles,
  Tabs,
  Tab,
  Typography,
  MuiThemeProvider,
  Paper
} from "@material-ui/core";
// Components
import MonitoringData from "./MonitoringData";
import Chart from "./Chart";
// import HistoryChart from "./historyChart";
//Style
import dashboardStyle from "./dashboardStyle";
import { mainTheme } from "../../assets/jss/mainStyle";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import UploadData from "./UploadData";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      data: null,
      error: null
    };
  }

  handleChange = (event, value) => {
    this.setState({ value: value });
  };

  handleChangeRange = value => {
    this.setState({ selected: value });
  };

  handleData = data => {
    this.setState({ data });
  };

  handleError = error => {
    this.setState({ error });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const data = (this.props.data || []).slice();
    const selected = this.state;
    return (
      <Fragment>
        <MuiThemeProvider theme={mainTheme}>
          <div className={classes.root}>
            <Typography variant="h4" color="primary" gutterBottom>
              {this.props.sensorName + " Dashboard"}
            </Typography>
            <MonitoringData data={data} />
            <br />
            <Tabs
              value={value}
              className={classes.tabs}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              // scrollable
              // scrollButtons="auto"
            >
              <Tab className={classes.tab} label="Data" />
              <Tab className={classes.tab} label="History" />
              <Tab className={classes.tab} label="Summary" />
              <Tab className={classes.tab} label="Upload CSV" />
            </Tabs>

            {value === 0 && (
              <Fragment>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Chart
                      data={data}
                      color="#fd5d93"
                      title="Voltage"
                      unit="Volts"
                      dataKey1="voltage"
                      domain={["dataMin", "dataMax"]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Chart
                      data={data}
                      color="#efefef"
                      title="Current"
                      unit="Amps"
                      dataKey1="current"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Chart
                      data={data}
                      color="#1d8cf8"
                      title="Power"
                      unit="Watts"
                      dataKey1="power"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Chart
                      data={data}
                      color="#00f2c3"
                      title="Temperature"
                      unit="Celcius"
                      dataKey1="op-temp"
                      dataKey2="surface-temperature"
                    />
                  </Grid>
                </Grid>
              </Fragment>
            )}
            {value === 1 && (
              <Fragment>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Paper className={classes.paper}>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Data Range
                      </Typography>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="range">Range</InputLabel>
                        <Select
                          name="range-select"
                          value={selected}
                          fullWidth
                          onChange={event =>
                            this.handleChangeRange(event.target.value)
                          }
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
                  <Grid item xs={12} sm={12} md={6}></Grid>
                </Grid>
              </Fragment>
            )}
            {value === 2 && (
              <Fragment>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="subtitle1" color="primary" paragraph>
                      Sustaingineering is a student engineering design team that
                      designs, develops and deploys sustainable technology
                      solutions for renewable energy applications in remote and
                      developing communities. Our goal is to create power
                      solutions to address the global challenge of climate
                      change and to improve the quality of life of the people
                      living in these communities.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="subtitle1" color="primary" paragraph>
                      Sustaingineering is a student engineering design team that
                      designs, develops and deploys sustainable technology
                      solutions for renewable energy applications in remote and
                      developing communities. Our goal is to create power
                      solutions to address the global challenge of climate
                      change and to improve the quality of life of the people
                      living in these communities.
                    </Typography>
                  </Grid>
                </Grid>
              </Fragment>
            )}
            {value === 3 && (
              <Fragment>
                <Grid
                  container
                  spacing={24}
                  direction="column"
                  alignItems="center"
                >
                  <Grid item>
                    <Paper className={classes.paper}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Upload your csv file
                      </Typography>
                      <UploadData
                        onDataUploaded={this.handleData}
                        onError={this.handleError}
                        render={onChange => (
                          <input type="file" onChange={onChange} />
                        )}
                        firebase={this.props.firebase}
                        sensorId={this.props.sensorId}
                      />

                      {this.state.data && (
                        <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
                      )}

                      {this.state.error && (
                        <pre>{JSON.stringify(this.state.error, null, 2)}</pre>
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </Fragment>
            )}
          </div>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);
