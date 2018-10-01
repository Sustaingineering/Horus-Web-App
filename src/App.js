import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Router
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
// Components
// // Components
import LandingPage from "./Pages/Landing/Landing.jsx";
import Content from "./Content/Content";
// SignIn Component
import SignInPage from "./Pages/Auth/SignIn";
import SignUpPage from "./Pages/Auth/SignUp";
// Date Picker
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null
    };
  }

  componentDidMount = () => {
    
    this.setState({ authUser: true });
  };

  render() {
    const renderPlatform = this.state.authUser ? (
      <Fragment>
        <Switch>
          <Redirect from="/login" to="/dashboard" />
          <Redirect from="/signup" to="/dashboard" />
        </Switch>
        <Content />
      </Fragment>
    ) : (
      <Fragment>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" exact component={SignInPage} />
          <Route path="/signup" exact component={SignUpPage} />
          <Redirect from="/dashboard" to="/login" />
          <Redirect from="/config" to="/login" />
          <Redirect from="/profile" to="/login" />
        </Switch>
      </Fragment>
    );

    return (
      <BrowserRouter>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Switch>
            {/* <Route path='/' exact component={LandingPage}/> */}
            {/* <Route render={() => <h1>404 not found</h1>}/> */}
          </Switch>
          {renderPlatform}
        </MuiPickersUtilsProvider>
      </BrowserRouter>
    );
  }
}

export default App;
