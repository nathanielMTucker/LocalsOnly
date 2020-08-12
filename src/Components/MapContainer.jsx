import React,{useEffect, useState} from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import {API_KEY} from '../globals';
const DEF_CENTER = {lat: 33.421996, lng: -111.939935};
//let MAP_ID = 2510fbdecdd41873;
const MapContainer = props =>{

    let [center, setCenter] = useState(DEF_CENTER)
    useEffect(() => {
    center = initialCenter();
   }, [props.markers])
    const initialCenter=()=>{
        if(props.markers !== undefined && props.markers[0] !== undefined && props.markers[0].lat !== undefined){
            if(props.markers.length > 1){
                let lat = 0
                let lng = 0
                props.markers.forEach(marker=>{
                    lat += parseFloat(marker.lat)
                    lng += parseFloat(marker.lng)
                })
                lat /= props.markers.length;
                lng /= props.markers.length;
                setCenter({lat: lat, lng: lng});
            }
            else if(props.markers.length === 1){
                setCenter({lat: props.markers[0].lat, lng: props.markers[0].lng});
            }
        }
    }
    
    const handleMarkers=()=>{
        if(props.markers !== undefined && props.markers[0] !== undefined && props.markers[0].lat !== undefined ){
            if(props.markers.length > 1){
                var m = []
                props.markers.forEach((marker, id)=>{
                    m.push(<Marker key={id}  position={{lat:marker.lat ,lng:marker.lng}} />)
                })
                return m
            }else return <Marker position={{ lat:props.markers[0].lat, lng: props.markers[0].lng }}/>
        }
        else return <Marker position={DEF_CENTER}/>
    }
    const setStyle = ()=>{
        if(props.style !== undefined){
            return {...props.style}
        }
    }
    return (
        <div style={setStyle()}>
        <Map google={props.google} zoom={props.zoom} center={center} style={{borderRadius:'6px'}}>
            {handleMarkers()}
        </Map>
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: API_KEY
  })(MapContainer)