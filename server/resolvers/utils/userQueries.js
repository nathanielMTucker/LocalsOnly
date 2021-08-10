
const GET_USER_AUTH = `
query ($auth : String!) {
    userAuth(authID : $auth){
      name
      email
      localTo
      softLocalTo
      _id
      authID
      role
      avatar{
        url
      }
      handle
    }
  }
`
const GET_USER_BY_ID = `
query ($id : ID!) {
  findUserByID(id:$id){
    name
    email
    localTo
    softLocalTo
    _id
    authID
    role
    avatar{
      url
    }
  published{
    data{
      _id
      images(_size:1){
        data{
          url
        }
      }
      name
      description
      reviewCount
      rating
    }
  }
  }
}
`

const GET_USER_FOR_UPDATE = `
  query ($id : ID!){
    findUserByID(id:$id){
      name
      description
      city
      state
    }
  }
  `
const CREATE_USER = `
mutation($name : String!, $email : String!, $localTo : String, $role:Role $authID : String!, $birthday : BirthdayInput){
    createUser(data:{
    name : $name,
    email : $email,
    localTo : $localTo,
    role: $role,
    authID : $authID,
    birthday : $birthday
  }){
    _id
    email
  }
}
`

const GET_USER_OWNS = `
query($id:ID!){
  findUserByID(id:$id){
    published{
      data{
        _id
      }
    }
  }
}
`

const UPDATE_USER_OWNS = `
mutation($id : ID!, $data : [ID]){
  updateUser(id : $id, data : {published:{connect:$data}}){
    published{
      data{
        _id
      }
    }
  }
}
`

const GET_USER_BY_HANDLE = `
query($handle:String!){
  findUserByHandle(handle:$handle){
    _id
  }
}
`
module.exports = {
  GET_USER_BY_ID,
  GET_USER_AUTH,
  CREATE_USER,
  UPDATE_USER_OWNS,
  GET_USER_OWNS,
  GET_USER_FOR_UPDATE, 
  GET_USER_BY_HANDLE
}