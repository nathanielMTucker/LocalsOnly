import React,{useEffect, useState} from 'react';
import { Link} from 'react-router-dom';
import * as ROUTES from '../Constants/routes';
import {buttons} from '../Constants/IDs';


 
export default props=> {
  
    let setUser = props.setUser;
    let user = props.user;
    let status = props.status;
    let setStatus = props.setStatus;

    const checkEmail = ()=>{
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      if(re.test(String(user.email).toLowerCase())){
        document.getElementById('email').classList.remove('is-danger')
        document.getElementById('email').classList.add('is-success')
        
        setStatus({...status, user:true});
      }else{
        document.getElementById('email').classList.remove('is-success');
        document.getElementById('email').classList.add('is-danger');
        
        setStatus({...status, user:false})
      }
    }
    const checkPassword = ()=>{
      if(user.passwordOne.length > 5){
        document.getElementById('passwordOne').classList.add('is-success')
        if(user.passwordTwo.length > 5){
          if(user.passwordOne === user.passwordTwo){
            document.getElementById('passwordOne').classList.add('is-success')
            document.getElementById('passwordOne').classList.remove('is-danger')
            setStatus({...status, user:true});
          }else{
            document.getElementById('passwordOne').classList.add('is-danger');
            document.getElementById('passwordOne').classList.remove('is-success');
            setStatus({...status, user:false})
          }
        }
      }
    }
  
    const onChange = event => {
      const {name, value} = event.target;
      if(name === "email") setUser({...user, [name]:value.replace(/\s/g, '')})
      else setUser({...user, [name]:value})
      if(name === "email"){
        checkEmail();
      }
      if(name === "passwordOne" || name === "passwordTwo"){
        checkPassword();
      }
      event.preventDefault();
  }

    return (
      <section id="signup" className="container is-centered">
      <div className="field">
        <div className="control">
          <input
            name="name"
            value={user.name}
            onChange={onChange}
            type="text"
            placeholder="Full Name"
            className="input"
            autoFocus={true}
          />
        </div>
      </div>
      
      
        <div className="field">
          <div className="control">
            <input
              id="email"
              name="email"
              value={user.email}
              onChange={onChange}
              type="text"
              placeholder="Email Address"
              className="input"
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
            id="passwordOne"
              name="passwordOne"
              value={user.passwordOne}
              onChange={onChange}
              type="password"
              placeholder="Password"
              className="input"
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              id="passwordTwo"
              name="passwordTwo"
              value={user.passwordTwo}
              onChange={onChange}
              type="password"
              placeholder="Confirm Password"
              className="input"
            />
          </div>
        </div>
        
        
 
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
  return <small>Don't have an account? <Link id="signup-button" className="has-text-link" to={ROUTES.SIGNUP} >Sign Up!</Link></small>
}