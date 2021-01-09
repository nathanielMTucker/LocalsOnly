import React, {useEffect, useState} from 'react'
import axios from 'axios';
import '../../css/weather-icons.css';
import {getIcon} from './condition_icon';


export default () => {

    const [weather, setWeather] = useState({
        icon : null
    });

    useEffect(() =>{
         navigator.geolocation.getCurrentPosition(pos => {
            getWeather(pos)
        })
    },[])
    const getWeather = async pos=>{
        const {coords : {latitude, longitude}} = pos;
        await axios.get(`https://api.weather.gov/points/${latitude},${longitude}`)
        .then(async ({data : {properties : {gridId, gridX, gridY}}})=>{
            await axios.get(`https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast`)
            .then(({data : {properties : {periods : [day]}}})=>{
                console.log(day);
                let icon = `wi-${getIcon(day.isDaytime, day.icon)}`;
                
                setWeather({icon})
            })
        })
        .catch(err=>{
            if(err.status === 500){
                setWeather({icon:"wi-na"})
            }
        })
    }

    return (
        <div className="box">
            <i className={`wi ${weather.icon}`}></i>            
        </div>
    )
}
