import React from 'react'
import {Image} from 'cloudinary-react';

const Picture = ({id, preset}) => {
    
    return (
        <Image publicId={id}>

        </Image>
        // <p>Hello</p>
    )
}

export default Picture;