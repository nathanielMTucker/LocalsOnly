import React from 'react'
import useDeviceDetect from "../Components/useHooks/useDeviceDetect";

const Home = ()=>{
  
  
  const { isMobile } = useDeviceDetect();
  return <main id="home"  className={`content is-medium my-6 ${isMobile && "mx-0"}`}>
    
    <section className="columns is-centered">
      <div className="column">
        <section id="greeting ">
          <h1 className="title   has-text-centered" >
            Hey! Welcome to
          </h1>
          <div className={`home-page-image has-text-centered ${isMobile && "full-width"}`}>
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

        <section id="who" className="section">
          <h1 className="title is-large has-text-info has-text-centered"  style={{fontFamily:"Satisfy"}}>What's next?</h1>
          <div className="">
            <h2 className="subtitle is-3">Getting around the site</h2>
          <p>
          I am sure you have noticed already, the site is still new and not too much to do yet. But that will soon change!
          There are 4 main buttons that you will see up top in the navigation bar.</p>
          <div className="mx-0 px-0">
            <ul>
              <li className="no-dot mx-0 ">
                <span className={`${!isMobile && "icon-text"}`}>
                  <span className="icon">
                    <i className="fas fa-search mx-0 "/>
                  </span>
                  <span>Use this to search through the various places that have been posted by other locals</span>
                </span>
              </li>
              <li className="no-dot">
                <span className={`${!isMobile && "icon-text"}`}>
                  <span className="icon">
                    <i className="fas fa-plus-circle"/>
                  </span>
                  <span>Go here to add a new place for others to see</span>
                </span>
              </li>
              <li className="no-dot">
                <span className={`${!isMobile && "icon-text"}`}>
                  <span className="icon">
                  <i className="fas fa-user-astronaut"/>
                  </span>
                  <span>Check out your account details and update your info</span>
                </span>
              </li>
              <li className="no-dot">
                <span className={`${!isMobile && "icon-text"}`}>
                  <span className="icon">
                  <i className="fas fa-door-open"/>
                  </span>
                  <span>Done with looking around the site? Make sure you sign-out</span>
                </span>
              </li>
            </ul>
            <p>Go ahead and make a search or add a few of your favorite spots! If you have any issues or would
              like to add any kind of comment, there is always a feedback form at the bottom of each page
            </p>
          </div>
          </div>
         
        </section>

      </div>
    </section>
        <section id="call-to-action" className="section">
          
          
        <h1 className="title has-text-info has-text-centered">Bring back community.</h1>
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
    
