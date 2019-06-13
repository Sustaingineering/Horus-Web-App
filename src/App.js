import React, { Component, Fragment } from "react";
// Router
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
// Components
import LandingPage from "./Pages/Landing/Landing.jsx";
// SignIn Component
import SignInPage from "./Pages/Auth/SignIn";
// Home
import Home from "./Pages/Home/home.jsx";
// Config
import Config from "./Pages/Config/Config.jsx";
import NavBar from "./Layout/Navbar/Navbar";
import { withStyles } from "@material-ui/core/styles";
import { backgroundColor } from './assets/jss/mainStyle';

import { FirebaseContext } from "./Firebase/firebase.js";

// Sensor
import Sensor from "./Pages/Dashboard/Sensor";

const customStyle = (theme) => ({
  root: {
    position: 'relative',
    minHeight: 'calc(100vh - 160px)',
    paddingTop: 60, // with titlebar
    paddingBottom: '20px',
    backgroundColor: backgroundColor
  },
  container: {
    flexGrow: 1,
    marginRight: '2%',
    marginLeft: 'calc(57px + 2%)'
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.subscribers = [];
    this.dbrefs = [];
    this.state = {
      authUser: undefined,
      sensors: {},
      data: {},
      posts: []
    };
    this.props.firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        this.setState({authUser : authUser});
        this.updateSensors();
        this.postSubscriber();
      } else {
        try {
          this.subscribers.map((s) => s());
          this.dbrefs.map((e) => e.off());
        } catch (e) {
          console.log(e);
        } finally {
          this.subscribers = [];
          this.dbrefs = [];
          this.setState({authUser : undefined, sensors: {}, data: {}, posts: []});
        }
      }
    });
  }

  getDatabase = (sensorId) => {
    let db = this.props.firebase.database().ref(sensorId);
    this.dbrefs.push(db);
    let temp = this.state.data;
    temp[sensorId] = [];
    // Use .once() to make it call less data
    db.limitToLast(30).once('value', (e) => {
      for (let i in e.val()) {
        temp[sensorId].push(e.val()[i]);
      }
    });
    db.limitToLast(1).on('child_added', (e) => {
      if (temp[sensorId].length >= 30) temp[sensorId].shift();
      temp[sensorId].push(e.val());
      this.setState({
        data: temp
      });
    });
  }

  updateSensors = () => {
    let db = this.props.firebase.firestore();
    // Grab the UID from the auth().currentUser object in case state isn't updated yet
    let uid = this.props.firebase.auth().currentUser.uid;
    db.collection("users").doc(uid).get().then((doc) => {
      if (doc.exists) {
        this.setState({
          sensors: doc.data().sensors
        }, () => {
          // This can be improved by not dropping the database entries that we don't need
          // Keep as is for proof of concept.
          this.dbrefs.map((e) => e.off());
          this.dbrefs = [];
          for (let newSensors in this.state.sensors) {
            this.getDatabase(this.state.sensors[newSensors]);
          }
        });
      } else {
        db.collection("users").doc(uid).set({sensors: {}});
        this.setState({
          sensors: {}
        });
      }
    });
  }

  postSubscriber = () => {
    let db = this.props.firebase.firestore();
    this.subscribers.push(db.collection("posts").onSnapshot((c) => {
      let posts = [];
      c.forEach((doc) => {
        posts.push(doc.data());
      });
      this.setState({
        posts: posts
      })
    }));
  }

  processSensors = () => {
    let sensorsRedirects = [];
    for (let x in this.state.sensors) {
      sensorsRedirects.push(
        <Route 
          path={"/" + x}
          exact
          key={x}
          render={(props) => (
            <FirebaseContext.Consumer>
              {firebase => <Sensor {...props} 
                                  sensorName={x} 
                                  firebase={firebase} 
                                  data={this.state.data[this.state.sensors[x]]}
                                  sensorId={this.state.sensors[x]} 
                                  />}
            </FirebaseContext.Consumer>
          )}
        />
      );
    }
    return sensorsRedirects;
  }

  render() {
    const { classes } = this.props;
    const renderPlatform = this.state.authUser ? (
      <Fragment>
          <FirebaseContext.Consumer>
            {firebase => {
              return (<NavBar updateSensors={this.updateSensors} sensors={this.state.sensors} firebase={firebase} />);
            }}
          </FirebaseContext.Consumer>
          <div className={classes.root}>
            <div className={classes.container}>
              <Switch>
                <Route path="/" exact render={(props) => 
                  <FirebaseContext.Consumer>
                    {firebase => <Home {...props} posts={this.state.posts} firebase={firebase} />}
                  </FirebaseContext.Consumer>
                } />
                {this.processSensors().map((e) => e)}
                <Route path="/config" exact render={(props) => 
                  <FirebaseContext.Consumer>
                    {firebase => <Config {...props} firebase={firebase} />}
                  </FirebaseContext.Consumer>
                } />
                <Redirect to="/" />
              </Switch>
            </div>
          </div>
      </Fragment>
    ) : (
      <Fragment>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" exact render={(props) =>
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
          {renderPlatform}
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default withStyles(customStyle)(App);
