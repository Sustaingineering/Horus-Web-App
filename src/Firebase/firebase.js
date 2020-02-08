import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import React from 'react';
import firebaseConfig from "../../firebase.config.js";



// Default export of firebase instance
export default class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth;
    this.firestore = firebase.firestore;
    this.database = firebase.database;
  }
}

// Export the context object to pass our firebase obj around
const FirebaseContext = React.createContext(null);
export { FirebaseContext };
