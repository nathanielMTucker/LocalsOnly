const {CREATE_USER,UPDATE_USER, GET_USER_FOR_UPDATE,GET_USER_BY_ID,GET_USER_AUTH,GET_USER_BY_HANDLE} = require('./utils/userQueries');
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
    try {
        
        const {fields} = req.query
        const {userID:id} = req.params
        // console.log(id);
        const {userAuth} = await sendQuery(GET_USER_AUTH, {auth:id})
        // console.dir(userAuth)
        res.status(200).json(userAuth)
        
    }catch(err){
        console.error(err);
        return response(500, {err : 'Something went wrong'});
    }
});


router.route('/users').post(async (req, res)=>{
    const {authID, email, name, localTo, birthday, avatar} = req.body;
    
    const variables = {
        name,
        email,
        localTo,
        role : "USER",
        authID,
        birthday
    }
    try {        
        const {createUser: createdUser} = await sendQuery(CREATE_USER, variables);
        // console.log(createdUser);
        // if(avatar && createdUser){
        //     const {createAvatar} = await sendQuery(CONNECT_AVATAR_TO_USER, {user:createdUser.userID,url:avatar})
        // }
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
        mutation($id:ID!, $avatar:String){
            updateUser(id:$id, data:{
                avatar:{
                    create:{
                        user:{
                            connect:$user
                        },
                        url:$name
                    }
                }    
            }){
                avatar{
                    url
                }
          }
        }
        `, {id,avatar})
    }catch(err){
        
    }
})

router.route('/users/:user/local-to').patch(async (req,res)=>{
    try{
        const {user:id} = req.params
        let {city,state} = req.body;
        const localTo = state.toLowerCase() + ":" + city.toLowerCase()
        const {updateUser} = await sendQuery(`
        mutation($id:ID!, $localTo:String){
            updateUser(id:$id, data:{
                localTo:$localTo    
          }){
            localTo
          }
        }
        `, {id,localTo})
    }catch(err){
        
    }
})
module.exports = router;
