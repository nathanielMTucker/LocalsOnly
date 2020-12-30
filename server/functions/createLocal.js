const {CREATE_LOCAL} = require('./utils/localQueries');
const sendQuery = require('./utils/sendQueries');
const response = require('./utils/response');
const router = require('express').Router();

router.route('/createLocal').post(async (req, res)=>{

    const {owner, address, details, hours, coors} = req.body;
    
    const searchTags = [...details.tags, address.name];
    
    const variables = {
        name : address.name,
        description : details.description,
        website : address.web,
        city : address.city.toLowerCase(),
        searchTags : searchTags,
        phoneNumber : address.tel,
        state : address.state.toLowerCase(),
        geo : {
            lat : String(coors.lat),
            lng : String(coors.lng)
        },
        price : Number(details.price),
        hours : hours,
        rating : Number(details.rating),
        localsOnly : details.localsOnly,
        address : {
            street : address.street,
            apt : address.apt,
            city : address.city.toLowerCase(),
            state : address.state.toLowerCase(),
            zip : address.zip
        },
        quick : {
            dogFriendly: details.dog,
            twentyOnePlus: details.adult,
            takeout: details.takeout,
            familyFriendly: details.family,
            dineIn: details.dinein,
            delivery: details.delivery,
        },
        owner : owner,
        reviewCount : 1,
        hashtags : details.tags
    };
    
    try {        
        const {createLocal: createdLocal} = await sendQuery(CREATE_LOCAL, variables);
        res.status(200).json(createdLocal)
    }catch(err){
        console.error(err);
        return response(500, {err : 'Something went wrong'});
    }
})

module.exports = router;