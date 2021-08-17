import React, {useState, useEffect} from "react";
import useToggle from "./useHooks/useToggle";
import {Link} from 'react-router-dom';
import { SatisfactionScale } from "./Input";

const Footer = ()=>{
  const [feedback, setFeedback] = useState({
    message:"",
    rating:-1
  });
  const [sent, setSent] = useState(false);
  const [isLoading, toggleIsLoading] = useToggle();
  const onChangeFeedback = e =>{
          e.preventDefault();
          setFeedback({...feedback, message: e.target.value});
  }
  const sendFeedback = async e=>{
          e.preventDefault();
          const {message, rating} = feedback;         
          if(message.length > 0 || rating !== -1){
            await import('axios').then(axios=>{
              axios.post("/api/v1/feedback",{
                message,
                rating
              }).then(res=>{
                setSent(true);
                
              }).then(()=>{
                setTimeout(function(){setSent(false);}, 3000)
                clearTimeout();
              })
            })
          }
  }

  const satisfyScale = e=>{
    e.preventDefault();
    // console.log(e.target);
    const {parentElement} = e.target;
    // console.log(parentElement);
    parentElement.childNodes.forEach(child=>{
      // console.log(child.classList);
      if(child.classList.contains("fas")){
        child.classList.replace("fas", "far")
      }
    })
    e.target.classList.replace("far", "fas")
    setFeedback({...feedback, rating: e.target.id});
  }
  return (
    <footer className="footer">
      {/* <section className="column"></section> */}
        <div className="columns is-centered mb-0 mt-1">
        <section className="column is-2-desktop">
          <h1 className="title has-text-white">Get Involved</h1>
            <article className="content is-medium">
              <ul className="">
                <li>
                  <a href="https://discord.gg/dHBeyu5W6K" className="icon-text">
                    <span className="icon has-text-white">
                        <i className="fab fa-large fa-discord"/>
                    </span>
                    <span>discord</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/LocalsOnlyxyz-109680918086095" className="content icon-text">
                    <span className="icon has-text-white">
                      <i className="fab fa-large fa-facebook-square"/>
                    </span>
                    <span>facebook</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com" className="content icon-text">
                    <span className="icon has-text-white">
                      <i className="fab fa-large fa-instagram"/>
                    </span>
                    <span>instagram</span>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/localsonlyxyz" className="content icon-text">
                    <span className="icon has-text-white">
                      <i className="fab fa-large fa-twitter"/>
                    </span>
                    <span>twitter</span>
                  </a>
                </li>
            </ul>
          </article>
        </section>
        <section className="column is-2-desktop">
        <h1 className="title has-text-white">Links</h1>
          <article className="">
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/dashboard">dashboard</Link>
            </li>
            <li>
              <Link to="/create-local">create new local</Link>
            </li>
            <li>
              <Link to="/terms-services">terms & services</Link>
            </li>
            <li>
              <Link to="/privacy-policy">privacy policy</Link>
            </li>
          </ul>
          </article>
          {/* <div className="is-hidden-mobile section pb-0 pt-0 has-text-centered">

          <a href="https://bulma.io">
              <img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="150" height="48"/>
            </a>
          <span className="icon-text ">Made with<span className="icon"><i className="fas fa-heart has-text-danger"/></span> in Tempe, AZ</span>
          </div> */}
        </section>
        <section className="column is-3-desktop">
                <h1 className="title has-text-white mb-1">Feedback</h1>
                <form className="form" onSubmit={sendFeedback}>
                        
                        <div className="field">
                                <div className="control">
                                <textarea className="textarea" type="text" name="feedback" value={feedback.message} onChange={onChangeFeedback}/>
                                </div>
                        </div>
                        <div className="control level">
                        <SatisfactionScale onClick={satisfyScale}/>
                        <button className={`button is-outlined is-white ${isLoading && "is-loading"}`} type="submit">{sent ? 
                          <div className="icon is-large px-6"><i className="fas fa-check has-text-success pr-1"/> Thank you</div>
                        :"Submit"}</button>
                        </div>
                </form>
        </section>
        </div>
        {/* <section className="column"></section> */}
        <div className="level is-mobile is-hidden-desktop section pt-0 pb-3 container">
            <div className="level-item">
            <a href="https://bulma.io">
              <img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="150" height="48"/>
            </a>
          <span className="icon-text pl-2">Made with<span className="icon"><i className="fas fa-heart has-text-danger"/></span> in Tempe, AZ</span>
            </div>
          </div>
    </footer>
  )
}

export default Footer;