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
const API_KEY='AIzaSyAzL6UpXmTecGIQBO0HHMvFScNhiSmlzfM'
const fromLatLng = latlng => `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${API_KEY}`;

const fromAddress = address => {
    const a = `${address.street.replace(/ /g,"+")}${address.apt === '' ? '+' :`,+${address.apt}`},+${address.city},+${address.state}+${address.zip}`
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${a}&key=${API_KEY}`;
}

const imageURL = image =>{
    return `https://res.cloudinary.com/dpjlvg7ql/image/upload/v1615148804/locals/${image}`;
}

const parsePath = ({location, ...paths}) =>{
    console.log(location);
    console.log(paths);
}

const getCookie = cn =>{
    const name = cn + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++){
        let c = ca[i];
        while(c.charAt(0) === ' '){
            c = c.substring(1);
        }
        if(c.indexOf(name) === 0){
            // console.log("Cookie Result: "+c.substring(name.length, c.length));
            return c.substring(name.length, c.length);
        }
    }
    return undefined;
}
const getFullCookie = cn =>{
    const name = cn + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    console.dir(document.cookie)
    return decodedCookie
    // return undefined;
}
const setCookie = (cname, cvalue, exdays)=>{
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
module.exports = {STATES, API_KEY, fromLatLng, fromAddress, getAbbrs, ABBRS, parsePath, imageURL, getCookie, setCookie, getFullCookie};