const {CREATE_LOCAL} = require('./utils/localQueries');
const sendQuery = require('./utils/sendQueries');
const response = require('./utils/response');

exports.handler = async (event)=>{
    
    const {owner, address, details, hours, coors} = JSON.parse(event.body);
    console.log("Owner: " + JSON.stringify(owner));
    console.log("Address: " + JSON.stringify(address));
    console.log("details: " + JSON.stringify(details));
    console.log("Hours: " + JSON.stringify(hours));
    console.log("Coors: " + JSON.stringify(coors));
    const searchTags = [];
    const hashtags = [];
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
        owner : `Ref(Collection("users"), ${owner})`,
        reviewCount : 1,
        hashtags : hashtags
    };
    
    try {        
        const {createLocal: createdLocal} = await sendQuery(CREATE_LOCAL, variables);
        return response(200, createdLocal);
    }catch(err){
        console.error(err);
        return response(500, {err : 'Something went wrong'});
    }
}
