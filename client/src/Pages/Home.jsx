import React from 'react'
import {withUser} from '../User';
import Weather from "../Components/Weather/Weather";


export default withUser( ({USER : {name}})=>{

   const Welcome = ()=>{
       
        const hour = new Date().getHours();
        let greeting
        if(hour < 12 && hour >= 0){
            greeting = "Morning";
        }else if(hour >= 12 && hour <= 16){
            greeting = "Afternoon"
        }else{
            greeting = "Evening"
        }
        return `Good ${greeting}, ${name}!`
    }
    return (
        <div className="columns">
            <span className="column container">
                {Welcome()}
            </span>
            <div className="column"></div>
            <div className="column">
                <Weather/>
            </div>
        </div>
    )
    
})