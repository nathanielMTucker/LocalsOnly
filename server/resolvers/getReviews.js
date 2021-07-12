const sendQuery = require('./utils/sendQueries');
const router = require('express').Router();
const {GET_LOCAL_REVIEWS} = require('./utils/reviewQueries');
const {userLiked} = require('./utils/reviews');

router.route('/getReviews').get(async (req, res)=>{
  
  const {id:localID, user} = req.query;

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


  res.status(200).json(reviews)
})

module.exports = router;