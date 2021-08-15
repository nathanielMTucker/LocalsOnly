const sendQuery = require('./utils/sendQueries');
const express = require('express');
// const { CONNECT_IMAGE_TO_LOCAL_USER, GET_IMAGES_WITH_USER_BY_LOCAL, CONNECT_AVATAR_TO_USER } = require("./utils/imageQueries");
const router = express.Router();

router.route("/feedback").post((req, res)=>{
  const {message, rating} = req.body;

  const {createFeedback} = sendQuery(`
  mutation($message:String, $rating:Int){
    createFeedback(data:{message:$message, rating:$rating}){
      _id
    }
  }
  `, {message, rating:Number(rating)})

  res.status(200).json(createFeedback);
})

module.exports = router