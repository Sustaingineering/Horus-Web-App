import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React from 'react';

// Unique, but non-secret firebase context details
var firebaseConfig = {
  apiKey: "AIzaSyBI6chLsGI6XX67LGTXXH_gXLfngCS3aNs",
  authDomain: "sustaingineering-horus.firebaseapp.com",
  databaseURL: "https://sustaingineering-horus.firebaseio.com",
  projectId: "sustaingineering-horus",
  storageBucket: "sustaingineering-horus.appspot.com",
  messagingSenderId: "717859757619",
  appId: "1:717859757619:web:c59688eb51d2fec3"
};

// Default export of firebase instance
export default class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth;
    this.firestore = firebase.firestore;
  }
}

// Export the context object to pass our firebase obj around
const FirebaseContext = React.createContext(null);
export { FirebaseContext };
