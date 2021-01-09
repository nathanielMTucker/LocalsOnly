const {GET_USER} = require('./utils/userQueries');
const sendQuery = require('./utils/sendQueries');
const response = require('./utils/response');
const router = require('express').Router();

router.route('/getUser').get(async (req, res)=>{
    console.log("Authenticating User");
    try {        
        const {auth} = req.query
       
        const {userAuth} = await sendQuery(GET_USER, {auth})
       
        res.status(200).json(userAuth)
        
    }catch(err){
        console.error(err);
        return response(500, {err : 'Something went wrong'});
    }
});

module.exports = router