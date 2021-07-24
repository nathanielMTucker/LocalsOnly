import React, {useState} from 'react'
import { withUser } from '../User'
import {withFirebase} from '../Authentication';
import {compose} from 'recompose';
import axios from 'axios';

const Profile = ({USER : user, firebase}) => {
    
    let [state, city] = user.localTo.split(':');
    const [edit, setEdit] = useState(false);
    const [userInfo, setUserInfo] = useState({
        id : user.ownerID,
        name : user.name,
        email : user.email,
        localTo : user.localTo
    })

    const updateUserInto = (e)=>{
        e.preventDefault();
        const {target : {name, value}} = e;
        setUserInfo({...userInfo, [name] : value})
    }

    return (
        <div id="profile-page" className="pt-5 pl-0 container">
            <h1 className="title">
                    Profile { edit ? 
                    <div>
                        <button className="button is-danger" onClick={e=>{
                                e.preventDefault();
                                setEdit(false)
                            }}>
                                <small className="help">
                                    cancel
                                </small>
                            </button>
                        <button className="button is-primary" onClick={e=>{
                            e.preventDefault();
                            axios.patch(`/api/v1/users/${userInfo.id}`,{
                                name : userInfo.name,
                                email : userInfo.email,
                                localTo : userInfo.localTo
                            }).then(res=>{
                                {/* console.log(res); */}
                                setEdit(false);
                            }).catch(err=>{
                                console.log(err);
                            })
                            }}
                        
                        >
                            <small className="help">submit</small>
                        </button>
                    </div>
                    :
                        <button onClick={(e)=>{
                        e.preventDefault();
                        setEdit(true);
                        }}><small className="help is-info">edit</small></button>}
            </h1>
            <div className="">
                <p>Name: {
                    user.name === '' ? <a className="has-text-info" href="#">Add</a> : 
                    edit ? <input className="input" type="text" value={userInfo.name} onChange={updateUserInto} name="name"/> : 
                    user.name}</p>
                <p>Email:  {
                    user.email === '' ? <a className="has-text-info" href="#">Add</a> : 
                    edit ? <input className="input" type="text" value={userInfo.email} onChange={updateUserInto} name="email"/> :
                    user.email}</p>
                <p>Local:  {
                    user.localTo === '' ? <a className="has-text-info" href="#">Add</a> :
                    edit ? <input className="input" type="" value={userInfo.localTo} onChange={updateUserInto} name="localTo"/> :
                    `${city}, ${state}`}</p>
                {/* <p>Soft Local: Feature still in development. Learn about upcoming features <a href="/upcoming-features">here.</a></p> */}
            </div>
            <footer>
                <button className="button is-danger is-outlined is-small">Delete Account</button>
            </footer>
        </div>
    )
}

export default compose(withFirebase, withUser)(Profile);
