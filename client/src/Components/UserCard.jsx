import React, {useEffect} from 'react';
import Avatar from './Avatar';
import UserTag from './UserTag';

const LargeUserCard = props =>
<article className="media is-clipped">
    <figure className="media-left">
       <p className="image is-128x128">
            <Avatar avatar={props.avatar}/>
       </p>
    </figure>
    <div className="media-content">
      <div className="content">
          <span className="title">{props.name} </span><UserTag tag={props.role}/><br/>@{props.handle}
          <br/>    
      </div>
      {props.children}
    </div>
    </article>


const SmallUserCard = props =>
<article className="media is-clipped">
    <figure className="media-left">
       <p className="image is-64x64">
            <Avatar avatar={props.avatar}/>
       </p>
    </figure>
    <div className="media-content">
      <div className="content">
          <strong>{props.name} </strong><UserTag tag={props.role}/><br/>@{props.handle}
          <br/>    
      </div>
      {props.children}
    </div>
    </article>


const UserCard = (props)=>{
  
  return props.sm ? <SmallUserCard {...props}>{props.children}</SmallUserCard> : <LargeUserCard {...props}>{props.children}</LargeUserCard>
}

export default UserCard;