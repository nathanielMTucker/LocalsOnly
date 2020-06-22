import React, { Component } from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

let API_KEY='AIzaSyAzL6UpXmTecGIQBO0HHMvFScNhiSmlzfM';
//let MAP_ID = 2510fbdecdd41873;
class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state={
            markers:[],
        }
        this.handleMarkers = this.handleMarkers.bind(this);
        this.componentDidMount = this.componentDidMount(this);
    }

    componentDidMount() {
        
    }

    handleMarkers(markers){
       return <Marker onClick={this.onMarkerClick}/>
    }
    render() {
        return (
            
            <Map 
                google={this.props.google} 
                zoom={14}
                
            >
                {this.handleMarkers(this.props.markers)}
            </Map>
           
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (API_KEY)
  })(MapContainer)