import React from 'react'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

const Picture = ({id, preset}) => {
    
    return (
        <Image cloudName={"dpjlvg7ql"} publicId={id} secure={false} upload_preset={preset}>

        </Image>
        // <p>Hello</p>
    )
}

export default Picture;