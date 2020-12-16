const {CREATE_USER} = require('./utils/userQueries');
const sendQuery = require('./utils/sendQueries');
const response = require('./utils/response');

exports.handler = async (event)=>{
    
    const {authID, email, name, localTo, birthday} = JSON.parse(event.body);
    
    const variables = {
        name : name,
        email : email,
        localTo : localTo,
        authID : authID,
        birthday : birthday
    }
    try {        
        const {createUser: createdUser} = await sendQuery(CREATE_USER, variables);
        return response(200, createdUser);
    }catch(err){
        console.error(err);
        return response(500, {err : 'Something went wrong'});
    }
}
