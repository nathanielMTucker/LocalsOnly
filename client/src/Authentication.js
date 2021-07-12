import  firebase from 'firebase/app';
import 'firebase/auth';
import React from 'react';
require('dotenv').config();

const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain:process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL:process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId:process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket:process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId:process.env.REACT_APP_FIREBASE_MESSEGINGSENDERID,
  appId:process.env.REACT_APP_FIREBASE_APPID,
  measurementId:process.env.REACT_APP_FIREBASE_MEASUREMENTID,
}

export const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default class Firebase {
  constructor() {
    
    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
    this.Auth = firebase.auth.Auth;
    this.auth = firebase.auth();
    }

    createUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);
    
    emailIsAvailable = email => this.auth.fetchSignInMethodsForEmail(email);

    signInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);
    
    signOut = () => this.auth.signOut();
     

    passwordReset = email => this.auth.sendPasswordResetEmail(email);

    updatePassword = password => this.auth.currentUser.updatePassword(password);

    
}

