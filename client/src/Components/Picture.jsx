import React from 'react'
import {Image} from 'cloudinary-react';

const Picture = ({id}) => {
    
    return (
        <Image publicId={id}></Image>
    )
}

export default Picture;