import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Firebase, { FirebaseContext } from "./Firebase/firebase.js";
import { CssBaseline } from "@material-ui/core";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <CssBaseline />
    <FirebaseContext.Consumer>
      {firebase => <App firebase={firebase} />}
    </FirebaseContext.Consumer>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
