import React from 'react'

export default props=>{
    return (
        <div id="local-desctiption">
            <article className="media is-hidden-mobile">
                <div className="media-left">
                    <figure className="image is-128x128">
                        <img src="https://bulma.io/images/placeholders/128x128.png" alt={props.item.name}/>
                    </figure>
                </div>
                <div className="media-content ">
                    <div className="content">
                        <p>
                            <strong>{props.item.name}</strong>
                            <br/>
                            {props.item.description}
                        </p>
                    </div>
                </div>
            </article>
            <article className="container is-hidden-desktop">
                <figure className="image has-text-centered">
                    <img src="https://bulma.io/images/placeholders/128x128.png" alt={props.item.name}/>
                </figure>
                <div className="content has-text-centered">
                        <p>
                            <strong>{props.item.name}</strong>
                            <br/>
                            {props.item.description}
                        </p>
                    </div>
            </article>
        </div>
    )
}
