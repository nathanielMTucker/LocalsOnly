const {UPDATE_USER, GET_USER_FOR_UPDATE} = require('./utils/userQueries');
const sendQuery = require('./utils/sendQueries');
const response = require('./utils/response');
const router = require('express').Router();

const names = ["name", "email", "localTo"];

router.route('/updateUser').put(async (req, res)=>{
    
    const {id} = req.body;
    try {        
        const {findUserByID} = await sendQuery(GET_USER_FOR_UPDATE, {id})
        let updatedValue;
        names.forEach(name=>{
            if(req.body[name] !== findUserByID[name]){
                if(updatedValue === undefined){
                    updatedValue = `\"${name}\" : \"${req.body[name]}\",`
                }
               else updatedValue += `\"${name}\" : \"${req.body[name]}\",`                
            }
        })        

        console.log(updatedValue);
        updatedValue = JSON.parse({updatedValue});
        console.log(updateValue);
        // res.status(200).json(userAuth)
    }catch(err){
        console.error(err);
        return response(500, {err : 'Something went wrong'});
    }
});

module.exports = router