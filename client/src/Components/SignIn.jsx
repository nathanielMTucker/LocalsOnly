import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Authentication';
import { SignUpLink } from './SignUp';
import { Checkbox } from '@material-ui/core';
import { withUser } from '../User';
import { GoogleSignIn } from './Buttons';
import useToggle from '../Components/useHooks/useToggle';

const SignInPage = () => (<SignInForm />);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: '',
  rememberMe: false
};



const SignInFormBase = props=>{
  
    const [toggleError, setToggleError] = useToggle();
    let [state, setState] = React.useState(INITIAL_STATE);

    React.useEffect(()=>{
      
    },[])

    const onSubmit = event => {
      event.preventDefault();
      
      const { email, password } = state;
      
      if(state.rememberMe){
       props.firebase.auth.setPersistence(props.firebase.Auth.Persistence.LOCAL)
      .then(() => {
        props.firebase
          .signInWithEmailAndPassword(email, password)
          .then((u) => {
  
            setState({INITIAL_STATE });
          })
          .catch(error => {
            setState({ ...state, error:error });
            if(!toggleError)
              setToggleError();
            
          });

      })
      .catch((error) => {
      
      }); 
      }
      else{
      if(Storage){
        localStorage.clear();
      }
       props.firebase.auth.setPersistence(props.firebase.Auth.Persistence.SESSION)
        .then(() => (
          props.firebase
            .signInWithEmailAndPassword(email, password)
            .then((u) => {
    
              setState({INITIAL_STATE });
            })
            .catch(error => {
              setState({ ...state, error:error });
            })
      ))
    }}

    const onChange = ({target: {name, value}}) => {
      setState({...state, [name]: value });
    };

    const onRememberMe = ( {target : checked}) => {
     setState({...state, rememberMe : !checked}) 
    }

    const { email, password } = state;
    let {error} = state;
    const isInvalid = password === '' && email === '';

    return (<div>
      
      <form onSubmit={onSubmit} className="container">
       {/* <div className="section px-0 pt-6 pb-5">
        <GoogleSignIn setUser={props.setUser}/>
       </div> */}
       {/* <div className="text-has-line"><span>or</span></div> */}
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
        <Checkbox
          name="rememberMe"
          checked={state.rememberMe}
          onChange={onRememberMe}
        />Remember My Email
        <div className="field">
          <div className="control">
            <button className={`button is-outlined ${isInvalid ? 'is-danger' : 'is-primary'}`} disabled={isInvalid} type="submit">
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