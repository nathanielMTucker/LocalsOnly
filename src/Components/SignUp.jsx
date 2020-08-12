import React,{useEffect} from 'react';
import { Link} from 'react-router-dom';
import * as ROUTES from '../Constants/routes';
import {buttons} from '../Constants/IDs';


 
export default props=> {
  
    let setUser = props.setUser;
    let user = props.user;
    let status = props.status;
    let setStatus = props.setStatus;

    
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
     
      if(name === "passwordOne" || name === "passwordTwo"){
        checkPassword();
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
        <label className="label">
          Password
          <div className="field">
          <div className="control">
            <input
            id="passwordOne"
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
        </label>
        <label className="label">
          Confirm Password
          <div className="field">
          <div className="control">
            <input
              id="passwordTwo"
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