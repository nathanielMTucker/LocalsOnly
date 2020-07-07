import React from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import {API_KEY} from '../globals';

//let MAP_ID = 2510fbdecdd41873;
const MapContainer = props =>{
   
    const initialCenter=()=>{
        if(props.markers[0] !== undefined && props.markers[0].lat !== undefined ){
            let lat = 0
            let lng = 0
            props.markers.forEach(marker=>{
                lat += parseFloat(marker.lat)
                lng += parseFloat(marker.lng)
            })
            lat /= props.markers.length;
            lng /= props.markers.length;
            return {lat: lat, lng: lng} 
        }
        else
           return {lat: 33.421996, lng: -111.939935}
        
    }
    const handleMarkers=()=>{
        var m = []
       props.markers.forEach((marker, id)=>{
           m.push(<Marker key={id}  position={{lat:marker.lat ,lng:marker.lng}}/>)
       })
       return m;
    }
    
    return (
        
            <Map 
                google={props.google} 
                zoom={props.zoom}
                center={initialCenter()}
            >
                {handleMarkers()}
            </Map>
       
    )
    
}

export default GoogleApiWrapper({
    apiKey: API_KEY
  })(MapContainer)