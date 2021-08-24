import React, {useEffect} from "react";
import Picture from "./Picture";
import { CloudinaryContext } from "cloudinary-react";

const Avatar = ({avatar}) =>{

  // useEffect(()=>{
  //   if(!avatar){
  //     const da = document.getElementById("avatar-background")
  //   const rand = Math.round(Math.random(16) * 20) 
  //   let color = `hsl(${rand}, 100%, 75%)`;
  //   da.style.fill = color;
  //   }
  // },[avatar])

  const DefaultAvatar = ()=>(
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="default-avatar" clipPath="url(#clip0)">
        <g id="background">
          <rect id="avatar-background" width="500" height="500" rx="36" fill={`hsl(${Math.floor(Math.random() * 18) * 20 }, 100%, 75%)`}/>
        </g>
        <g id="person">
          <circle id="avatar-head" cx="250" cy="167" r="115" fill="white"/>
          <path id="avatar-body" d="M475 445C475 414.5 451.295 385.249 409.099 363.683C366.903 342.116 309.674 330 250 330C190.326 330 133.097 342.116 90.901 363.683C48.7053 385.249 25 414.5 25 445L250 445H475Z" fill="white"/>
        </g>
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="500" height="500" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )

  return (
    <div className="avatar">
      {
        avatar ? (
          <CloudinaryContext cloudName={"dpjlvg7ql"} secure={false} upload_preset="avatar_images">
                <Picture id={avatar} preset="avatar_images"/>
            </CloudinaryContext>
            ):
            <DefaultAvatar/>
      }
    </div>
    
  )

}

export default Avatar;