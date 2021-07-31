import React, {useState, useEffect} from 'react';
import ImageForm from '../Components/ImageForm';
import axios from 'axios';
import { withUser } from '../User'
import {Link} from 'react-router-dom';

const EditProfile = withUser(({user})=>{
  
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    handler: user.handler
  })
  
  const uploadURLs = async (imageIDs)=>{
    console.dir(imageIDs)
    await axios.post(`/api/v1/images/users/${user.ownerID}`,{
      images:imageIDs
    }).then(res=>{
      console.log(res.status);
    }).catch(err=>{

    })
  }

  const updateProfile = async e =>{

  }

  const onChange = e =>{

  }

  return <main id="avatar-upload-page" className="section container">
    <section className="section container box columns">
      <div className="column">
        <form onSubmit={updateProfile} className="">

        <div className="field">
          <label htmlFor="name">Name</label>
          <div className="control has-icons-left">
            <input type="text" name="name" value={user.name} className="input" onChange={onChange}/>
            <span className="icon is-small is-left">
              <i className="fas fa-user"/>
            </span>
          </div>
        </div>

        <div className="field">
          <label htmlFor="handler">Handler</label>
          <div className="control has-icons-left">
            <input type="text" name="handler" value={user.handler} className="input" onChange={onChange}/>
            <span className="icon is-small is-left">
              <i className="fas fa-at"/>
            </span>
          </div>
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <div className="control has-icons-left">
            <input type="text" name="email" value={user.email} className="input" onChange={onChange}/>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"/>
            </span>
          </div>
        </div>

        <div className="buttons">
          <button className="button is-success">Submit</button>
          <Link className="button is-danger" to="/dashboard">Cancel</Link>
        </div>
        
        </form>
      </div>
      <div className="column">
        <ImageForm folder={"avatar"} multiple={false} callback={uploadURLs}/>
      </div>
    </section>
  </main>
})

export default EditProfile;