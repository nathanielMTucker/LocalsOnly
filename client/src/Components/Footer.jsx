import React, {useState} from "react";
import {Link} from 'react-router-dom';
const Footer = ()=>{
  const [feedback, setFeedback] = useState("");
  const onChangeFeedback = e =>{
          e.preventDefault();
          setFeedback(e.target.value);
  }
  const sendFeedback = e=>{
          e.preventDefault();
          console.log(feedback);
  }
  return (
    <footer className="footer columns">
      <section className="column"></section>
        <section className="column is-2">
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
                  <a href="https://www.facebook.com" className="content icon-text">
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
                  <a href="https://www.twitter.com" className="content icon-text">
                    <span className="icon has-text-white">
                      <i className="fab fa-large fa-twitter"/>
                    </span>
                    <span>twitter</span>
                  </a>
                </li>
            </ul>
          </article>
          <div className="">
            <a href="https://bulma.io">
              <img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="150" height="48"/>
            </a>
          </div>
        </section>
        <section className="column is-2">
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
          
        </section>
        <section className="column is-3">
                <h1 className="title has-text-white">Feedback</h1>
                <form className="form" onSubmit={sendFeedback}>
                        
                        <div className="field">
                                <div className="control">
                                <textarea className="textarea" type="text" name="feedback" value={feedback} onChange={onChangeFeedback}/>
                                </div>
                        </div>
                        <div className="control">
                        <button className="button is-outlined is-white" type="submit">Submit</button>
                        </div>
                </form>
        </section>
        <section className="column"></section>
    </footer>
  )
}

export default Footer;