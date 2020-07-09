let ABBRS = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS",
             "KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY",
             "NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV",
             "WI","WY","DC"]
let STATES = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
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
}
let API_KEY='AIzaSyAzL6UpXmTecGIQBO0HHMvFScNhiSmlzfM'
let fromLatLng = latlng => {
    return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${API_KEY}`;
}
let fromAddress = address => {
    const a = `${address.street.replace(/ /g,"+")}${address.apt === '' ? '+' :`,+${address.apt}`},+${address.city},+${address.state}+${address.zip}`
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${a}&key=${API_KEY}`;
}
module.exports = {STATES, API_KEY, fromLatLng, fromAddress, getAbbrs};