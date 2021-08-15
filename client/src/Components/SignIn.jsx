import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Authentication';
import { SignUpLink } from './SignUp';
import { withUser } from '../User';
import { GoogleSignIn } from './Buttons';
import useToggle from '../Components/useHooks/useToggle';
import RememberMe from './RememberMe';
import {getCookie, setCookie} from "../globals";

const SignInPage = () => (<SignInForm />);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: ''
};



const SignInFormBase = ({firebase})=>{
  
    const [toggleError, setToggleError] = useToggle();
    let [state, setState] = useState(INITIAL_STATE);
    const [rememberMe, setRememberMe] = useToggle(Boolean(getCookie("remember-me")) || false);

    const setPersistentStorage = (persistence, callback)=>{
      firebase.setPersistenceStorage(persistence)
        .then(()=>{
          callback();
        })
        .catch(err=>{
          console.dir("Error in userCheckedRememberMe: " + err);
        })
    }

    const onSubmit = event => {
      event.preventDefault();
      // console.log(rememberMe);
      const { email, password } = state;
      const signInWithEmail = firebase
        .signInWithEmailAndPassword(email, password)
        .then((u) => {

          setState({INITIAL_STATE });
        })
        .catch(error => {
          setState({ ...state, error:error });
        })
      
      if(rememberMe){
        console.log("Remember Me");
        setCookie("remember-me", true, 30);
        setPersistentStorage(firebase.persistenceLocal, signInWithEmail);
        return;
      }
      console.log("Dont Remember Me");
      setCookie("remember-me", "", -1);
      setPersistentStorage(firebase.persistenceNone, signInWithEmail);
    }

    const onChange = ({target: {name, value}}) => {
      setState({...state, [name]: value });
    };

    const { email, password } = state;
    let {error} = state;
    const isInvalid = password === '' && email === '';

    return (<div>
      
      <form onSubmit={onSubmit} className="container">
       {/* <div className="section px-0 pt-6 pb-5">
        <GoogleSignIn setUser={props.setUser}/>
       </div>
       <div className="text-has-line"><span>or</span></div> */}
        <div className="field pt-6">
          <div className="control">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              name="email"
              value={email}
              onChange={onChange}
              type="text"
              className="input"
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              name="password"
              value={password}
              onChange={onChange}
              type="password"
              className="input"
            />
          </div>
        </div>
        <RememberMe rememberMe={rememberMe} setRememberMe={setRememberMe}/>
        <div className="field">
          <div className="columns is-centered section mt-1">
            <button className={`column pt-2  button ${isInvalid ? 'is-danger' : 'is-primary'}`} disabled={isInvalid} type="submit">
            Sign In
            </button>
          </div>
          <div className="section">
          <SignUpLink/>
          </div>
        </div>
      </form>
        {error && <div className={`box is-danger is-outlined ${toggleError && "is-hidden"}`} onClick={e=>{
          e.preventDefault();
          setToggleError();
        }}>{error.message}</div>}
    </div>
    );
 }

const SignInForm = compose(
  withUser,
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };