
const CONNECT_IMAGE_TO_LOCAL_USER = `
mutation($user:ID!, $local:ID!, $url:String!, $description:String){
  createImage(data:{
    user:{connect:$user},
    local:{connect:$local},
    url:$url,
    description:$description
  }){
    _id
  }
}
`
const CONNECT_AVATAR_TO_USER = `
mutation($user:ID!, $url:String!){
  createAvatar(data:{
    user:{connect:$user},
    url:$url
  }){
    _id
  }
}
`

const GET_IMAGES_WITH_USER_BY_LOCAL = `
query($local:ID!){
  findLocalByID(id:$local){
    images{
      data{
        url
        description
        user{
          _id
        }
      }
    }
  }
}
`

const GET_IMAGES_BY_USER = `
query($user:ID!){
  findUserByID(id:$user){
    images{
      data{
        url
        description
      }
    }
  }
}
`
module.exports = {
  CONNECT_IMAGE_TO_LOCAL_USER,
  GET_IMAGES_WITH_USER_BY_LOCAL,
  CONNECT_AVATAR_TO_USER
}