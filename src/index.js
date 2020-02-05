import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Firebase, { FirebaseContext } from "./Firebase/firebase.js";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { mainTheme } from "./assets/jss/mainStyle";

ReactDOM.render(
  <MuiThemeProvider theme={mainTheme}>
    <FirebaseContext.Provider value={new Firebase()}>
      <CssBaseline />
      <FirebaseContext.Consumer>
        {firebase => <App firebase={firebase} />}
      </FirebaseContext.Consumer>
    </FirebaseContext.Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
