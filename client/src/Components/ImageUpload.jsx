import React from 'react';

export default ({image, setImage, setLoading}) => {
    
    const uploadImage = async e =>{
        const files = e.target.files;
        for(let i = 0; i < files.length; i++){
            const form = new FormData();
            form.append('file', files[0]);
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
