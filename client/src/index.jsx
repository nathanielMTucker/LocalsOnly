import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Firebase, {FirebaseContext} from './Authentication';
import User, {UserContext} from './User';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

// import {register} from "./serviceWorker";

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
            <UserContext.Provider value={new User()}>
                <App/>
            </UserContext.Provider>
    </FirebaseContext.Provider>,
    document.getElementById('root')
);

// register();import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();