import React, {useState, useEffect} from 'react'
import axios from 'axios';
// import queryString from 'query-string';
// import {compose} from 'recompose';
import {withUser} from '../User';
import Rating from '@material-ui/lab/Rating'
import {StarRating} from './Results';

const Review = withUser(({localID, USER : {ownerID : userID}}) => {
    
    const [reviews, setReviews] = useState();

    useEffect(() =>{
        axios.get(`/api/getReviews?id=${localID}&user=${userID}`)
        .then(res=>{
            console.log(res.data);
            setReviews(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[setReviews, localID, userID])

    const displayReviews = ()=>{
        console.log(reviews);
        return reviews && reviews.map((review)=>{
            return <ReviewCard review={review} user={userID}/>
        })
    }

    return (
        <section>
            <Post localID={localID} userID={userID}/>
            {reviews ? displayReviews():"is Loading"}
        </section>
    )
})

const Post = ({userID, localID})=>{ 
    const [isLoading, setIsLoading] = useState("");
    const [isLocal, setIsLocal] = useState(true);
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
        axios.post('/api/createReview',{
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
        // setIsLoading("");
    }

    return  ( 
        
            isLocal && 
            <form className="field comment-post" onSubmit={onSubmit}>
                    <Rating name="rating" value={rating} onChange={onRating}/>
                <div className={`control ${isLoading}`}>
                    <textarea placeholder="What are your thoughts?" className="textarea" name="comment" id="comment" cols="10" rows="5" onChange={onComment}/>
                </div>
                
                    <button className="button is-pulled-right" type="submit">Submit</button>
                    
                    
                
            </form>
        
    )
}

const ReviewCard = ({review, user}) =>{
    const [upvoteUsers, setUpvoteUsers] = useState(review.userUpvoted)
    // console.log(upvoteUsers[0]._id + " === " + user);
    const [upvote, setUpvote] = useState(review.upvote);
    const [active, setActive] = useState("is-light");

    useEffect(()=>{
        console.log("upvoteUsers: " + upvoteUsers);
        if(upvoteUsers){
            setActive("")
        }

    },[setActive, upvoteUsers, user, setUpvote])

    // const onDislike = e =>{
    //     e.preventDefault();
    // }
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
            axios.post("/api/reviewUnliked",{
                reviewID:review._id,
                user,
                upvote
            }).then(({data:{upvote:newUpvote, userUpvoted:newUpvoteUsers}})=>{
                setUpvote(newUpvote);
                console.log("Unliked: " + newUpvoteUsers);
                setUpvoteUsers(newUpvoteUsers);
            }).catch(err=>{
                console.log(err);
                like();
            })
            return
        }
        if(!upvoteUsers){
            like();
        axios.post("/api/reviewLiked",{
            reviewID:review._id,
            user,
            upvote
        }).then(res=>{
            return res;
        }).then(({data:{upvote:newUpvote, userUpvoted:newUpvoteUsers}})=>{
            setUpvote(newUpvote);
            console.log("Liked: " + newUpvoteUsers);
            setUpvoteUsers(newUpvoteUsers);
        }).catch(err=>{
            console.log(err);
            unlike();
        })
        }
        
    }

    return <article className="media" key={review._id}>
    <figure className="media-left">
      <p className="image is-64x64">
        <img className="avatar" alt="user" src="https://bulma.io/images/placeholders/128x128.png"/>
      </p>
    </figure>
    <div className="media-content">
      <div className="content">
        <p>
          <strong>{review.reviewer.name}</strong> <small><StarRating rating={review.rating}/></small>
          
          <br/>
          {review.review}
         </p>
      </div>
      <nav className="is-mobile">
        <div className="buttons are-small ">
          <button className={`button is-success  ${active}`} onClick={onLike}>
            <span className="icon is-small "><div className="pr-1"><p>{upvote}</p></div><i className="far fa-thumbs-up ml-1"></i></span>
          </button>
          {/* <button className={`button is-danger  ${active}`} onClick={onDislike}>
            <span className="icon is-small "><div className="pr-1"><p>{upvote}</p></div><i className="far fa-thumbs-down ml-1"></i></span>
          </button> */}
        </div>
      </nav>
    </div>
  </article>
}

export default Review;