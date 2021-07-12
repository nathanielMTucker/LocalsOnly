const CREATE_REVIEW = `
  mutation($local:ID!, $reviewer:ID!, $review:String, $rating:Float!){
    createReview(data:{
      local:{connect:$local}
      reviewer:{connect:$reviewer}
      review:$review
      rating:$rating
      actual:$rating
      upvote:0
      downvote:0
      shares:0
    }){
      _id
    }
  }
`

const GET_LOCAL_REVIEWS = `
  query($localID:ID!){
    findLocalByID(id:$localID){
      reviews{
        data{
          _id
          reviewer{
            _id
            name
          }
          review
          rating
          upvote
          downvote
          shares
          actual
          userUpvoted{
            data{
              _id
            }
            
          }
        }
      }
    }
  }
`

const UPDATE_UPVOTE_LIKED = `
mutation($review:ID!, $user:[ID!], $upvote:Int!){
  updateReview(id:$review, data:{
    userUpvoted:{
      connect:$user
    }, 
    upvote:$upvote
  }){
    upvote
  }
}
`
const UPDATE_UPVOTE_UNLIKED = `
mutation($user:[ID!],$review:ID!, $upvote:Int!){
  updateReview(id:$review, data:{
    userUpvoted:{
      disconnect:$user
    }, 
    upvote:$upvote
  }){
    upvote
  }
}
`
module.exports = {
  CREATE_REVIEW,
  GET_LOCAL_REVIEWS,
  UPDATE_UPVOTE_LIKED,
  UPDATE_UPVOTE_UNLIKED
}