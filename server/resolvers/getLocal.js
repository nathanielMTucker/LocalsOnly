const {GET_LOCALS_BY_ID} = require('./utils/localQueries');
const sendQuery = require('./utils/sendQueries');
const response = require('./utils/response');
const router = require('express').Router();

router.route('/getLocal').get(async (req, res)=>{
    try {        
        const {id} = req.query
        const {findLocalByID} = await sendQuery(GET_LOCALS_BY_ID, {id:id});
        res.status(200).json(findLocalByID)
    }catch(err){
        console.error(err);
        return response(500, {err : 'Something went wrong'});
    }
});

module.exports = router;