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
    this.provider = ""
  }

  setProvider = provider =>{
    this.provider = provider
  }
  setPersistenceStorage = persistence => this.auth.setPersistence(persistence);
  persistenceLocal = ()=> firebase.auth().Auth.Persistence.LOCAL
  persistenceNone = ()=> firebase.auth().Auth.Persistence.NONE

  createUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  
  emailIsAvailable = email => this.auth.fetchSignInMethodsForEmail(email);

  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  
  signOut = () => this.auth.signOut();
    

  passwordReset = email => this.auth.sendPasswordResetEmail(email);

  updatePassword = password => this.auth.currentUser.updatePassword(password);
  updateEmail = email => this.auth.currentUser.updateEmail(email);
  signInWithGooglePopup = () => this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  emailCredentials = (email, pass)=>firebase.auth.EmailAuthProvider.credential(email,pass)
  reauth = (credentials)=>this.auth.currentUser.reauthenticateWithCredential(credentials)
}

