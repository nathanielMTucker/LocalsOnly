function userLiked(reviews, user){
  reviews.forEach(review=>{
    // if(review.reviewer._id === user){
    //   review.userUpvoted = false;
    //   return;
    // }
    review.userUpvoted.data.find(({_id})=>{
      if(_id===user){
        review.userUpvoted = true;
        return;
      }
      review.userUpvoted = false
    }
    )
    
  })
}

module.exports = {
  userLiked
}