import React, { PureComponent, Fragment } from "react";
// Material UI Components
import {
  Grid,
  withStyles,
  Tabs,
  Tab,
  Typography,
  MuiThemeProvider
} from "@material-ui/core";
// Components
import MonitoringData from "./MonitoringData";
import Chart from "./Chart";
// import HistoryChart from "./historyChart";
//Style
import dashboardStyle from "./dashboardStyle";
import { mainTheme } from "../../assets/jss/mainStyle";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    }
  }

  handleChange = (event, value) => {
    this.setState({value: value})
  };

  handleChangeRange = (value) => {
      this.setState({selected: value});
      console.log(value);
      let offset;
      if (value === 1){
          offset = 60 * 60 * 1000;
      } else if (value === 2) {
          offset = 2 * 60 * 60 * 1000;
      } else if (value === 3) {
          offset = 6 * 60 * 60 * 1000;
      } else if (value === 4) {
          offset = 24 * 60 * 60 * 1000;
      } else if (value === 5) {
          offset = 7 * 24 * 60 * 60 * 1000;
      } else if (value === 6) {
          offset = 30 * 24 * 60 * 60 * 1000;
      } else if (value === 7) {
          offset = 183 * 24 * 60 * 60 * 1000;
      } else if (value === 8) {
          offset = 365 * 24 * 60 * 60 * 1000;
      } else {
          offset = 6 * 60 * 60 * 1000;
      }
      let date = new Date();
      let now = date.getTime();
      console.log(now);
      let d = now - offset;
      console.log(d);
      let timestamp = Math.floor(d/1000);
      console.log(timestamp);
      this.setState({range: timestamp});
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const data = (this.props.data || []).slice();
    const selected = this.state.selected;

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
            >
              <Tab className={classes.tab} label="Data" />
              <Tab className={classes.tab} label="History" />
              <Tab className={classes.tab} label="Summary" />
            </Tabs>

            {
              value === 0 &&
              <Fragment>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Chart
                        data={data}
                        color="#fd5d93"
                        title="Voltage"
                        unit="Volts"
                        dataKey1="voltage"
                        domain={['dataMin','dataMax']}
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
            }
            {
              value === 1 &&
              <Fragment>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Paper className={classes.paper}>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Data Range
                      </Typography>
                        <FormControl style={{minWidth: 120}} className={classes.formControl}>
                            <InputLabel shrink htmlFor="range">Range</InputLabel>
                            <Select
                                name="range-select"
                                autoWidth={[true]}
                                value={selected}
                                onChange={event => this.handleChangeRange(event.target.value)}
                                SelectDisplayProps={{
                                    label: "Range",
                                    InputLabelProps: this.state.shrink?{shrink:true}:{},
                                    style: {color: 'white'}
                                }}
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
                  <Grid item xs={12} sm={12} md={6}>

                  </Grid>
                </Grid>
              </Fragment>
            }
            {
              value === 2 &&
              <Fragment>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Typography variant='subtitle1' color='primary' paragraph>
                      Sustaingineering is a student engineering design team that
                      designs, develops and deploys sustainable technology solutions
                      for renewable energy applications in remote and developing
                      communities. Our goal is to create power solutions to address
                      the global challenge of climate change and to improve the
                      quality of life of the people living in these communities.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Typography variant='subtitle1' color='primary' paragraph>
                      Sustaingineering is a student engineering design team that
                      designs, develops and deploys sustainable technology solutions
                      for renewable energy applications in remote and developing
                      communities. Our goal is to create power solutions to address
                      the global challenge of climate change and to improve the
                      quality of life of the people living in these communities.
                    </Typography>
                  </Grid>
                </Grid>
              </Fragment>
            }
          </div>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);
