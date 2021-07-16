import React, {useState} from 'react';

// const RemoveImage = ({images, removeImage}) =>
//     images.map((image, i) =>
//     <div key={i} className='fadein'>
//       <div 
//         onClick={() => removeImage(image.public_id)} 
//         className='delete'
//       >
//         <i className="far fa-times-circle fa-2x"></i>
//       </div>
//       <img src={image.secure_url} alt='' />
//     </div>
//   )


const ImageUpload = ({image, setImage, setLoading}) => {
    
    const uploadImage = async e =>{
        const files = e.target.files;
        for(let i = 0; i < files.length; i++){
            const form = new FormData();
            form.append('file', files);
            form.append('upload_preset', 'local_images');
            setLoading(true);

            const res = await fetch(" https://api.cloudinary.com/v1_1/dpjlvg7ql/image/upload", {
                method:"POST",
                body:form
            });

            const file = await res.json();

            console.log(file);
            const image_name = file.secure_url.split('locals/')[1]
            setImage([...image, image_name]);
        }
        setLoading(false);
    }
    return (
        <div className="file has-name is-boxed">
            <label className="file-label">
            <input type="file" name="file" id="image_files" placeholder="No images selected" onChange={uploadImage} hidden/>
                <span className="file-cta">
                    <span className="file-icon">
                        <i className="fas fa-upload"></i>
                    </span>
                    <button className="file-label is-loading">
                        Choose a file…
                    </button>
                </span>
                <span className="file-name">
                Screen Shot 2017-07-29 at 15.54.25.png
                </span>
            </label>
        </div>
    )
}

const ImageUploadPopup = ({local, user})=>{

    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState([]);

    const addPhoto=e=>{
        e.preventDefault();
        const form = document.getElementById("image-form")
        form.style.display = "block"
        // const dimmer = document.createElement("div");
        // dimmer.style.width =  window.innerWidth + 'px';
        // dimmer.style.height = window.innerHeight + 'px';
        // dimmer.className = 'dimmer';
        // dimmer.onclick = function(){
        //     document.body.removeChild(this);   
        //     form.style.display = "none"
        // }
            
        // document.body.appendChild(dimmer);
    }
    const getImagesFromUser = ( e)=>{
        e.preventDefault();
        const {target:{files}} = e;
        setImages([...images, ...files]);
        // if(images && images.length > 0){
            
        //     console.log(images);
        // }
    }

    const uploadImages = e =>{
        e.preventDefault();
        console.log(images);
    }

    const closeForm=e=>{
        e.preventDefault();
        document.getElementById("image-form").style.display = "none"
        setImages([]);
        // document.getElementsByClassName("dimmer").remove();
    }

    return (
        <section>
            <button className="button is-outlined" onClick={addPhoto}>Add photos</button>
            <div className="form-popup" id="image-form">
                <form onSubmit={uploadImages} className="form-container">
                    <input type="file" multiple onChange={getImagesFromUser}/>
                    <button type="submit" className="button">Upload</button>
                    <button type="submit" className="button cancel" onClick={closeForm}>Cancel</button>
                </form>
            </div>
        </section>
    )
}

export default ImageUpload;
export {
    ImageUploadPopup
}