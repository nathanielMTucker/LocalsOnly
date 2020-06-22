import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyDOZ6d6M5cnuKqBL4IyYXKu7TU_Rt-POFw",
    authDomain: "localsonly-a3c68.firebaseapp.com",
    databaseURL: "https://localsonly-a3c68.firebaseio.com",
    projectId: "localsonly-a3c68",
    storageBucket: "localsonly-a3c68.appspot.com",
    messagingSenderId: "583296937791",
    appId: "1:583296937791:web:59de121a0df2fa83eead8a",
    measurementId: "G-RVH5R21C1C"
  };
let fire = firebase.initializeApp(config);
export default fire;