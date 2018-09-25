import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Router
import { Route } from "react-router-dom";
// Style
import contentStyles from "./contentStyle";
import { withStyles } from "@material-ui/core/styles";
// Components
import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Profile/Profile";
import NavBar from "../Layout/Navbar/Navbar";
import Footer from "../Layout/Footer/Footer";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // authUser: null,
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.root}>
          <NavBar />
          <div className={classes.container}>
            <Route path="/" exact component={Dashboard} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/config" exact render={() => <h1>config</h1>} />
            <Route path="/profile" exact component={Profile} />
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(contentStyles)(Content);
