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
  query($id:ID!, $offset:String, $limit:Int!){
    findLocalByID(id:$id){
      reviews(_size:$limit, _cursor:$offset){
        after
        data{
          _id
          local{
            city
            state
          }
          reviewer{
            _id
            name
            avatar{
              data{
                url
              }
            }
            handle
            role
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

const GET_REVIEW_FROM_LOCAL_BY_ID = (request)=>`
    query($id:ID!){
      findReviewByID(id:$id){
        ${
          (request===null || request===undefined || request==="" || request===" ")?
          "upvote":
          request.replace(/,/g,"\n").replace(/{/g, "{\n").replace(/}/g, "\n}").replace("upvote", "")
        }
      }
    }
  `

module.exports = {
  CREATE_REVIEW,
  GET_LOCAL_REVIEWS,
  UPDATE_UPVOTE_LIKED,
  UPDATE_UPVOTE_UNLIKED,
  GET_REVIEW_FROM_LOCAL_BY_ID
}