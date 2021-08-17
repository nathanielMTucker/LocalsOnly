import React, { useState } from 'react'
import SignUp from '../Components/SignUp';
import {withRouter, Link} from 'react-router-dom';
import {compose} from 'recompose';
import {STATES} from '../globals';
import {getAbbrs} from '../globals';
import { withFirebase } from '../Authentication';
import axios from 'axios';
import Alert from '../Components/Alert';

const getCities = require('countrycitystatejson').getCities

const RegistrationBase = ({firebase, history})=>{
    const isCity = (state, city)=>{
        const isCity = getCities('US', state).includes(city)
        if(isCity){
            document.getElementById("city-input").classList.remove('is-danger');
            document.getElementById("city-input").classList.add('is-success');
            setVerAddress(true);
        }else{
            document.getElementById("city-input").classList.remove('is-success');
            document.getElementById("city-input").classList.add('is-danger');
            setVerAddress(false);
        }
    }
    const setCity = e=>{
        e.preventDefault(); 
        let city = e.target.value;
        city = city.toLowerCase().split(' ').map(c=>c.charAt(0).toUpperCase() + c.substring(1)).join(' ');
        
        isCity(local.state, city)
       
        setLocal({...local, city:e.target.value}); 
    }
    const setState = e=>{ 
        e.preventDefault(); 
        isCity(e.target.value, local.city)
        setLocal({...local, state:e.target.value}); 
    }
    
    
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

   
    let [verAddress, setVerAddress] = useState(false);
    let [verPass, setVerPass] = useState(false);
    

    const [birthday, setBirthday] = useState({});

    const abortController = new AbortController();
    const signal = abortController.signal;

    React.useEffect(()=>{
        
        
        return function cleanup(){
            abortController.abort();
        }
    })
    
    const handleSubmit = e => {
        e.preventDefault();
        
        firebase.createUserWithEmailAndPassword(user.email, user.passwordOne, {signal: signal})
        .then( ({user : {uid}}) => {
            
            axios.post(`/api/v1/users`,{
                authID: uid,
                email:user.email,
                name: user.name,
                localTo: `${getAbbrs(local.state)}:${local.city.toLowerCase().replace(' ', '_')}`,
                birthday : birthday
            })
            
            .then(()=>{
                firebase.signInWithEmailAndPassword(user.email, user.passwordOne)
                .then(
                    ()=>{
                        history.push('/')
                        window.location.reload(); 
                        alert("Thank you for signing up!")
                    }
                );
            })
            .catch(err => console.error(err))

        })
        .catch(
            err => {
                const m = err.code;
                switch (m){
                    case "auth/email-already-in-use":
                        alert(err.message)
                        break
                    default:
                        console.error(err);
                        break                        
                }
            }
        )
        
        
    }
    const stateOptions=()=>{
        return STATES.map(state=>
            <option key={state} value={state}>{state}</option>
        )

    }
    const isDisabled = () => {
        
        return !(verPass && verAddress);
    }
    return (
    <main className="registration section">
        <div className="columns is-centered">
            <div className="is-half">
                <div className="box border-main">
                    <div className="hero py-6 my-0 px-5 mx-0 is-primary">
                        <div className="text-center level home-logo">
                        <img src="../LocalsOnly.png" alt="localsonly"/>
                            <label className="level-item title">Registration</label>
                        </div>
                    </div>
                    <section className="column">
                        <form onSubmit={handleSubmit} className="form">
                        <label className="label">
                            <SignUp setUser={setUser} setStatus={setVerPass} user={user}/>
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
                                        <select name="state" id="state" value={local.state} onChange={setState}>
                                            {stateOptions()}
                                        </select>
                                    </div>
                                </div>
                                <div className="column">
                                    <input id="city-input" type="text" placeholder="City/Town" className="input" name="city" value={local.city} onChange={setCity}/>
                                </div>
                            </div>
                        </label>
                        <div className="level">
                            <div className="level-left">
                            <button id="sign-up-button" className="level-item button is-primary" disabled={isDisabled()} type="submit">Sign Up</button>
                            </div>
                        <small className="help is-info">* All fields are required</small>
                        </div>
                        </form>
                    </section>
                    <small className="content has-text-centered section">Already have an account? <Link className="has-text-primary" to="/">Login!</Link></small>
                </div>
                <div className="my-0 py-0 section content has-text-centered">By signing up you accept all cookies, <Link>terms of services</Link> and <Link>privacy policy</Link></div>
            </div>
        </div>
    </main>
    )
}
const Registration = compose(withRouter, withFirebase)(RegistrationBase);
export default Registration;
