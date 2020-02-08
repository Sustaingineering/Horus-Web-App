import React, { PureComponent, Fragment } from "react";
// Material UI Components
import { withStyles, Tabs, Tab, Typography, Paper } from "@material-ui/core";
// Components
import MonitoringData from "./MonitoringData";
import ChartContainer from "./ChartContainer";
// import HistoryChart from "./historyChart";
//Style
import { dashboardStyle } from "./dashboardStyle";
import UploadData from "./UploadData";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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

  handleChangeRange = (value) => {
      this.setState({selected: value});
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const data = (this.props.data || []).slice();
    const selected = this.state.selected;

    return (
      <Fragment>
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
          <Tab className={classes.tab} label="Upload CSV" />
        </Tabs>
        <br />
        <br />
        {
          [
            <ChartContainer data={this.props.data} />,
            <Paper>
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
            </Paper>,
            <UploadData
              firebase={this.props.firebase}
              sensorId={this.props.sensorId}
            />
          ][value]
        }
          </Fragment>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);
