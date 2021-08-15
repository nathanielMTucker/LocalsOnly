function userLiked(reviews, user){
  console.dir(reviews)
  reviews.map(review=>{
    review.userUpvoted.data.map(upvote=>{
      // console.log(user);
      console.log(upvote);
      // console.log(review.reviewer._id);
      if(upvote._id===user || review.reviewer._id !== user){
        review.userUpvoted = true
      }
      else review.userUpvoted = false
      console.log(review.userUpvoted);
    })
  })
}

module.exports = {
  userLiked
}