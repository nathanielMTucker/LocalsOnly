const axios = require('axios');
const {environment} = require("../../config");

module.exports = async (query, variables)=>{
    const {data : {data, errors}} = await axios({
        url: `https://graphql.fauna.com/graphql`,
        method: 'POST',
        headers:{
            "content-type" : "application/json",
            Authorization: `Bearer ${environment().database}`
        },
        data:{
            query,
            variables
        }
    });
    if(errors){
        console.dir(errors);
        throw new Error("Something went wrong");
    }
    return data;
}