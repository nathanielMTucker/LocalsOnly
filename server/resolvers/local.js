const { 
    CREATE_LOCAL, 
    GET_LOCALS_BY_ID,
    QUICK_LOOK_LOCAL
} = require('./utils/localQueries');

const {
    UPDATE_USER_OWNS
} = require('./utils/userQueries');

const sendQuery = require('./utils/sendQueries');
const router = require('express').Router();
const response = require('./utils/response');

const ABBRS = [
    "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS",
    "KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY",
    "NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV",
    "WI","WY","DC"
]

const STATES = [
    "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
    "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana",
    "Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana",
    "Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
    "Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee",
    "Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming","District of Columbia"  
]

const getAbbrs = state=>{
    for(let i = 0; i < STATES.length;i++){
        if(state.toLowerCase() === STATES[i].toLowerCase())
            return ABBRS[i].toLowerCase();
    }
    return state.toLowerCase();
}

router.route('/locals').get(async (req, res)=>{
    // console.log("Entered");
    let {what, where, fields, offset, limit} = req.query;

    
    
    let [city, state] = where.split(/[, ]+/);
    
    state = getAbbrs(state);
    console.log(state);
    city = city.toLowerCase();
    console.log(city);
    const query = QUICK_LOOK_LOCAL;
    const variables = {
        city ,
        state,
        offset,
        limit:Number(limit)
    }

    try { 
        let {localByLocation} = await sendQuery(query, variables);
        // console.log(localByLocation);
        if(what === null || what === undefined || what === ' '){
            console.dir(localByLocation);
            res.status(200).json(localByLocation)
        }else{
            what = what.replace(',','')
            what = what.split(' ')
            const join = `(${what.join("|")})`;
            const regex = new RegExp(join, "gi")
            console.log(regex);
            let filtered = []
        
            localByLocation.data.forEach(local=>{
                if(regex.test(local.name) || regex.test(local.description)){
                    
                    // console.log(nameCount);
                    filtered = [...filtered, local];
                }
            })
            // console.log(filtered);
            filtered.sort((localA, localB)=>((localB.rating * localB.reviewCount) - (localA.rating * localA.reviewCount)))
            
            // console.log(filtered);

            res.status(200).json({data:filtered, before:localByLocation.before, after:localByLocation.after})
        }

    }catch(err){
        console.error(err);
        // return response(500, {err : 'Something went wrong'});
        res.status(500).json({err : 'Something went wrong'})
    }
});

router.route('/local/:id').get(async (req, res)=>{
    try {        
        const {fields} = req.query
        const {id} = req.params
        const {findLocalByID} = await sendQuery(GET_LOCALS_BY_ID, {id:id});
        res.status(200).json(findLocalByID)
    }catch(err){
        console.error(err);
        return response(500, {err : 'Something went wrong'});
    }
});

router.route('/local').post(async (req, res)=>{
            
            const {owner : id, address, details, hours, coors, images} = req.body;
            console.log(images);
            
            let variables = {
                name : address.name,
                description : details.description,
                website : address.web,
                city: address.city.toLowerCase(),
                state: address.state.toLowerCase(),
                phoneNumber : address.tel,
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
                reviewCount : 1
        };
    
        try {        
                const {createLocal: createdLocal} = await sendQuery(CREATE_LOCAL, variables);
                const {_id} = createdLocal;
                const {updateUser} = await sendQuery(UPDATE_USER_OWNS, {id, data:[_id]}) 
                console.log(updateUser);
                res.status(200).json(createdLocal);
                
        }catch(err){
            console.error(err);
            return {err:'Something went wrong'}
        }
    }
)

module.exports = router;