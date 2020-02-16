import React, {PureComponent, Fragment} from "react";
// Material UI Components
import {withStyles, Tabs, Tab, Typography} from "@material-ui/core";
// Components
import MonitoringData from "./MonitoringData";
import ChartContainer from "./ChartContainer";
//Style
import {dashboardStyle} from "./dashboardStyle";
import UploadData from "./UploadData";
import Grid from "@material-ui/core/Grid";
import ShowHistoryGraph from "./ShowHistoryGraph";

class Dashboard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            data: null,
            error: null,
            historydata: null
        };
    }

    handleChange = (event, value) => {
        this.setState({value: value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;
        const data = (this.props.data || []).slice();

        return (
            <Fragment>
                <Typography variant="h4" color="primary" gutterBottom>
                    {this.props.sensorName + " Dashboard"}
                </Typography>
                <MonitoringData data={data}/>
                <br/>
                <Tabs
                    value={value}
                    className={classes.tabs}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab className={classes.tab} label="Data"/>
                    <Tab className={classes.tab} label="History"/>
                    <Tab className={classes.tab} label="Upload CSV"/>
                </Tabs>
                <br/>
                <br/>
                {
                    [
                        <ChartContainer data={this.props.data}/>,
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <ShowHistoryGraph
                                    state={this.state}
                                    selected={this.props.selected}
                                    changeRange={this.props.changeRange}
                                />
                            </Grid>
                            <Grid item xs={24} sm={24} md={12}>
                                <ChartContainer
                                    data={this.props.historydata}
                                />
                            </Grid>
                        </Grid>
                        ,<UploadData
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
