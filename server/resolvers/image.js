const sendQuery = require('./utils/sendQueries');
const express = require('express');
const { CONNECT_IMAGE_TO_LOCAL_USER, GET_IMAGES_WITH_USER_BY_LOCAL } = require("./utils/imageQueries");
const router = express.Router();

const uploadImages = async (images, local, user, review, description)=>
await images.forEach( async url=>
    await sendQuery(CONNECT_IMAGE_TO_LOCAL_USER, {
      user,local,url,description
    })
  )


router.post("/images/locals/:localID/users/:userID",async (req,res)=>{
  const {localID,userID} = req.params;
  const {images, description} = req.body;
  console.log(localID)
  console.log(userID);
  console.dir(images);
  
  try{
    const im = await uploadImages(images, localID, userID, null, description);
  
    console.dir(im);
  }catch(err){
    console.error(err);
    res.status(500);
  }

  res.status(200);
})

router.post("/images/locals/:localID/users/:userID/reviews/:reviewID",async (req,res)=>{
  const {localID,userID,reviewID} = req.params;
  const {images, description} = req.body;

  const im = uploadImages(images, localID, userID, reviewID, description);

  res.status(200);
})

module.exports = router;