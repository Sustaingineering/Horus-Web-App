import React, { Component, Fragment } from "react";
// Router
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
// Components
// // Components
import LandingPage from "./Pages/Landing/Landing.jsx";
import Content from "./Content/Content";
// SignIn Component
import SignInPage from "./Pages/Auth/SignIn";
// Date Picker
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";

import NavBar from "./Layout/Navbar/Navbar";


import { FirebaseContext } from "./Firebase/firebase.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: undefined
    };
    this.props.firebase.auth().onAuthStateChanged(authUser => {
      console.log(authUser);
      authUser ? this.setState({authUser : authUser}) : this.setState({authUser : undefined});
    });
  }

  // heh = () => {
  //   let db = this.props.firebase.firestore();
  //   db.collection("sensors").add({
  //     first: "test"
  //   });
  // }

  render() {
    // this.heh();
    const renderPlatform = this.state.authUser ? (
      <Fragment>
        <Switch>
          <Redirect from="/login" to="/dashboard" />
          <Redirect from="/signup" to="/dashboard" />
        </Switch>
        <NavBar />
        <FirebaseContext.Consumer>
          {firebase => <Content firebase={firebase} />}
        </FirebaseContext.Consumer>
      </Fragment>
    ) : (
      <Fragment>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" render={(props) =>
            <FirebaseContext.Consumer>
              {firebase => <SignInPage {...props} firebase={firebase} />}
            </FirebaseContext.Consumer>
          } />
          <Redirect to="/" />
        </Switch>
      </Fragment>
    );
    return (
      <Fragment>
        <BrowserRouter>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {renderPlatform}
          </MuiPickersUtilsProvider>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
