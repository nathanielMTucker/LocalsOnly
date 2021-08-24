import React from "react";

const ServerError = ({status, message})=>{
  return (
    <article className="message is-danger">
      <section className="message-header">
        <p>{`Error ${status}: ${message}`}</p>
      </section>
    </article>
  )
}
const Error = props =>{
  <div className="error-screen">
    {props.children}
    <div className="error-message has-background-danger">
      This is an error message
    </div>
  </div>
}
export default Error;
export {
  ServerError
}