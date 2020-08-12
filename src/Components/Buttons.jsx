import React from 'react'
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom'
import * as ROUTES from '../Constants/routes';
import {withFirebase} from '../Authentication';

export const LogoutButton = withFirebase(({firebase})=>{
  const history = useHistory();
  
    return (
        <React.Fragment>
        <button className="button is-primary" onClick={()=>{firebase.signOut(); history.push(ROUTES.HOME);}}> 
          <i className="fas fa-door-open"></i>
        </button>
        
        </React.Fragment>
    )
})

export const LogoLinkButton = ()=>(
    <Link to={ROUTES.HOME}>
        <img src={require('../img/LocalsOnly.png')} alt="localsonly-logo"/>
    </Link>
)


export const LocalizeLinkButton = ()=>{
    const toggle = ()=>{
        if(document.getElementById('search')) 
            document.getElementById('search').classList.remove('is-active');
        if(document.getElementById('sign')) 
            document.getElementById('sign').classList.remove('is-active');
    }
    return (
        <Link className="button has-background-primary-light" to={ROUTES.NEWLOCAL} onClick={toggle}>
            <i className="fas fa-plus-circle"></i>
        </Link> 
    )
}

export const UserProfileButton = ()=>(
    <Link className="button is-main" to={ROUTES.PROFILE}>
    <i className="fas fa-user-astronaut"></i>
    </Link>
)