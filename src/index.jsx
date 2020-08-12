import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Firebase, {FirebaseContext} from './Authentication';
import User, {UserContext} from './User';
import Server, {ServerContext} from './Server';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <ServerContext.Provider value={new Server()}>
            <UserContext.Provider value={new User()}>
                <App/>
            </UserContext.Provider>
        </ServerContext.Provider>
    </FirebaseContext.Provider>,
    document.getElementById('root')
);


