import React, { useState } from "react";
import Picture from '../Components/Picture';
import { CloudinaryContext} from 'cloudinary-react'
import {withUser} from "../User";

const ImageForm = ({folder, multiple, callback}) => {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);

  const getImagesFromUser = e => {
    e.preventDefault();
    const {
      target: { files },
    } = e;
    if(multiple){
      setImages(currentImages=>[...currentImages, ...files]);
      return;
    }
    setImages([...files]);
  };

  const uploadImages = async e => {
    e.preventDefault();
    console.log(images);
    
    const form = new FormData();
    
    setUploading(true);

    const imageURLs = images.map(async image=>{
      form.append('file', image);
      form.append('upload_preset', `${folder}_images`);
      
      return await fetch(`https://api.cloudinary.com/v1_1/dpjlvg7ql/image/upload`, {
        method:"POST",
        body:form
      }).then(res=>res.json())
      .then(file=>{
        const id = file.public_id
        console.log(id);
        return id;
      })
    })
    const awaitURLs = await Promise.all(imageURLs)
    callback(awaitURLs)
    
    setUploading(false);
  };

  const closeForm = e => {
    e.preventDefault();
    setImages([]);
  };

  

  const DisplaySelectedImages = ({images, setImages}) =>{
    const removeImage = e =>{
      e.persist();
      const index = Number(e.target.id);
      console.log("Image name: " + index);
      const {name} = images[index];
      setImages(images.filter(image=>image.name !== name))
  }
  
    return <div className="tile is-ancestor">
        <div className="tile is-parent image-row">
            {images && images.map((image, index)=>(
                <div className="tile is-child image-item" key={index}>
                  <span className="is-small button is-inverted is-danger delete-image" title="Remove" id={index} onClick={removeImage}>
                    <i className="far fa-trash-alt"/>
                  </span>
                  <img src={URL.createObjectURL(image)} alt="Could not load"/>
                </div>
            ))}
        </div>
    </div>
}

  return (
    <form onSubmit={uploadImages} className="form-container">
      <div className="file is-centered is-boxed has-name">
        <label className="file-label">
          <input className="file-input" multiple={multiple} type="file" name="images" onChange={getImagesFromUser}/>
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-images"/>
            </span>
            <span className="file-label">
              Get images
            </span>
          </span>
        </label>
      </div>
      <div className="buttons is-centered section">
        <button type="submit" className="button is-success">
          Upload
        </button>
        <button type="submit" className="button is-danger" onClick={closeForm}>
          Remove all
        </button>
      </div>
      {uploading ? <div>Loading...</div> : <DisplaySelectedImages images={images} setImages={setImages}/>}
    </form>
  );
};

const ImageProfileForm = withUser(({user, setImage, image})=>{

  const getImagesFromUser = e => {
    e.preventDefault();
    const {
      target: { files },
    } = e;
    console.dir(files[0])
    setImage(files[0]);
  };

  const DisplaySelectedImages = ({images, setImages}) =>{
    const removeImage = e =>{
      setImage(null)
  }
  
    return  (
    <div className="tile is-child image-item">
      <span className="is-small button is-inverted is-danger delete-image" title="Remove" onClick={removeImage}>
        <i className="far fa-trash-alt"/>
      </span>
      <img src={URL.createObjectURL(image)} alt="Could not load"/>
    </div>
    )
    
}

  return (
    
      <div>
          <div className="file is-centered is-boxed has-name">
            <label className="file-label">
              <input className="file-input" src={"./LocalsOnly.png"} type="file" name="images" onChange={getImagesFromUser}/>
              <span className="image is-128x128">
              { 
                user.avatar === null ? <img src="https://bulma.io/images/placeholders/128x128.png" alt="User"/>:
                    <CloudinaryContext cloudName={"dpjlvg7ql"} secure={false} upload_preset="avatar_images">
                        <Picture id={user.avatar} preset="avatar_images"/>
                    </CloudinaryContext>
              }
              </span>
            </label>
          </div>
          {image && <DisplaySelectedImages/>}
      </div>
      
   
  );
})

export default ImageForm;

export {
  ImageProfileForm
}