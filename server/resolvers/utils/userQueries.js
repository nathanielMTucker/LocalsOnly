
const GET_USER = `
query ($auth : String!) {
    userAuth(authID : $auth){
      name
      email
      localTo
      softLocalTo
      _id
      authID
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
    owns
  }
}
`

const UPDATE_USER_OWNS = `
mutation($id : ID!, $data : UserInput!){
  updateUser(id : $id, data : $data){
    owns
  }
}
`
module.exports = {
  GET_USER,
  CREATE_USER,
  UPDATE_USER_OWNS,
  GET_USER_OWNS,
}