const sendQuery = require('./utils/sendQueries');
const router = require('express').Router();

const {
  CREATE_REVIEW, 
  UPDATE_UPVOTE_LIKED, 
  UPDATE_UPVOTE_UNLIKED,
  GET_LOCAL_REVIEWS,
  GET_REVIEW_FROM_LOCAL_BY_ID 
} = require('./utils/reviewQueries');

const {
  GET_LOCAL_RATING, 
  UPDATE_LOCAL_RATING
} = require('./utils/localQueries');


const {
  userLiked
} = require('./utils/reviews');

router.route('/reviews').get(async (req, res)=>{
  
  const {id:localID, user, fields, offset, limit} = req.query;

  const {
      findLocalByID:{
        reviews:{
          data:reviews
        }
      }
  } = await sendQuery(
    GET_LOCAL_REVIEWS,
    {
      localID
    }
  );

  userLiked(reviews, user);

  const reviewData = {
    reviews,
    total:reviews.length
  }
  res.status(200).json(reviewData)
})

router.route('/reviews').post(async (req, res)=>{
  
  const {local, reviewer, review, rating, fields} = req.body;

  const {createReview : reviewID} = await sendQuery(
    CREATE_REVIEW, 
    {
      local, 
      reviewer, 
      review, 
      rating
    }
  );

  
  res.status(200)
  .json(reviewID)

  const {findLocalByID:{rating:currentRating, reviewCount}} = await sendQuery(GET_LOCAL_RATING,{
    id:local
  })

 console.log(reviewCount);
  const newRating = (currentRating + rating) / 2

  const rounded = (Math.round(newRating * 2)/2).toFixed(1);

  const {updateLocal} = await sendQuery(UPDATE_LOCAL_RATING, {id:local, rating:parseFloat(rounded), reviewCount:reviewCount+1})
  console.log(updateLocal);

})
router.route('/review/:reviewID/like').post(async (req,res)=>{
  try{
    const {user} = req.body;
    const {reviewID} = req.params;
    const {fields} = req.query;
    const {findReviewByID} = await sendQuery(GET_REVIEW_FROM_LOCAL_BY_ID(fields), {id:reviewID});
    console.dir(findReviewByID);
    const {upvote:oldUpvote} = findReviewByID;
    const {updateReview:{upvote}} = await sendQuery(UPDATE_UPVOTE_LIKED, {review:reviewID, user, upvote:oldUpvote+1})
    console.table([user, reviewID, oldUpvote])
    console.log("User Liked: "+upvote);
    const response = {
      upvote,
      userUpvoted: true
    }
    res.status(200).json(response);
  }catch(e){
    console.error(e);
    res.status(500).json(e.message);
  }
})

router.route('/review/:reviewID/user/:userID/unlike').delete(async (req,res)=>{
  try{
  const {reviewID, userID:user} = req.params;
  const {fields} = req.query;
  const {findReviewByID:{upvote:oldUpvote}} = await sendQuery(GET_REVIEW_FROM_LOCAL_BY_ID(fields), {id:reviewID});
  console.table([user, reviewID, oldUpvote])
  const {updateReview:{upvote}} = await sendQuery(UPDATE_UPVOTE_UNLIKED, {review:reviewID, user, upvote:oldUpvote <= 0 ? 0 : oldUpvote-1})

  console.log("User Unliked: "+upvote);
  const response = {
    upvote,
    userUpvoted: false
  }
  res.status(200).json(response);
  }catch(e){
    console.error(e);
    console.dir(e);
    res.status(500).json(e.message)
  }
})

module.exports = router;