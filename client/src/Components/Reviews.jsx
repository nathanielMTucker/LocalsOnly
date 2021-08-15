import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Picture from '../Components/Picture';
import { CloudinaryContext} from 'cloudinary-react'
import {withUser} from '../User';
import Rating from '@material-ui/lab/Rating'
import {StarRating} from './Results';
import {ServerError} from "./Error";
import UserTag from "./UserTag";

const Review = withUser(({localID, user : {ownerID : userID}, userIsLocal}) => {
    
    const [reviews, setReviews] = useState([]);
    const [offset, setOffset] = useState(null);
    const [limit] = useState(5);

    const getReviews = ()=>{
        axios.get(`/api/v1/reviews?id=${localID}&user=${userID}&limit=${limit}${offset ? `&offset=${offset}` : ''}`)
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
    },[setReviews, localID, userID])

    const displayReviews = ()=>{
        console.log(reviews);
        return reviews && reviews.map((review)=>{
            return <ReviewCard review={review} user={userID}/>
        })
    }
    const onClickShowMore = e =>{
        e.preventDefault();
        getReviews();
    }
    return (
        <section>
            {userIsLocal && <Post localID={localID} userID={userID}/>}
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

    },[setActive, upvoteUsers, user, setUpvote])

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

    return <article className="media is-clipped" key={review._id}>
    <figure className="media-left">
       <p className="image is-64x64">
            {
                review.reviewer.avatar === null ? <img src="https://bulma.io/images/placeholders/128x128.png" alt="User"/>:
                <CloudinaryContext cloudName={"dpjlvg7ql"} secure={false} upload_preset="avatar_images">
                    <Picture id={review.reviewer.avatar.url} preset="avatar_images"/>
                </CloudinaryContext>
            }
       </p>
    </figure>
    <div className="media-content">
      <div className="content">
        <p>
          <strong>{review.reviewer.name} </strong><UserTag tag={review.reviewer.role}/><br/>@{review.reviewer.handle}
          
          <br/>
          <div className="container pt-2"><small><StarRating rating={review.rating}/></small>
          {review.review}</div>
         </p>
      </div>
      <nav className="is-mobile">
        <div className="buttons are-small ">
          <button className={`button is-success  ${active}`} onClick={onLike}>
            <span className="icon is-medium pl-1"><i className={`far fa-thumbs-up ${upvote > 0 && "mr-1"}`}></i><div className="mr-1"><p>{upvote > 0 ? upvote : null}</p></div></span>
          </button>
        </div>
      </nav>
    </div>
    <div id="error-popup" onClick={removeError}>
        <ServerError status={error && error.status} message={error.message}/>
    </div>
  </article>
}

export default Review;