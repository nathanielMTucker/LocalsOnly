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

export {
  ServerError
}