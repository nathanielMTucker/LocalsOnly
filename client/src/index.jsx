import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Firebase, {FirebaseContext} from './Authentication';
import User, {UserContext} from './User';
import axios from 'axios';
// import {register} from "./serviceWorker";

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase(async ()=>{
  await axios.get('env/var?auth=Ro9JFA:4Su~%p@M7hnDTLpQfZ4j')
  .then(({data})=> data)
})}>
            <UserContext.Provider value={new User()}>
                <App/>
            </UserContext.Provider>
    </FirebaseContext.Provider>,
    document.getElementById('root')
);

// register();