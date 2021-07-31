const {CREATE_USER,UPDATE_USER, GET_USER_FOR_UPDATE,GET_USER_BY_ID,GET_USER_AUTH} = require('./utils/userQueries');
const sendQuery = require('./utils/sendQueries');
const response = require('./utils/response');
const router = require('express').Router();

const names = ["name", "email", "localTo"];

router.route('/users').get(async (req, res)=>{
    
})

router.route('/users/auth/:userID').get(async (req, res)=>{
    try {
        
        const {fields} = req.query
        const {userID:id} = req.params
        // console.log(id);
        const {userAuth} = await sendQuery(GET_USER_AUTH, {auth:id})
        console.dir(userAuth)
        res.status(200).json(userAuth)
        
    }catch(err){
        console.error(err);
        return response(500, {err : 'Something went wrong'});
    }
});

router.route('/users/:userID').patch(async (req, res)=>{
    
    const {userID:id} = req.params;
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
        res.status(200).json(userAuth)
    }catch(err){
        console.error(err);
        return response(500, {err : 'Something went wrong'});
    }
});
router.route('/users').post(async (req, res)=>{
    const {authID, email, name, localTo, birthday} = req.body;
    
    const variables = {
        name : name,
        email : email,
        localTo : localTo,
        role : "USER",
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
