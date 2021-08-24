import React from 'react';
import {withUser} from '../User';

const DevTag = () => 
<span className="ml-1 tag is-info is-light">
      <i className="fas fa-tools pr-1 mr-1 my-0"/> <p>Dev</p>
  </span>


const BetaTag = () => 
<span className="tag is-link is-light">
      <i className="fas fa-flask pr-1 mr-1 my-0"/> Beta
</span>


const PremiumTag = () =>
<span className="tag is-warning is-light">
<i className="fas fa-gem pr-1 mr-1 my-0"/> Premium
</span>



const CEOTag = () =>
<span className="tag is-danger is-light ">
<i className="fas fa-crown pr-1 mr-1 my-0"/> <p className="content">Founder</p>
</span>

const UserTag = withUser(({user, role})=>{
  const r = role || user.getRole();
  
  console.log(r);
  if(r === "CEO"){
    return <CEOTag/>
  }
  if(r === "admin"){
    return <DevTag/>
  }
  if(r === "ebet"){
    return <BetaTag/>
  }
  if(r === "prem"){
    return <PremiumTag/>
  }
  return null;
})

const UserTagAnimate = ()=>
<span className="animate-tag">
  <UserTag/>
</span>

export default UserTag

export {
  DevTag,
  BetaTag,
  PremiumTag,
  CEOTag,
  UserTagAnimate
}