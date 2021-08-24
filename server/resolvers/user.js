const {CREATE_USER,UPDATE_USER, GET_USER_FOR_UPDATE,GET_USER_BY_ID,GET_USER_AUTH,GET_USER_BY_HANDLE,USERS_LOCALS} = require('./utils/userQueries');
const sendQuery = require('./utils/sendQueries');
const response = require('./utils/response');
const router = require('express').Router();
const {CONNECT_AVATAR_TO_USER} = require('./utils/imageQueries');

router.route('/users').get(async (req, res)=>{
    const {id} = req.query;

    try{
        const {findUserByID} = await sendQuery(GET_USER_BY_ID, {id})
        res.status(200).json(findUserByID);
    }catch(err){
        console.dir("wabba:"+err);
        res.status(err.status).json(findUserByID);
    }
})

router.route('/users/auth/:userID').get(async (req, res)=>{
    console.log("hello");
    try {
        
        const {fields} = req.query
        const {userID:auth} = req.params
        // console.log(auth);
        const {userAuth} = await sendQuery(GET_USER_AUTH, {auth})
        // console.dir(userAuth)
        res.status(200).json(userAuth)
        
    }catch(err){
        console.error(err);
        return response(500, {err : 'Something went wrong'});
    }
});


router.route('/users').post(async (req, res)=>{
    const {authID, email, name, localTo, promo} = req.body;
    let role = "USER"
    if(prop === "TuckerSentMe"){
        role = "EBETA"
    }

    const variables = {
        name,
        email,
        localTo,
        authID,
        role
    }
    try {        
        const {createUser: createdUser} = await sendQuery(CREATE_USER, variables);
        res.status(200).json(createdUser);
    }catch(err){
        console.error(err);
        return response(500, {err : 'Something went wrong'});
    }
});

router.route('/users/handles/:handle').get(async (req, res)=>{
    const {handle} = req.params;
    console.log(handle);

    try{
        const {findUserByHandle} = await sendQuery(GET_USER_BY_HANDLE, {handle})
        console.dir("Handle: "+findUserByHandle);
        if(findUserByHandle === null){
            res.status(200).json({message:"Handle is available"});
        }else{
            res.status(404).json({message:"Handle is unavailable"});
        }
    }catch(err){
        // res.status(500);
        console.log(err);
    }
})

router.route('/users/:user/email').patch(async (req,res)=>{
    try{
        const {user:id} = req.params
        const {email} = req.body;
        const {updateUser} = await sendQuery(`
        mutation($id:ID!, $email:String){
            updateUser(id:$id, data:{
                email:$email    
            }){
                email
            }
        }
        `, {id,email})
    }catch(err){

    }
})

router.route('/users/:user/name').patch(async (req,res)=>{
    try{
        const {user:id} = req.params
        const {name} = req.body;
        const {updateUser} = await sendQuery(`
        mutation($id:ID!, $name:String){
            updateUser(id:$id, data:{
                name:$name   
            }){
                name
            }
        }
        `, {id,name})
    }catch(err){
        
    }
})

router.route('/users/:user/handle').patch(async (req,res)=>{
    try{
        const {user:id} = req.params
        const {handle} = req.body;
        const {updateUser} = await sendQuery(`
        mutation($id:ID!, $handle:String){
            updateUser(id:$id, data:{
                handle:$handle    
            }){
                handle
            }
        }
        `, {id,handle})
    }catch(err){
        
    }
})

router.route('/users/:user/avatar').patch(async (req,res)=>{
    try{
        const {user:id} = req.params
        const {avatar} = req.body;
        const {updateUser} = await sendQuery(`
        mutation($id:ID!, $avatar:String!){
            updateUser(id:$id, data:{
                avatar:{
                    create:{
                        user:{
                            connect:$id
                        },
                        url:$avatar
                    }
                }    
            }){
                avatar{
                    data{
                        url
                      }
                }
          }
        }
        `, {id,avatar})
        res.status(200).json(updateUser)
    }catch(err){
        console.dir("In User Patch Avatar: " + err)
    }
})

router.route('/users/:user/local-to').patch(async (req,res)=>{
    console.log("Hello");
    try{
        const {user:id} = req.params
        let {city,state, localTo} = req.body;
        const lt = (state || city ? (state + ":" + city) : localTo).toLowerCase();
        console.log(lt);
        const {updateUser} = await sendQuery(`
        mutation($id:ID!, $localTo:String){
            updateUser(id:$id, data:{
                localTo:$localTo    
          }){
            localTo
          }
        }
        `, {id,localTo:lt})
        console.log(updateUser);
        res.status(200).json(updateUser)
    }catch(err){
        console.log(err);
    }
})


router.route('/users/locals').get(async (req, res)=>{
    let {id, fields, offset, limit} = req.query;
    console.log(id);
    try { 
        let {findUserByID} = await sendQuery(USERS_LOCALS, {
            id:id,
            limit:Number(limit),
            offset
        });
        const {published} = findUserByID
            res.status(200).json(published)
        

    }catch(err){
        console.error(err);
        res.status(500).json({err : 'Something went wrong'})
    }
});
module.exports = router;
