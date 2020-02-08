import React, {PureComponent} from "react";
// Material UI Components
import {withStyles} from "@material-ui/core";
//Style
import {dashboardStyle} from "./dashboardStyle";
import Dashboard from "./Dashboard";

class Sensor extends PureComponent {
    constructor(props) {
        super(props);
        this.db = null;
        this.state = {
            data: [],
            histdata: []
        };
        let date = new Date();
        let now = date.getTime();
        let d = now - (60 * 24 * 60 * 60 * 1000);
        this.timestamp = Math.floor(d / 1000);
        this.nowstamp = Math.floor(now / 1000);
        this.setState({range: this.timestamp});
        this.setState({selected: 3});
        //this.getDatabase();
    }

    // We wait until the component has been mounted (which means
    // other components are unmounted) before polling, so we don't
    // have multiple registers to a particular database
    componentDidMount = () => {
        this.getDatabase(this.props.sensorId);
    };

    changeRange = (value) => {
        this.setState({selected: value});
        console.log(value);
        let offset;
        if (value === 1) {
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
        let d = now - offset;
        this.timestamp = Math.floor(d / 1000);
        console.log(this.timestamp);
        this.nowstamp = Math.floor(now / 1000);
        console.log(this.nowstamp);
        this.setState({range: this.timestamp});
        console.log(this.props.sensorId);
        this.getDatabase(this.props.sensorId);
    };

    getDatabase = sensorId => {

        console.log(this.timestamp);
        console.log(this.nowstamp);
        console.log(sensorId);

        this.db = this.props.firebase.database().ref(sensorId);
        let temp = [];
        let temphist = [];
        // Use .once() to make it call less data
        // this.db.limitToLast(30).once("value", e => {
        //   for (let i in e.val()) {
        //     temp.push(e.val()[i]);
        //   }
        // })

        this.db.orderByKey()
            .startAt(this.timestamp.toString())
            .endAt(this.nowstamp.toString())
            .once("value", e => {
                console.log(e.val());
                for (let i in e.val()) {
                    temphist.push(e.val()[i]);
                    temp.push(e.val()[i]); //todo:to be removed so that main data page shows only live data
                }
                this.setState({
                    histdata: temphist
                });
            });

        this.db.limitToLast(1).on("child_added", e => {
            temp = temp.slice();
            if (temp.length >= 30) temp.shift();
            temp.push(e.val());
            console.log("truncating stuff");
            this.setState({
                data: temp
            });
        });
    };

    componentWillUnmount = () => {
        this.db.off();
    };

    render() {
        const {classes} = this.props;
        console.log("sldjhfkjlahfkb hkjlafh kjlhkfdvjhfkjsdhf jkdhkljfshjt");
        console.log(this.state.data);
        return (
            <div className={classes.root}>
                <Dashboard
                    data={this.state.data}
                    histdata={this.state.histdata}
                    sensorName={this.props.sensorName}
                    sensorId={this.props.sensorId}
                    changeRange={this.changeRange}
                    selected={this.state.selected}
                    firebase={this.props.firebase}
                />
            </div>
        );
    }
}

export default withStyles(dashboardStyle)(Sensor);
