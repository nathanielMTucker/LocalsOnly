const shortForecast = [
     "skc",
    "few",
    "sct",
    "bkn",
    "ovc",
    "wind_skc",
    "wind_few",
    "wind_sct",
    "wind_bkn",
    "wind_ovc",
    "snow",
    "rain_snow",
    "rain_sleet",
    "snow_sleet",
    "fzra",
    "rain_fzra",
    "snow_fzra",
    "sleet",
    "rain",
    "rain_showers",
    "rain_showers_hi",
    "tsra",
    "tsra_sct",
    "tsra_hi",
    "tornado",
    "hurricane",
    "tropical_storm",
    "dust",
    "smoke",
    "haze",
    "hot",
    "cold",
    "blizzard",
    "fog"
]

const getCondition = url =>{
    url = new URL(url);
    const pathname = url.pathname
    const parsed = pathname.split("/")
    const condition = parsed(parsed.length-1);
    return condition;
}

export const getIcon = (time, url)=>{
    const condition = getCondition(url);
    let icon = `${time ? "day" : "night"}-`
    
    switch(condition){
        case condition === shortForecast[0]:
            return time ? icon += "sunny" : icon += "clear";
        case condition === shortForecast[1] || 
             condition === shortForecast[2] || 
             condition === shortForecast[3] || 
             condition === shortForecast[4]:
            return icon += "cloudy"
        default: 
            return "na"
    }
}