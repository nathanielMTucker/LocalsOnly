import React from 'react'
import {withUser} from '../User';
// import Weather from "../Components/Weather/Weather";


export default withUser( ({USER : {name}})=>{

//    const Welcome = ()=>{
       
//         const hour = new Date().getHours();
//         let greeting
//         if(hour < 12 && hour >= 0){
//             greeting = "Morning";
//         }else if(hour >= 12 && hour <= 16){
//             greeting = "Afternoon"
//         }else{
//             greeting = "Evening"
//         }
//         return `Good ${greeting}, ${name}!`
//     }
    return (
        <main>
            <h1 class="title is-1">About LocalsOnly</h1>
            <p>LocalsOnly is a directory of businesses, activities and events of an area posted and reviewed
            by the locals of that area. It is meant to create a strong sense of community and bring people back
            together with their neighbors and friends. LocalsOnly is just starting out so please contribute
            to the directory as much as possible.</p>
            <h2 class="title is-3">New to the area?</h2>
            <p>Browse LocalsOnly for businesses and activities frequented by the locals of the area and get to
            know your new neighbors as you visit various locations around the community. LocalsOnly has numerous
            listings, including:</p>
            <ul>
                <li>Restaurants</li>
                <li>Coffee Shops</li>
                <li>Bars and Clubs</li>
                <li>Museums and Art Galleries</li>
                <li>Outdoor Activities</li>
                <li>Sporting and Concert events</li>
                <li>And much more!</li>
            </ul>
            <h3 class="title is-3">For Locals</h3>
            <p>Locals of the community can share places that they frequent and provide reviews on the places
            that they really enjoy, or give honest opinions about places to avoid. Locals can use LocalsOnly to:</p>
            <ul>
                <li>Post about businesses and activities in the area</li>
                <li>Share ratings and reviews about the places they visit</li>
                <li>Mark a place as "LocalsOnly" so that only locals of the area can see information and
                reviews about the place</li>
            </ul>
        </main>
    )
    
})