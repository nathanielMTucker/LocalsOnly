const {CREATE_LOCAL, UPDATE_USER_OWNS, GET_USER_OWNS} = require('./utils/localQueries');
const sendQuery = require('./utils/sendQueries');
const router = require('express').Router();

router.route('/createLocal').post(async (req, res)=>{
            
            const {owner : id, address, details, hours, coors} = req.body;
            
            
            let variables = {
                name : address.name,
                description : details.description,
                website : address.web,
                city : address.city.toLowerCase(),
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
                owner : id,
                reviewCount : 1,
                hashtags : details.tags
        };
    
        try {        
                // const {createLocal: createdLocal} = await sendQuery(CREATE_LOCAL, variables);
                // console.log(createdLocal);
                // const {_id} = createdLocal;
                console.log(id);
                const {findUserByID} = await sendQuery(GET_USER_OWNS, {id});
                console.log(findUserByID);
                // res.status(200).json(createdLocal);
                
        }catch(err){
            console.error(err);
            return {err:'Something went wrong'}
        }
    }
)

module.exports = router;