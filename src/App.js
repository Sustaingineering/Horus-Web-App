import React, { PureComponent, Fragment } from "react";
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
import { withStyles } from "@material-ui/core";
import { backgroundColor } from "./assets/jss/mainStyle";

// Sensor
import Sensor from "./Pages/Dashboard/Sensor";

const customStyle = theme => ({
  root: {
    position: "relative",
    minHeight: "calc(100vh - 160px)",
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(7)
    },
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(8)
    },
    backgroundColor: backgroundColor
  },
  container: {
    flexGrow: 1,
    marginRight: theme.spacing(1) / 2,
    marginLeft: theme.spacing(7)
  }
});

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.firestoreSubscribers = [];
    this.state = {
      authUser: undefined,
      sensors: {},
      posts: []
    };
  }

  componentDidMount = () => {
    this.props.firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        this.setState({ authUser: authUser });
        this.sensorSubscriber();
        this.postSubscriber();
      } else {
        try {
          this.firestoreSubscribers.map(unsubscribe => unsubscribe());
        } catch (e) {
          console.log(e);
        } finally {
          this.firestoreSubscribers = [];
          this.setState({
            authUser: undefined,
            sensors: {},
            posts: []
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
        .onSnapshot(doc => {
          if (doc.exists && doc.data().sensors) {
            this.setState({
              sensors: doc.data().sensors
            });
          } else {
            db.collection("users")
              .doc(uid)
              .set({ sensors: {} });
            this.setState({
              sensors: {}
            });
          }
        })
    );
  };

  postSubscriber = () => {
    let db = this.props.firebase.firestore();
    this.firestoreSubscribers.push(
      db.collection("posts").onSnapshot(c => {
        let posts = [];
        c.forEach(doc => {
          posts.push(doc.data());
        });
        this.setState({
          posts: posts
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
    const { classes } = this.props;
    const renderPlatform = this.state.authUser ? (
      <Fragment>
        <NavBar sensors={this.state.sensors} firebase={this.props.firebase} />
        <div className={classes.root}>
          <div className={classes.container}>
            <Switch>
              <Route
                path="/"
                exact
                render={() => (
                  <Home
                    posts={this.state.posts}
                    firebase={this.props.firebase}
                  />
                )}
              />
              {this.processSensors()}
              <Route
                path="/config"
                exact
                render={() => <Config firebase={this.props.firebase} />}
              />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
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

export default withStyles(customStyle)(App);
