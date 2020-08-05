import React, { useState } from 'react'
import SignUp from '../Components/SignUp';
import {withRouter, Link} from 'react-router-dom';
import {compose} from 'recompose';
import Birthday from '../Components/Birthday';
import {STATES} from '../globals';
import axios from 'axios';
import {getAbbrs} from '../globals';
import { withFirebase } from '../Authentication';
import Alert from '../Components/Alert';
import '../App.scss';


const IOM = require('../img/LocalsOnly.png');

const RegistrationBase = props=>{
    const forceUpdate = useState()[0];

    const firebase = props.firebase;
    const server = props.server;
    let [local, setLocal] = useState({
        city:'',
        state:'Alabama',
    })
    
    let [user, setUser] = useState({
        name: '',
        email: '',
        emailChanged: '',
        passwordOne: '',
        passwordTwo: '',
        error: null,
    })

    let [status, setStatus] = useState({
        age: false,
        address: false,
        user: false
    })
    const abortController = new AbortController();
    const signal = abortController.signal;

    React.useEffect(()=>{
        return function cleanup(){
            abortController.abort();
        }
    }, [])
    // const isInvalid = ()=>{
    //     return !(status.age)
    // };
    const handleSubmit = e => {
        e.preventDefault();
        
        firebase.createUserWithEmailAndPassword(user.email, user.passwordOne, {signal: signal})
        .then( u => {
            const uid = u.user.uid;
            const state = getAbbrs(local.state);
            const city = local.city.toLowerCase().replace(' ', '_');

            axios.post(`${server}/user`,{
                authID: uid,
                email:user.email,
                name: user.name,
                localTo: `${state}:${city}`,
            }
                 
            ).then(res=>{
                firebase.signInWithEmailAndPassword(user.email, user.passwordOne)
                .then(
                    ()=>{
                        props.history.push('/')
                        window.location.reload(); 
                    }
                );
               
               
                
            }).catch(err => console.log(err))
        })
        .catch(
            err => {
                const m = err.code;
                switch (m){
                    case "auth/email-already-in-use":
                        alert(err.message)
                        break
                    default:
                        console.log(err);
                        break                        
                }
            }
        )
        
        
    }
    const stateOptions=()=>{
        return STATES.map(state=>
            <option key={state} value={state.toLowerCase()}>{state}</option>
        )

    }
    return (
    <div className="registration section">
        <div className="columns is-centered">
            <div className="is-half  ">
                <div className="box border-main">
                    <div className="hero fill-hero box is-primary">
                        <div className="text-center level">
                            <img className="" src={IOM} alt=""/>
                            <label className="level-item title">Registration</label>
                        </div>
                        
                    </div>
                   
                    <section className="column">
                        <form onSubmit={handleSubmit} className="form">
                        <label className="label">
                            <SignUp firebase={firebase} status={status} setUser={setUser} setStatus={setStatus} user={user}/>
                        </label>
                        <label className="label">
                            <div className="is-mobile">
                                <div className="level-left">
                                    <div className="level-item">
                                        Local
                                        <Alert text="Changing Local will result in a 30 day waiting period" severity="info"/>
                                    </div>
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <div className="select">
                                        <select name="state" id="state" value={local.state} onChange={e=>{setLocal({...local, state:e.target.value}); e.preventDefault();}}>
                                            {stateOptions()}
                                        </select>
                                    </div>
                                </div>
                                <div className="column">
                                    <input type="text" placeholder="City/Town" className="input" name="city" value={local.city} onChange={e=>{setLocal({...local, city:e.target.value}); e.preventDefault();}}/>
                                </div>
                            </div>
                        </label>
                        <label className="label">
                            <div className="level-left">
                                <div className="level-item">
                                    Birthday
                                    <Alert text="Must be 13 years of age or older" severity="info"/>
                                </div>
                            </div>
                            <Birthday status={status} setStatus={setStatus}/>
                            
                        </label>
                        <div className="level">
                            <div className="level-left">
                            <button className="level-item button is-primary" type="submit">Sign Up</button>
                            <Link className="button is-info is-outlined" to="/">Back</Link>
                            </div>
                        </div>
                        <small className="help is-info">*All fields are required</small>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    </div>
    )
}
const Registration = compose(withRouter, withFirebase)(RegistrationBase);
export default Registration;
