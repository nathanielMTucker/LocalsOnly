import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Authentication';
import { SignUpLink } from './SignUp';
import { Checkbox } from '@material-ui/core';

const SignInPage = () => (<SignInForm />);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  rememberMe: false,
};



const SignInFormBase = props=>{
  
    let [state, setState] = React.useState({...INITIAL_STATE});

    React.useEffect(()=>{
      if(Storage){
        state.email = localStorage.email;
        state.rememberMe = localStorage.rememberMe;
      }
    },[])

    const onSubmit = event => {
      const { email, password, rememberMe } = state;
      if(rememberMe){
        localStorage.setItem("rememberMe", true);
        localStorage.setItem("email", email);
      }
      else if(!rememberMe && localStorage.getItem('email')){
        localStorage.removeItem("email");
        localStorage.rememberMe = false;
        setState({...state, rememberMe: false})
      }
      props.firebase
        .signInWithEmailAndPassword(email, password)
        .then((u) => {
          setState({ ...INITIAL_STATE });
        })
        .catch(error => {
          setState({ ...state, error:error });
        });

      event.preventDefault();
    };

    const onChange = event => {
      setState({...state, [event.target.name]: event.target.value });
    };

    const onCheck = (event) => {
      setState({ ...state, rememberMe: event.target.checked });
    }

    const { email, password, error } = state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={onSubmit} className="container">
        <div className="field">
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
        <Checkbox
          name="rememberMe"
          checked={state.rememberMe}
          onChange={onCheck}
        />Remember Me
        <div className="field">
          <div className="control">
            <button className={`button  is-outlined ${isInvalid ? 'is-danger' : 'is-primary'}`} disabled={isInvalid} type="submit">
            Sign In
            </button>
          </div>
          <SignUpLink />
        </div>
        {error && <p>{error.message}</p>}
      </form>
    );
 }

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };