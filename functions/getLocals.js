const {GET_LOCALS_WHAT_AND_WHERE, QUICK_LOOK_LOCAL} = require('./utils/localQueries');
const sendQuery = require('./utils/sendQueries');
const response = require('./utils/response');

exports.handler = async (event)=>{
    try {        
        const {what, where} = event.queryStringParameters
        console.log(what);
        console.log(where);
        const query = what !== 'all' ? GET_LOCALS_WHAT_AND_WHERE : QUICK_LOOK_LOCAL;
        const variables = what !== 'all' ? {
            searchTags : [""],
            addressTags : ["tempe", "az"]
        } : {
            city : "tempe",
            state : "az"
        }
        const res = await sendQuery(query, variables);
        const data = res.localByLocation.data
        console.log(data);
        return response(200, data);
    }catch(err){
        console.error(err);
        return response(500, {err : 'Something went wrong'});
    }
};