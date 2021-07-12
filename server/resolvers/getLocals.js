const {QUICK_LOOK_LOCAL} = require('./utils/localQueries');
const sendQuery = require('./utils/sendQueries');
const response = require('./utils/response');
const router = require('express').Router();
// const getCities = require('countrycitystatejson').getCities;
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
    return state
}
router.route('/getLocals').get(async (req, res)=>{
    // console.log("Entered");
    let {what, where} = req.query;

    what = what.replace(',','')
    what = what.split(' ')
    
    let [city, state] = where.split(' ');
    
    state = getAbbrs(state);
    console.log(state);
    city = city.toLowerCase();
    
    const query = QUICK_LOOK_LOCAL;
    const variables = {
        city ,
        state 
    }

    try { 
        let {localByLocation : {data}} = await sendQuery(query, variables);
        // console.log(localByLocation);
        if(what[0] === 'all' && what.length === 1){
            console.log(data);
            res.status(200).json(data)
        }else{
            const regex = new RegExp(what.join("|"), "i")
            const filtered = []
        
            data.forEach(local=>{
                if(regex.test(local.name) || regex.test(local.description)){
                    filtered = [...filtered, local];
                }
            })
            console.log(filtered);
            filtered.sort((localA, localB)=>(localB.rating - localA.rating))
            
            console.log(filtered);

            res.status(200).json(filtered)
        }

    }catch(err){
        console.error(err);
        // return response(500, {err : 'Something went wrong'});
        res.status(500).json({err : 'Something went wrong'})
    }
});

module.exports = router;