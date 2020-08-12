import  firebase from 'firebase/app';
import 'firebase/auth';
import React from 'react';
// require('dotenv').config({path: __dirname + '/.env'});
// console.log(require('dotenv').config());

const firebaseConfig = {
  apiKey: "AIzaSyDOZ6d6M5cnuKqBL4IyYXKu7TU_Rt-POFw" ,
  authDomain: "localsonly-a3c68.firebaseapp.com" ,
  databaseURL: "https://localsonly-a3c68.firebaseio.com",
  projectId: "localsonly-a3c68",
  storageBucket: "localsonly-a3c68.appspot.com",
  messagingSenderId: "583296937791",
  appId: "1:583296937791:web:59de121a0df2fa83eead8a" ,
  measurementId: "G-RVH5R21C1C"
};

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

