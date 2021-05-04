import React, {useState, useEffect} from 'react'
import axios from 'axios';
import queryString from 'query-string';
import {compose} from 'recompose';
import {withUser} from '../User';

export default props => {
    
    useEffect(() =>{
        const {id : localID} = queryString.parse(props.location);
        console.log(localID);
    })
    const displayReviews = ()=>{
        return <ReviewCard/>
    }

    return (
        <div>
            <Post/>
            {displayReviews()}
        </div>
    )
}

const Post = ()=>{ 
    const [isLoading, setIsLoading] = useState("");
    const [isLocal, setIsLocal] = useState(true);

    return  ( 
        
            isLocal && 
            <div className="field comment-post">
                <div className={`control ${isLoading}`}>
                    <textarea className="textarea is-small" name="comment" id="comment" cols="30" rows="10"></textarea>
                </div>
            </div>
        
    )
}

const ReviewCard = props =>{
    return <div></div>
}