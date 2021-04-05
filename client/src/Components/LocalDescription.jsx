import React from 'react'
import Rating from '@material-ui/lab/Rating'
import { withStyles } from '@material-ui/core/styles';
const IOM = require('../img/LocalsOnly.png')
const Dollar = withStyles({

})(Rating)
export default ({item})=>{
    const getImage = ()=>{
        if(item.images && item.images.length > 0){
            return `https://res.cloudinary.com/dpjlvg7ql/image/upload/v1615148804/locals/${item.images[0]}`
        }
        else return IOM
    }
    return (
        <div id="local-desctiption">
            <article className="media is-hidden-mobile">
                <div className="media-left">
                    <figure className="image is-128x128">
                        <img src={getImage()} alt={item.name}/>
                    </figure>
                </div>
                <div className="media-content ">
                    <div className="content">
                        <p>
                            <strong>{item.name}</strong>
                            <br/>
                            {item.description}
                        </p>
                    </div>
                    <div className="column">
                                <h1 className="subtitle">Rating</h1>
                                <Rating readOnly name="read-only" value={item.rating}/>
                        </div>
                        <div className="column">
                        <h1 className="subtitle">Price</h1>
                            
                            <Dollar readOnly value={item.price} icon={<i className="fas fa-dollar-sign"></i>}/>
                        </div>
                </div>
            </article>
            <article className="container is-hidden-desktop">
                <figure className="image has-text-centered">
                    <img src="https://bulma.io/images/placeholders/128x128.png" alt={item.name}/>
                </figure>
                <div className="content has-text-centered">
                        <p>
                            <strong>{item.name}</strong>
                            <br/>
                            {item.description}
                        </p>
                    </div>
            </article>
        </div>
    )
}
