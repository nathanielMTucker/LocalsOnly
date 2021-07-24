import React  from 'react';
import {Link} from 'react-router-dom';
import {StarRating} from '../Results';
import './ResultsCard.scss';
// import Footer from './Footer';
import Picture from "../Picture";
const ResultsCard = props => 
{
    const isNull = el => el ? el : "null" 
        
    const Price = () =>{
        const { price } = props;
        
        return ([...Array(price).keys()].map(()=>
            <i className="fas fa-dollar-sign has-text-success is-size-5"/>
        ))
    }
    
    const MainImage = () =>
        <Picture id={props.image.url} preset="local_images"/>
    

    return (
        <Link id={props.id} className="box" to={`/local?id=${props.id}`}>
            <section className="columns">
            <span className="column is-4">
                <figure className="image">
                    {props.image === undefined ? <img src="./LocalsOnly.png"/> : <MainImage/>}
                </figure>
            </span>
            <article className="column">
                <div className="content">
                    <h1>{props.name}</h1>
                    
                        <div className="level-left">
                            <StarRating className="level-item" rating={props.rating}/>
                            <div className="level-item">
                                {`${props.reviewCount} review${props.reviewCount === 1 ? '' : 's'}`}
                            </div> 
                            <div className="level-item">
                                <Price/>
                            </div>
                        </div>
                    <div>{props.hours.isClosed ? <p className="has-text-danger">closed</p> : <p><span className="has-text-success">open</span> {props.hours.from} - {props.hours.to}</p>}</div>
                </div>
                <span className="block">
                    {props.description}
                    <div className="content">
                        hello
                    </div>
                </span>
            </article>
            </section>
        </Link>
    )
}

export default ResultsCard;