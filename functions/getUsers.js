const {GET_USER} = require('./utils/userQueries');
const sendQuery = require('./utils/sendQueries');
const response = require('./utils/response');

exports.handler = async (event)=>{
    try {        
        const {auth} = event.queryStringParameters
        const variables = {auth : auth}
        const res = await sendQuery(GET_USER, variables);
        const data = res.userAuth;
        console.log(data);
        return response(200, data);
    }catch(err){
        console.error(err);
        return response(500, {err : 'Something went wrong'});
    }
};