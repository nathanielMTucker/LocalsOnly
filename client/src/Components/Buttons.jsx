import React from 'react'
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom'
import * as ROUTES from '../Constants/routes';
import {withFirebase} from '../Authentication';

export const LogoutButton = withFirebase(({firebase}) => {
    const history = useHistory();
   return <React.Fragment>
        <button title="Logout" className="button is-primary" 
            onClick={()=>{
                firebase.signOut(); history.push(ROUTES.HOME);
        }}> 
            <i className="fas fa-door-open"/>
        </button>
    </React.Fragment>
})

export const LogoLinkButton = ()=>(
    <Link to={ROUTES.HOME}>
        <img src="../LocalsOnly.png" alt="localsonly"/>
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
        <Link title="New Local" className="button is-inverted" to={ROUTES.NEW_LOCAL} onClick={toggle}>
            <i className="fas fa-plus-circle"/>
        </Link> 
    )
}

export const UserProfileButton = ()=>(
    <Link title="Profile" className="button is-main is-inverted" to={ROUTES.PROFILE}>
        <i className="fas fa-user-astronaut"/>
    </Link>
)