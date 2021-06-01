import React, { PureComponent, Fragment } from "react";
// Router
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
// Components
import LandingPage from "./Pages/Landing";
// SignIn Component
import SignInPage from "./Pages/SignIn";
import Home from "./Pages/Home";
import Sensors from "./Pages/Sensors";
import Account from "./Pages/Account";
import NavBar from "./Components/Navbar";
import Sensor from "./Pages/Dashboard/Sensor";
import Help from "./Pages/Help";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.firestoreSubscribers = [];
    this.state = {
      authUser: undefined,
      sensors: {},
      posts: [],
    };
  }

  componentDidMount = () => {
    this.props.firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        this.setState({ authUser: authUser });
        this.sensorSubscriber();
        this.postSubscriber();
      } else {
        try {
          this.firestoreSubscribers.forEach((unsubscribe) => unsubscribe());
        } catch (e) {
          console.log(e);
        } finally {
          this.firestoreSubscribers = [];
          this.setState({
            authUser: undefined,
            sensors: {},
            posts: [],
          });
        }
      }
    });
  };

  sensorSubscriber = () => {
    let db = this.props.firebase.firestore();
    // Grab the UID from the auth().currentUser object in case state isn't updated yet
    let uid = this.props.firebase.auth().currentUser.uid;
    this.firestoreSubscribers.push(
      db
        .collection("users")
        .doc(uid)
        .onSnapshot((doc) => {
          if (doc.exists && doc.data().sensors) {
            this.setState({
              sensors: doc.data().sensors,
            });
          } else if (!doc.metadata.fromCache) {
            // Store a new document for the user with the sensor object
            db.collection("users").doc(uid).set({ sensors: {} });
            this.setState({
              sensors: {},
            });
          }
        })
    );
  };

  postSubscriber = () => {
    let db = this.props.firebase.firestore();
    this.firestoreSubscribers.push(
      db.collection("posts").onSnapshot((c) => {
        let posts = [];
        c.forEach((doc) => {
          posts.push(doc.data());
        });
        this.setState({
          posts: posts,
        });
      })
    );
  };

  processSensors = () => {
    let sensorsRedirects = [];
    for (let sensor in this.state.sensors) {
      sensorsRedirects.push(
        <Route
          path={"/" + sensor}
          exact
          key={sensor}
          render={() => (
            <Sensor
              sensorName={sensor}
              firebase={this.props.firebase}
              sensorId={this.state.sensors[sensor]}
            />
          )}
        />
      );
    }
    return sensorsRedirects;
  };

  render() {
    const renderPlatform = this.state.authUser ? (
      <Fragment>
        <NavBar sensors={this.state.sensors} firebase={this.props.firebase}>
          <Switch>
            {Object.keys(this.state.sensors).map((sensor) => (
              <Route
                path={`/sensors/${sensor}`}
                exact
                key={"route-" + sensor}
                render={() => (
                  <Sensor
                    sensorName={sensor}
                    firebase={this.props.firebase}
                    sensorId={this.state.sensors[sensor]}
                  />
                )}
              />
            ))}
            <Route
              path="/sensors"
              exact
              render={() => (
                <Sensors
                  firebase={this.props.firebase}
                  firestoreSubscribers={this.firestoreSubscribers}
                />
              )}
            />
            <Route
              path="/help"
              exact
              render={() => (
                <Help
                  firebase={this.props.firebase}
                  firestoreSubscribers={this.firestoreSubscribers}
                />
              )}
            />
            <Route
              path="/account"
              exact
              render={() => (
                <Account
                  firebase={this.props.firebase}
                  firestoreSubscribers={this.firestoreSubscribers}
                />
              )}
            />
            <Route
              path="/"
              exact
              render={() => (
                <Home posts={this.state.posts} firebase={this.props.firebase} />
              )}
            />
            <Redirect to="/" />
          </Switch>
        </NavBar>
      </Fragment>
    ) : (
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route
          path="/login"
          exact
          render={() => <SignInPage firebase={this.props.firebase} />}
        />
        <Redirect to="/" />
      </Switch>
    );
    return <BrowserRouter>{renderPlatform}</BrowserRouter>;
  }
}

export default App;
