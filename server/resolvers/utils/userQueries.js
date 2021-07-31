
const GET_USER_AUTH = `
query ($auth : String!) {
    userAuth(authID : $auth){
      name
      email
      localTo
      softLocalTo
      _id
      authID
      avatar{
        url
      }
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
      avatar{
        url
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
mutation($name : String!, $email : String!, $localTo : String!, $authID : String!, $birthday : BirthdayInput){
    createUser(data:{
    name : $name,
    email : $email,
    localTo : $localTo,
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
    owns{
      data{
        _id
      }
    }
  }
}
`

const UPDATE_USER_OWNS = `
mutation($id : ID!, $data : [ID]){
  updateUser(id : $id, data : {owns:{connect:$data}}){
    owns{
      data{
        _id
      }
    }
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
  
}