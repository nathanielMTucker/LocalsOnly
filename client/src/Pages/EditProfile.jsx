import React, {useState, useEffect, useCallback} from 'react';
import {ImageProfileForm} from '../Components/ImageForm';
import axios from 'axios';
import { withUser } from '../User'
import { withFirebase } from '../Authentication';
import {Link} from 'react-router-dom';
import useToggle from "../Components/useHooks/useToggle"

const EditProfile = withFirebase(withUser(({history, firebase, user})=>{
  let [state, city] = user.localTo.split(':');

  const [handleBeingChecked, setHandleBeingChecked] = useState(false);
  const [handleIsAvailable, setHandleIsAvailable] = useState(true);

  const [passwordVisible, togglePasswordVisible] = useToggle(false);
  
  const [image, setImage] = useState({});

  const [profile, setProfile] = useState({
    name: user.name || "",
    email: user.email || "",
    handler: user.handler || "",
    city: city.charAt(0).toUpperCase() + city.slice(1) || "",
    state: state.toUpperCase() || "",
    avatar: user.avatar || "",
    oldPassword: "",
    newPassword: "",
  })

  const checkHandler = useCallback(
    async ()=>{
      setHandleBeingChecked(true);
      // console.log("handler has been checked");
      if(profile.handler.includes(" ")|| profile.handler === "" || profile.handler.length < 4){
        return setHandleIsAvailable(false);
      }
      if(profile.handler === user.handler){
        return setHandleIsAvailable(true);
      }
      // console.log(profile.handler);
      await axios.get(`/api/v1/users/handles/${profile.handler}`)
      .then(res=>{
        console.dir(res);
        return setHandleIsAvailable(true);
      })
      .catch(err=>{
        console.log("In Handle Check: " + err);
        return setHandleIsAvailable(false);
      })
      
    }
  ,[profile.handler, user.handler])


  useEffect(()=>{
    
    if(profile.handler !== user.handler){ 
       checkHandler().then(()=>setHandleBeingChecked(false))
    }
    
  }, [checkHandler, profile.handler, user.handler])

  const uploadImages = async () => {
    // e.preventDefault();
    console.log(image);
    
    const form = new FormData();

    const imageURLs = async () =>{
      form.append('file', image);
      form.append('upload_preset', `avatar_images`);
      
      return await fetch(`https://api.cloudinary.com/v1_1/dpjlvg7ql/image/upload`, {
        method:"POST",
        body:form
      }).then(res=>res.json())
      .then(file=>{
        const id = file.public_id
        console.log(id);
        return id;
      })
    }
    return await Promise.all(imageURLs)
  };
  

  const updateProfile = async (e) =>{
    e.preventDefault();

    // if(user.email !== profile.email){
    //   await firebase.updateEmail(profile.email)
    //   .then(async _ =>{
    //     console.log("Email updated");
    //     await axios.patch(`/api/v1/users/${user.ownerID}/email`,{
    //       email:profile.email
    //     })
    //   })
    //   .catch(err=>{
    //     console.log("Error updating email from edit user page");
    //     console.dir(err)
    //   })
      
    // }

    // if(user.name !== profile.name){
    //   await axios.patch(`/api/v1/users/${user.ownerID}/name`,{
    //     name:profile.name
    //   })
    // }

    // if(user.handler !== profile.handler){
    //   await axios.patch(`/api/v1/users/${user.ownerID}/handle`,{
    //     handle:profile.handler
    //   })
    // }

    if(profile.newPassword.length >= 6 && profile.newPassword !== profile.oldPassword ){
      console.log("Changing password");
      const credentials = firebase.emailCredentials(profile.email, profile.oldPassword);
      await firebase.reauth(credentials)
      .then(res=>{
        // console.dir(res);
        console.log("Re-authenticated");
        firebase.updatePassword(profile.newPassword)
        .then(res=>{
          console.log("New password set");
        })
        .catch(err=>{
          console.log("Error setting new password: " + err);
        })
      })
      .catch(console.dir)
      
    }

    // if(user.avatar !== profile.avatar){
    //   uploadImages().then(async avatar=>{
    //     await axios.patch(`/api/v1/users/${user.ownerID}/avatar`,{
    //       avatar
    //     })
    //   })
      
    // }
    
    // if(profile.state.toLowerCase() !== state.toLowerCase() || profile.city.toLowerCase() !== city.toLowerCase()){
    //   await axios.patch(`/api/v1/users/${user.ownerID}/local-to`,{
    //     city:profile.city.toLowerCase(),
    //     state:profile.state.toLowerCase()
    //   })
    // }

    // alert("Your profile has been updated!")
    // history.push("/dashboard")

  }
  const HandleCheckIcon = ()=>{
    if(handleBeingChecked === true) 
      return <span className="icon is-small is-right has-text-info">
        <i className="fas fa-circle-notch fa-pulse"/>
      </span>

    if(handleIsAvailable) 
      return <span className="icon is-small is-right has-text-success">
        <i className="fas fa-check"/>
      </span>
    
     return <span className="icon is-small is-right has-text-danger">
        <i className="fas fa-times"/>
      </span>
    
  }
  const onChange = e =>{
    e.preventDefault();
    let {name, value} = e.target;
    if(name === "password") setProfile({...profile, [name]:value.replace(" ", "")})
    else setProfile({...profile, [name]:value})
    // console.log(`onChange ${name}: ${value}`)
  }

  return <main id="avatar-upload-page" className="section mt-4 container">
        <form onSubmit={updateProfile} className="">
    <section className="section container box columns">
    <div className="column">
        <ImageProfileForm setImage={setImage}/>
      </div>
      <div className="column">

          <div className="field">
            <label htmlFor="name">Name</label>
            <div className="control has-icons-left">
              <input type="text" name="name" value={profile.name} className="input" onChange={onChange} required/>
              <span className="icon is-small is-left">
                <i className="fas fa-user"/>
              </span>
            </div>
          </div>

          <div className="field">
            <label htmlFor="handler">Handler</label>
            <div className="control has-icons-left has-icons-right">
              <input type="text" name="handler" value={profile.handler} className="input" onChange={onChange} minLength={4} required/>
              <span className="icon is-small is-left">
                <i className="fas fa-at"/>
              </span>
              <HandleCheckIcon/>
              
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <div className="control has-icons-left">
              <input type="text" name="email" value={profile.email} className="input" onChange={onChange} required/>
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"/>
              </span>
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">Old Password</label>
            <div className="control has-icons-left has-icons-right">
              <input type={passwordVisible ? "text" : "password"} name="oldPassword" value={profile.oldPassword} className="input" onChange={onChange}/>
              <span className="icon is-small is-left">
                <i className="fas fa-key"/>
              </span>
              <span className="icon password-visible-icon is-small is-right" onClick={togglePasswordVisible}>
                {
                  !passwordVisible ? <i className="fas fa-eye-slash"/> : <i className="fas fa-eye"/>
                }
              </span>
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">New Password</label>
            <div className="control has-icons-left has-icons-right">
              <input type={passwordVisible ? "text" : "password"} autoComplete="new-password" name="newPassword" value={profile.newPassword} className="input" onChange={onChange}/>
              <span className="icon is-small is-left">
                <i className="fas fa-key"/>
              </span>
              <span className="icon password-visible-icon is-small is-right" onClick={togglePasswordVisible}>
                {
                  !passwordVisible ? <i className="fas fa-eye-slash"/> : <i className="fas fa-eye"/>
                }
              </span>
            </div>
          </div>

            <label htmlFor="local">Local</label>
          <div className="field">
            <div name="local" className="control">
              <input type="text" name="city" value={profile.city} className="input" onChange={onChange} required/>
            </div>
              <div className="control">
              <input type="text" name="state" value={profile.state} className="input" onChange={onChange} required minLength={2} maxLength={2}/>
              </div>
          </div>
          <div className="buttons">
            <button className="button is-success" disabled={!handleIsAvailable}>Submit</button>
            <Link className="button is-danger" to="/dashboard">Cancel</Link>
          </div>
      </div>
    </section>
        </form>
  </main>
}))

export default EditProfile;