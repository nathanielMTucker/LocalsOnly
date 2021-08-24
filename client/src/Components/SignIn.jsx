import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Authentication';
import { SignUpLink } from './SignUp';
import { GoogleSignIn } from './Buttons';
import useToggle from '../Components/useHooks/useToggle';
// import RememberMe from './RememberMe';
import {getCookie, setCookie} from "../globals";



const INITIAL_STATE = {
  email: '',
  password: '',
  error: ''
};



const SignIn = withRouter(withFirebase(({firebase, ...props})=>{
  
    const [hasError, setHasError] = useState(false);
    let [state, setState] = useState(INITIAL_STATE);

    const setPersistentStorage = (persistence, email, password)=>{
      firebase.setPersistenceStorage(persistence)
        .then(()=>{
          firebase
        .signInWithEmailAndPassword(email, password)
        .then((u) => {
          firebase.setProvider(u.additionalUserInfo.providerID)
          
        })
        .catch(error => {
          setHasError(true)
          setState({ ...state, error:error });
        })
        })
        .catch(err=>{
          console.dir("Error in userCheckedRememberMe: " + err);
        })
    }

    const onSubmit = event => {
      event.preventDefault();
      // console.log(rememberMe);
      const { email, password } = state;
      
      setPersistentStorage(firebase.persistenceLocal(), email, password);
        
    }

    const onChange = ({target: {name, value}}) => {
      setState({...state, [name]: value });
    };

    const { email, password } = state;
    let {error} = state;
    const isInvalid = password === '' && email === '';

    return (<div className={props.className}>
      
      <form onSubmit={onSubmit} className="form">
       {/* <div className="section px-0 pt-6 pb-5">
        <GoogleSignIn setUser={props.setUser}/>
       </div>
       <div className="text-has-line"><span>or</span></div> */}
        <div className="field">
          <p className="control has-icons-left">
            <input
              name="email"
              value={email}
              onChange={onChange}
              type="text"
              className="input"
              placeholder="Email"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope has-text-link"/>
            </span>
          </p>
        </div>

        <div className="field">
          <p className="control has-icons-left">
            
            <input
              name="password"
              value={password}
              onChange={onChange}
              type="password"
              className="input"
              placeholder="Password"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock has-text-link"/>
            </span>
          </p>
        </div>
        {/* <RememberMe rememberMe={rememberMe} setRememberMe={setRememberMe}/> */}
        
          <div className="pt-3">
            <button className={`pt-2  is-fullwidth is-outlined button ${isInvalid ? 'is-danger' : 'is-info'}`} disabled={isInvalid} type="submit">
            Sign In
            </button>
          </div>
        
          <div className="section">
          <SignUpLink/>
          </div>
      </form>
        {hasError && (<span className={`notification is-danger is-outlined`} onClick={e=>{
          // e.preventDefault();
          setHasError(false);
        }}>{error.message}</span>)}
    </div>
    );
 }))



export default SignIn;