import React from 'react'
import { withUser } from '../User'
import {withFirebase} from '../Authentication';
import {withServer} from '../Server';
import {compose} from 'recompose';

const Profile = ({USER, firebase, server}) => {
    const user = USER;
    let [state, city] = user.localTo.split(':');
     
    return (
        <div className="pt-5 pl-0">
            <div className="columns">
                <aside className="menu column is-2" style={{height:"87vh",borderRightWidth: "medium", borderRightColor:'#FFE600', overflowY:'hidden'}}>
                    <p className="menu-label">
                        General
                    </p>
                    <ul className="menu-list">
                        <li>Dashboard</li>
                    </ul>
                    <p className="menu-label">
                        Account
                    </p>
                    <ul className="menu-list">
                        <li>
                            Update Info
                            <ul>
                                <li>Change Name</li>
                                <li>Change Local</li>
                            </ul>
                        </li>
                        <li>Upgrade Account</li>
                    </ul>
                    <p className="menu-label">
                        Authentication
                    </p>
                    <ul className="menu-list">
                        <li>
                        Update Login
                        <ul>
                            <li>Update Email Address</li>
                            <li>Update Password</li>
                        </ul>
                        </li>
                        <li><a href='/' onClick={()=>firebase.signOut()}>Sign Out</a></li>
                        <li ><span className="has-background-error">Delete Account</span></li>
                    </ul>
                    
                </aside>
                        
                <div className="column">
                    <h1 className="title">
                        Your Info
                        
                    </h1>
                    <div className="container">
                        <p>Name: {user.name === '' ? <a className="has-text-info" href="#">Add</a> : user.name}</p>
                        <p>Email:  {user.email === '' ? <a className="has-text-info" href="#">Add</a> : user.email}</p>
                        <p>Local:  {user.localTo === '' ? <a className="has-text-info" href="#">Add</a> : `${city}, ${state}`}</p>
                        <p>Soft Local: Feature still in development</p>
                    </div>
                    
                </div>
            </div>
            <footer><small className="help">This is all the info we store. If you would like to see how it is used, go to <a href="/data">How Your Data Is Used</a></small></footer>
        </div>
    )
}

export default compose(withFirebase, withUser, withServer)(Profile);
