import React from 'react'
import {withUser} from '../User';

// const gabe = require("./gabe.jpeg")

export default withUser( USER=>{

    const creator = (name, image, detail)=>(
        <div className="column is-3">
<div className="card">
  <div className="card-image">
    <figure className="image is-4by3">
      <img src={image} alt={`Locals Only Content Creator ${name}`}/>
    </figure>
  </div>
  <div className="card-content">
    <div className="media">
      {/* <div className="media-left">
        <figure className="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
        </figure>
      </div> */}
      <div className="media-content">
        <p className="title is-4">{name}</p>
        {/* <p className="subtitle is-6">@johnsmith</p> */}
      </div>
    </div>

    <div className="content">
      {detail} 
      {/* <a>@bulmaio</a>. */}
      {/* <a href="#">#css</a> <a href="#">#responsive</a> */}
      {/* <br/> */}
      {/* <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> */}
    </div>
  </div>
</div>
</div>
    )

    return (
        <div id="home">
            {/* <article  style={{
                textAlign: "center"
            }}>
                <h1 className="title">Welcome to</h1> <br/>
                <div className="homelogo">
                    <img src="../LocalsOnly.png" alt="localsonly"/>
                </div>
                 <br/>
                <h2 className="subtitle">
                    a business and location directory <br/> focused on the locals!    
                </h2> 
            </article>
            <h1 className="title">
                    Why this?
                </h1>
            <article className="why is-size-5">
                <p>Locals Only is a business directory where the locals post, rate and review
                anything from businesses to parks, trails, districts and everything in between.
                Locals are able to make the decision to make a place viewed only by other locals. 
                With a focus on the local community, you can create a place to encourage and inspire
                others to get back to their community. This place are fo those who love farmers markets,
                small businesses  and connecting with those down the street.
                </p>
            </article>
            <h1 className="title mt-1">
                Who made this?
            </h1>
            <article className="who columns">
                {creator("Nathaniel Tucker", null, "Owner of the website")}
            </article>
            <footer>
                This is the footer
            </footer> */}
        </div>
    )
    
})