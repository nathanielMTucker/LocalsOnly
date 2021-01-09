const {CREATE_USER} = require('./utils/userQueries');
const sendQuery = require('./utils/sendQueries');
const response = require('./utils/response');
const router = require('express').Router();

router.route('/createUser').post(async (req, res)=>{
    console.log(req.body);
    
    const {authID, email, name, localTo, birthday} = req.body;
    
    const variables = {
        name : name,
        email : email,
        localTo : localTo,
        authID : authID,
        birthday : birthday
    }
    try {        
        const {createUser: createdUser} = await sendQuery(CREATE_USER, variables);
        res.status(200).json(createdUser);
    }catch(err){
        console.error(err);
        return response(500, {err : 'Something went wrong'});
    }
});

module.exports = router;
