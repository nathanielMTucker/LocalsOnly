import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Firebase, {FirebaseContext} from './Authentication';
import User, {UserContext} from './User';


ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
            <UserContext.Provider value={new User()}>
                <App/>
            </UserContext.Provider>
    </FirebaseContext.Provider>,
    document.getElementById('root')
);


