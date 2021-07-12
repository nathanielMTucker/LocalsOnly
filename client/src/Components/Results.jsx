import React from 'react'
const IOM = require('../img/LocalsOnly.png')
const Results = ({loading, children, className})=> {
    return (
        <div className={className}>
            
            {loading? <div className="loading has-text-centered">
                <div className="animate__slower animate__animated animate__pulse animate__infinite"><img alt="LocalsOnly" src={IOM}></img></div>
                <p>Wait while we search</p>
            </div>:
            children}
        </div>
    )
}

const StarRating = ({rating}) => {
    
    const tmp = rating - 0.5;
    let isHalf = false;
    if(tmp === Math.floor(rating)){
        isHalf = true;
    }
    let unrated;
    if(isHalf){
        unrated = 4 - tmp;
        rating = rating - 1;
    }else{
        unrated = 5 - rating;
    }
    
    const ratingElm = [];
    
    for(let i = 0; i < rating; i++) ratingElm.push("fas fa-star")
    
    if(isHalf){
        ratingElm.push("fas fa-star-half-alt")
    }
    
    for(let i = 0; i < unrated; i++) ratingElm.push("far fa-star")
    
    return (ratingElm.map((star)=>
        <i className={`${star} has-text-success`}/>
    ))
}

export default Results;
export {
    StarRating
};