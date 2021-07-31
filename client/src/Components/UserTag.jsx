import React from 'react';

const DevTag = () => 
<span className="ml-1 tag is-info is-light">
      <i className="fas fa-tools pr-1 mr-1 my-0"/> Dev
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
<span className="tag is-danger is-light">
<i className="fas fa-crown pr-1 mr-1 my-0"/> CEO
</span>



export {
  DevTag,
  BetaTag,
  PremiumTag,
  CEOTag
}