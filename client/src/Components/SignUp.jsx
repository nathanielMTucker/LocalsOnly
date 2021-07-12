import React,{useEffect} from 'react';
import { Link} from 'react-router-dom';
import * as ROUTES from '../Constants/routes';
import {buttons} from '../Constants/IDs';


 
const SignUp = ({setStatus, user, setUser})=> {
  
    const checkPasswordMatch = ()=>{
      const pass = document.getElementById('password');
      const passMatch = document.getElementById('password_match');
      const validateString = str => (/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!#$%^&+=]).*$/.test(str))
      
        
          if(pass.value === passMatch.value && (pass.value.length > 7 && passMatch.value.length > 7)){
            if(validateString(pass.value) && validateString(passMatch.value)){
              passMatch.classList.add('is-success')
              passMatch.classList.remove('is-danger')
              setStatus(true)
              return;
            }
          }
          passMatch.classList.add('is-danger');
          passMatch.classList.remove('is-success');
          setStatus(false)
    }
  
    const onChange = event => {
      const {name, value} = event.target;
      if(name === "email") setUser({...user, [name]:value.replace(/\s/g, '')})
      else setUser({...user, [name]:value})
     
      if(name === "passwordTwo" || name === "passwordOne"){
        checkPasswordMatch();
      }
      event.preventDefault();
  }

    return (
      <section id="signup" className="container is-centered">
      <label className="label">
        Full Name
        <div className="field">
        <div className="control">
          <input
            name="name"
            value={user.name}
            onChange={onChange}
            type="text"
            className="input"
            autoFocus={true}
          />
        </div>
      </div>
      </label>
        <label className="label">
          Email
        <div className="field">
          <div className="control">
            <input
              id="email"
              name="email"
              value={user.email}
              onChange={onChange}
              type="email"
              className="input"
              required
            />
          </div>
        </div>
        </label>
        <label className="label level">
          <span className="level-left">
            <span className="level-item">Password</span> 
            <small className="help level-item is-info"> must be at least 8 characters and contain at least 1 letter, number and special character (!#$%^&+=)</small>
          </span>
        </label>
          <div className="field">
          <div className="control">
            <input
            id="password"
              name="passwordOne"
              value={user.passwordOne}
              onChange={onChange}
              type="password"
              className="input"
              minLength={8}
              required
            />
          </div>
        </div>
        
        <label className="label">
          Confirm Password
          <div className="field">
          <div className="control">
            <input
              id="password_match"
              name="passwordTwo"
              value={user.passwordTwo}
              onChange={onChange}
              type="password"
              className="input"
              minLength={8}
              required
            />
          </div>
        </div>
        </label>
        {user.error && <p className="help is-danger">{user.error.message}</p>}
      </section>
    );
  }

 
export const SignUpLink = () => {
  useEffect(()=>{
    if(document.getElementById(buttons.SIGN)){
      const sign = document.getElementById(buttons.SIGN);
    const button = document.getElementById("signup-button")
    document.addEventListener('click',e=>{
        const isClickedInside = button.contains(e.target);
        if(isClickedInside && sign.classList.contains('is-active')){
            sign.classList.remove('is-active');
        
    }})
    }
})
  return <small>Don't have an account? <Link id="signup-button" className="has-text-primary" to={ROUTES.SIGNUP} >Sign Up!</Link></small>
}

export default SignUp;