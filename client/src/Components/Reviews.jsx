import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {withUser} from '../User';
import Rating from '@material-ui/lab/Rating'
import {StarRating} from './Results';
import {ServerError} from "./Error";
import UserCard from './UserCard';

const Review = withUser(({localID, user, userIsLocal}) => {
    
    const [reviews, setReviews] = useState([]);
    const [offset, setOffset] = useState(null);
    const [limit] = useState(5);

    const getReviews = ()=>{
        axios.get(`/api/v1/reviews?id=${localID}&user=${user.getID()}&limit=${limit}${offset ? `&offset=${offset}` : ''}`)
        .then(({data:{total, findLocalByID:{reviews:{after, data}}}})=>{
            setReviews(rev=>[...rev, ...data]);
            setOffset(after)
        })
        .catch(err=>{
            console.log(err);
        })
    }
    useEffect(() =>{
        getReviews();
    },[setReviews, localID, user])

    const displayReviews = ()=>{
        console.log(reviews);
        return reviews && reviews.map((review, i)=>{
            return <ReviewCard key={i} review={review} user={user.getID()}/>
        })
    }
    const onClickShowMore = e =>{
        e.preventDefault();
        getReviews();
    }
    return (
        <section>
            {userIsLocal && <Post localID={localID} userID={user.getID()}/>}
            <div className="reviews">{reviews ? displayReviews():"is Loading"}</div>
            {offset && <div className="text-has-line my-5 is-clickable" onClick={onClickShowMore}><span>show more</span></div>}
        </section>
    )
})

const Post = ({userID, localID})=>{ 
    const [isLoading, setIsLoading] = useState("");
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");

    const onRating = (e)=>{
        e.preventDefault();
        setRating(e.target.value);
    }

    const onComment = e => {
        e.preventDefault();
        setComment(e.target.value);
    }

    const onSubmit = e =>{
        e.preventDefault();
        console.log(rating);
        console.log(comment);
        console.log(userID);
        console.log(localID);
        setIsLoading("is-loading")
        axios.post('/api/v1/reviews',{
            local:localID,
            reviewer:userID,
            rating: parseFloat(rating),
            review:comment
        }).then(res=>{
            setIsLoading(null);
            setRating(1);
            setComment(null)
        }).catch(err=>{
            console.log(err);
        })
    }

    return  ( 
            <form className="field comment-post" onSubmit={onSubmit}>
                <Rating name="rating" value={rating} onChange={onRating}/>
                <div className={`control ${isLoading}`}>
                    <textarea placeholder="What are your thoughts?" className="textarea" name="comment" id="comment" cols="10" rows="5" onChange={onComment}/>
                </div>
                <button className="button is-success is-pulled-right mt-1" type="submit">Submit</button>
            </form>
        
    )
}

const ReviewCard = ({review, user}) =>{
    const [upvoteUsers, setUpvoteUsers] = useState(review.userUpvoted)
    const [upvote, setUpvote] = useState(review.upvote);
    const [active, setActive] = useState("is-light");
    const [error, setError] = useState({});
    useEffect(()=>{
        console.dir(upvoteUsers);
        if(review && upvoteUsers === true){
            setActive("")
        }

    },[setActive, upvoteUsers, user, setUpvote, review])

    const removeError = e =>{
        e.preventDefault();
        document.getElementById("error-popup").style.display = "none"
    }

    const onLike = e =>{
        e.preventDefault();
        const like = ()=>{
            setUpvote(upvote+1)
            setActive("")
            setUpvoteUsers(true);
        }
        const unlike = () =>{
            setUpvote(upvote <= 0 ? 0 : upvote - 1)
            setActive("is-light");
            setUpvoteUsers(false);
        }
        if(upvoteUsers){
            unlike();
            axios.delete(`/api/v1/review/${review._id}/user/${user}/unlike`)
            .then(({data:{upvote:newUpvote, userUpvoted:newUpvoteUsers}})=>{
                setUpvote(newUpvote);
                console.log("Unliked: " + newUpvoteUsers);
                setUpvoteUsers(newUpvoteUsers);
            }).catch(err=>{
                console.dir(err);
                document.getElementById("error-popup").style.display = "block";
                setError({status:err.response.status,message:err.response.statusText})
                like();
            })
            return
        }
        if(!upvoteUsers){
            like();
            axios.post(`/api/v1/review/${review._id}/like`,{
                user
            }).then(res=>{
                return res;
            }).then(({data:{upvote:newUpvote, userUpvoted:newUpvoteUsers}})=>{
                setUpvote(newUpvote);
                console.log("Liked: " + newUpvoteUsers);
                setUpvoteUsers(newUpvoteUsers);
            }).catch(err=>{
                console.dir(err);
                unlike();
            })
        }
        
    }

    return <UserCard sm avatar={review.reviewer.avatar.data[0].url} name={review.reviewer.name} role={review.reviewer.role} handle={review.reviewer.handle}>
        <div className="container content pt-2">
            <StarRating rating={review.rating}/>
            <p>
            {review.review}
            </p>
        </div>
        <nav className="is-mobile">
            <div className="buttons are-small ">
                <button className={`button is-success  ${active}`} onClick={onLike}>
                    <span className="icon is-medium pl-1"><i className={`far fa-thumbs-up ${upvote > 0 && "mr-1"}`}></i><div className="mr-1"><p>{upvote > 0 ? upvote : null}</p></div></span>
                </button>
            </div>
       </nav>
    </UserCard>
}

export default Review;