const sendQuery = require('./utils/sendQueries');
const router = require('express').Router();
const {CREATE_REVIEW, UPDATE_UPVOTE_LIKED, UPDATE_UPVOTE_UNLIKED} = require('./utils/reviewQueries');
const {GET_LOCAL_RATING, UPDATE_LOCAL_RATING} = require('./utils/localQueries');

router.route('/createReview').post(async (req, res)=>{
  
  const {local, reviewer, review, rating} = req.body;

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
router.route('/reviewLiked').post(async (req,res)=>{
  const {reviewID, upvote:oldUpvote, user} = req.body;

  
  const {updateReview:upvote} = await sendQuery(UPDATE_UPVOTE_LIKED, {review:reviewID, user, upvote:oldUpvote+1})

  console.log("User Liked: "+upvote.upvote);
  const response = {
    upvote:upvote.upvote,
    userUpvoted: true
  }
  res.status(200).json(response);
})

router.route('/reviewUnliked').post(async (req,res)=>{
  const {reviewID, upvote:oldUpvote, user} = req.body;

  
  const {updateReview:upvote} = await sendQuery(UPDATE_UPVOTE_UNLIKED, {review:reviewID, user, upvote:oldUpvote <= 0 ? 0 : oldUpvote-1})

  console.log("User Unliked: "+upvote.upvote);
  const response = {
    upvote:upvote.upvote,
    userUpvoted: false
  }
  res.status(200).json(response);
})
module.exports = router;