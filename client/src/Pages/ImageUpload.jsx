import React from "react";
import queryString from 'query-string';
import ImageForm from "../Components/ImageForm";
import axios from "axios";
import { withUser } from '../User'

const ImageUpload = withUser(({user, location : {search}})=>{

  const {id:localID, name} = queryString.parse(search);
  
  const uploadURLs = async (imageIDs)=>{
    console.dir(imageIDs)
    await axios.post(`/api/v1/images/locals/${localID}/users/${user.getID()}`,{
      images:imageIDs
    }).then(res=>{
      console.log(res.status);
    }).catch(err=>{

    })
  }

  return <main id="image-upload-page" className="section content">
    <section className="box section container">
      <p className="title">
        Upload Images: {name}
      </p>
      <ImageForm folder={"local"} multiple={true} callback={uploadURLs}/>
    </section>
  </main>
})

export default ImageUpload;