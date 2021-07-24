import React from 'react'
import {Link} from 'react-router-dom';
import {StarRating} from '../Results';

// const IOM = require('./LocalsOnly.png')
const Header = props => {
    // const getImage = ()=>{
    //     if(item.images && item.images.length > 0){
    //         return 
    //     }
    //     else return IOM
    // }
    return (
        <>
        <article className="is-flex is-hidden-mobile">
            
            <div className="media-content">
                <div className="content">
                    <p>
                        <strong>{props.name}</strong>
                        <br/>
                        {props.description}
                    </p>
                </div>
                <section className="level content">
                    <div className="level-left">
                        <div className="icon has-text-info">
                            <div className=""><StarRating rating={props.rating}/></div>
                            <div className="">{`${props.reviewCount} review${props.reviewCount === 1 ? '' : 's'}`}</div> 
                        </div>
                        
                    </div>
                </section>
            </div>
            <div className="media-right">
                <Link className="content row button is-primary is-outlined" to={`/local?id=${props.id}`}>View</Link>
            </div>
        </article>
        <Link className="is-hidden-tablet" to={`/local?id=${props.id}`}>
            <div className="columns is-mobile">
                <div className="column">
                    <figure className="image is-96x96">
                        <img src={props.image} alt="LocalsOnly"/>
                    </figure>
                </div>
            </div>
            <p>
                <strong>{props.name}</strong>
                <br/>
                {props.description}
            </p>
        </Link>
        </>
    )
}

export default Header;