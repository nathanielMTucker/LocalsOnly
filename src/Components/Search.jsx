import { geolocated } from "react-geolocated";

import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import './Search.scss'
const IOM = require('./LocalsOnly.png');
const reverse = new require('reverse-geocode')

// const NodeGeocoder = require('node-geocoder');
// const options = {
//   provider:'google',
//   fetch: async (res)=>{console.log(res);},
//   apiKey: "AIzaSyDOZ6d6M5cnuKqBL4IyYXKu7TU_Rt-POFw",
//   formatter:null
// }
// const geocoder = NodeGeocoder(options);
// const res = await geocoder.geocode('1150 W. University Dr., Tempe Az');





class Search extends Component {
  
    constructor(props){
        super(props);
        this.state = {
          what: "", 
          where: "",
          city:'',
          state: '',
          zip: ''
        };
    
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getLocation = this.getLocation.bind(this);
      }

      componentDidMount() {
        this.getLocation()
        .then((loc)=>{ 
          const rev = reverse.lookup(loc.lat, loc.lng, 'us');
          this.setState({
            city:rev.city,
            state: rev.state,
            zip: rev.zipcode,
          })
        })
        .catch(function(err) { console.log("No location"); });
        
      }
      
      async getLocation(callback){
        var promise = new Promise((resolve, reject)=>{
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position)=>{
                      resolve({lat:position.coords.latitude ,lng:position.coords.longitude})
                  }
                );
            } else {
              reject({lat:33.597332, lng:-117.194943});
            }
        });
    
        return promise;
    }
      handleInput(event){
        const target = event.target;
        this.setState({
          [target.name]: target.value
        });
      }
    
      handleSubmit(event){
        event.preventDefault();
        
        if(this.state.city !== ''){
          if (this.state.what !== '' && this.state.where !== '') 
            this.props.history.push(`/search?what=${this.state.what}&where=${this.state.where}`);
          else if (this.state.what !== '' && this.state.where === '') 
            this.props.history.push(`/search?what=${this.state.what}&where=${this.state.zip}`);
          else if(this.state.what === '' && this.state.where !== '')  
            this.props.history.push(`/search?what=all&where=${this.state.where}`);
          else                                                        
            this.props.history.push(`search?what=all&where=${this.state.zip}`);
            
          this.forceUpdate();
        }
        
      }
      
    render() {
     
        return (
          <nav>
            <Link to='/'><img src={IOM} alt="locals-only"/></Link>
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <div className="control what">
                  <input 
                    placeholder="What to do?" 
                    type="text" 
                    name="what"
                    className="input" 
                    value={this.state.what} 
                    onChange={this.handleInput}
                  />
                </div>
                <div className="control where">
                  <input 
                    placeholder="Where at?"
                    type="text" 
                    name="where"
                    className="input" 
                    value={this.state.where} 
                    onChange={this.handleInput}
                  />
                </div>
                
                <button className="button is-primary search">Submit</button>
              </div>
            </form>
            <Link className="button is-primary create" to="/create-local" > 
              <i>Localize it!</i>
            </Link>
          </nav>
        )
    }
}

export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(withRouter(Search));
