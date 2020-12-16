const {GET_LOCALS_BY_ID} = require('./utils/localQueries');
const sendQuery = require('./utils/sendQueries');
const response = require('./utils/response');

exports.handler = async (event)=>{
    try {        
        const {id} = event.queryStringParameters;

        console.log(id);
        const res = await sendQuery(GET_LOCALS_BY_ID, {id:id});
        const data = res.findLocalByID;
        console.log(data);
        return response(200, data);
    }catch(err){
        console.error(err);
        return response(500, {err : 'Something went wrong'});
    }
};