import React, {useState, useEffect} from 'react'

const Home = ()=>{
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = ()=>{setWidth(window.innerWidth)}
  useEffect(()=>{
   
    window.addEventListener('resize', updateDimensions)
   
    return function cleanup(){
      window.removeEventListener('resize', updateDimensions)
    };
  },[]);
  const isMobile = () => (width < 769)
  return <main id="home"  className={`content is-medium my-6 ${isMobile() && "mx-0"}`}>
    
    <section className="columns is-centered">
      <div className="column">
        <section id="greeting ">
          <h1 className="title   has-text-centered" >
            Hey! Welcome to
          </h1>
          <div className={`home-page-image has-text-centered ${isMobile() && "full-width"}`}>
            <img src="./LocalsOnly.png" alt="LocalsOnly"/>
          </div>
          <h2 className="subtitle has-text-centered">
          A place for locals by locals
          </h2>
        </section>

        <section id="what" className="column section">
          
          <h1 className="title is-large has-text-info has-text-centered"  style={{fontFamily:"Satisfy"}}>What is this?</h1>
          <div className="container">
          <p>
            This place is all about you and your community. At LocalsOnly we believe that your voice is the most important
            when it comes to your home. Whether you are born and raised or just moved to town; we want to from hear you. In this place,
            only the locals can post. That post can be your favorite ramen shop, a hiking trail, music venue; anything you want.
            Better yet; if there is a place you do not want someone just passing through town to see, you can mark it locals only!
            We want to help you make your small businesses, your get-togethers, your parks, your everything in the community better.
          {/* LocalsOnly is a place to let your community come alive. Here; locals are the ones who post, comment, and rate.
          Anyone who is not local to the area is on a "read-only" mode. If there is a place you want only other locals to be
          see then you have the option to mark a place locals only.
          We are focused on the community you live in. 
          We want you to use this place to get out and get back to your community.
          We promote small business */}
          </p>
          </div>
          
        </section>

        {/* <section id="who" className="column  section "> */}
          
          <h1 className="title has-text-info has-text-centered">Get back to community.</h1>
          {/* <div className="container">
          <p>
          
          </p>
          </div> */}
         
        {/* </section> */}

      </div>
    </section>
        <section id="call-to-action" className="section">
          
          
          <div className="container notification is-warning">
          <h1 className="title is-2 has-text-centered">
            We Need Feedback!
          </h1>
          <h2 className="subtitle is-4 has-text-centered">This is a new site and we are excited to see it develop and grow,<br/> but we need your help!</h2>
          <p>
          <strong>Please</strong>, during this time add your favorite spots. Whether that is your go to coffee shop or where you meet your friends for lunch.
          Maybe even little hideaways, like a park, forest or waterhole. You decide what goes on here and if people local to your area get to see it or not!
          So please, add places, provide feedback, break the site.
          </p>
          </div>
          
          
        </section>
  </main>
}
export default Home;
    
