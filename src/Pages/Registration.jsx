import React, { useState } from 'react'
import SignUp from '../Components/SignUp';
import { withRouter, useHistory } from 'react-router-dom';
import { compose } from 'recompose';
import Birthday from '../Components/Birthday';
import Address from '../Components/Address';
import axios from 'axios';
import { getAbbrs } from '../globals';

const RegistrationBase = ({ firebase }) => {
    let history = useHistory();
    let [address, setAddress] = useState({
        street: '',
        apt: '',
        city: '',
        state: '',
        zip: '',
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

    const isInvalid = () => {
        if (!!(status.age && status.address && status.user)) {
            return false;
        } else {
            return true;
        }
    };
    const handleSubmit = () => {
        console.log("re ", user);
        firebase.createUserWithEmailAndPassword(user.email, user.passwordOne)
            .then((u) => {
                const uid = u.user.uid;
                const state = getAbbrs(address.state);
                const city = address.city.toLowerCase()

                axios.post('https://localsonly-server.herokuapp.com/user', {
                    authID: uid,
                    email: user.email,
                    name: user.name,
                    localTo: `${state}:${city}`,
                }).then(res => { alert("Thank you for Signing Up!"); history.push('/') }
                ).catch(err => console.log(err))

            })
            .catch(
                err => {
                    const m = err.code;
                    switch (m) {
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
    return (
        <div className="registration">



            <div className="container">
                <div className="section text-center">
                    <div className="container">
                        <label className="title">Registration</label>
                    </div>
                </div>
                <section className="columns is-centered">
                    <div className="column is-4">
                        <label className="label">
                            Credentials
                        <SignUp firebase={firebase} status={status} setUser={setUser} setStatus={setStatus} user={user} />
                        </label>
                        <label className="label">
                            Birthday
                        <Birthday status={status} setStatus={setStatus} />
                            <small className={`help ${status.age ? 'is-success' : 'is-danger'}`}>
                                Must be at least 13
                        </small>
                        </label>
                    </div>
                    <div className="column is-4">
                        <label className="label">
                            Address
                        <Address address={address} status={status} setStatus={setStatus} setAddress={setAddress} />
                            <small className="help is-info">
                                We only save the <u><b>city & state</b></u>, the rest is for verification.
                        </small>
                        </label>
                        <button className="button" disabled={isInvalid()} onClick={() => handleSubmit()}>Sign Up</button>
                    </div>
                </section>
            </div>
        </div>
    )
}
const Registration = compose(withRouter, withFirebase)(RegistrationBase);
export default Registration;
