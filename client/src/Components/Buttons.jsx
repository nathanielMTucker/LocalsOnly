import React from 'react'
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom'
import * as ROUTES from '../Constants/routes';
import {withFirebase} from '../Authentication';
import axios from 'axios';
import { fromLatLng } from '../globals';


export const LogoutButton = withFirebase(({firebase}) => {
    const history = useHistory();
   return <button title="Logout" className="button is-primary is-outlined" 
            onClick={()=>{
                firebase.signOut(); history.push(ROUTES.HOME);
        }}> 
            <span className="icon">
            <i className="fas fa-door-open"/>
            </span>
        </button>
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
        <Link title="New Local" className="button" to={ROUTES.NEW_LOCAL} onClick={toggle}>
            <span className="icon">
            <i className="fas fa-plus-circle"/>
            </span>
        </Link> 
    )
}

export const UserProfileButton = ()=>(
    <Link title="Profile" className="button is-main" to={ROUTES.PROFILE}>
        <span className="icon">
        <i className="fas fa-user-astronaut"/>
        </span>
    </Link>
)



export const CurrentLocation = ({setLocation, name})=>{
    
    const onClick = async e =>{
        e.preventDefault();
        console.log("User Location clicked");
        if ("geolocation" in navigator) {

            console.log("Available");
            navigator.geolocation.getCurrentPosition(async function(position) {

                console.log("Latitude is :", position.coords.latitude);
          
                console.log("Longitude is :", position.coords.longitude);
                axios.get(fromLatLng(`${position.coords.latitude},${position.coords.longitude}`)).then(({data:{results}})=>{
                    console.dir(results);
                    let city = "";
                    let state = "";
                    if(results[1]){
                        for(let i = 0; i < results[0].address_components.length; i++){
                            for(let b = 0; b < results[0].address_components[i].types.length; b++){
                                if(results[0].address_components[i].types[b] === "administrative_area_level_1"){
                                    state = results[0].address_components[i].short_name;
                                }
                                if(results[0].address_components[i].types[b] === "locality"){
                                    city = results[0].address_components[i].short_name;
                                }
                            }
                        }
                    }
                    else{
                        alert("We cant find your location!")
                        return;
                    }
                    return {city, state}
                }).then(({city, state})=>{
                    console.log(`${city}, ${state}`);
                    if(!city || ! state){
                        setLocation("");
                        return;
                    }
                    setLocation(`${city}, ${state}`);
                }).catch(err=>{
                    console.log("Error in getting city: " + err);
                })
          
              });
              return;
          }
            alert("Make sure geolocation is allowed");
            console.log("Geolocation Not Available");
    }
    return <span name={name} className="current-location-button icon is-left" onClick={onClick}>
        <i title="Current Location" className="fas fa-crosshairs"/>
    </span>
}

export const GoogleSignIn = withFirebase(({firebase, setUser})=>{
    const signInWithGoogle = e =>{
        e.preventDefault();
        firebase.signInWithGooglePopup()
        .then(res=>{
            console.log("Successfully signed in with google popup")
            console.log(res);
            const {additionalUserInfo : {isNewUser, profile:{email, name, picture}}, user:{uid}} = res;
            firebase.auth.onAuthStateChanged(res)
            if(isNewUser){
                console.log(`
                From Firebase Signup: 
                    Name: ${name}
                    Email : ${email}
                    Picture: ${picture}
                    UID: ${uid}
                `);
                axios.post(`/api/v1/users`,{
                    authID: uid,
                    email,
                    name,
                    avatar: picture
                }).then((res)=>{
                    console.log(res);
                    // axios.get(`/api/v1/users/auth/${res.data.authID}`)
                }).catch(err=>{
                    console.log("Error signing user up in Fauna: " + err);
                })
            }
            axios
        .get(`/api/v1/users/auth/${uid}`)
        .then(({data})=>setUser({
            ownerID: data._id,
            name: data.name,
            email: data.email,
            localTo: data.localTo,
            role: data.role,
            softLocalTo: data.softLocalTo,
            avatar: (data.avatar && data.avatar.url) || "",
            handler: data.handle
        }))
        .then(()=>window.location.reload())
        .catch((err) => {
          console.log("Error in this spot");
          console.log(err);
        });
        })
        .catch(err=>{
            console.log("Error signing in with google popup: " + err)
        })
    }
    return <div className="button content is-fullwidth is-google" onClick={signInWithGoogle}>
                <span className="">
                    <span className="icon">
                        <i className="fab fa-google"/>
                    </span>
                    <span>Google</span>
                </span>
            </div>
})

export const DropdownTrigger = ({active, toggleActive})=>{
    return <div className="dropdown-trigger">
    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={()=>{toggleActive()}}>
      <span className="icon is-small">
        {active ? <i className="fas fa-times" aria-hidden="false"/> : <i className="fas fa-bars" aria-hidden="true"/>}
      </span>
    </button>
  </div>
}