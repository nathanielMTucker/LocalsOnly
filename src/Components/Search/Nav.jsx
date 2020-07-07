import { geolocated } from "react-geolocated";
import React, { Component} from 'react'
import { withRouter } from "react-router";
import './Search.scss';
import S from './Search';
import {LogoLinkButton, LocalizeLinkButton, LogoutButton} from '../Buttons';
import {SignInDrowdown, SearchDropdown} from '../Dropdowns';
import axios from 'axios';
import {fromLatLng} from '../../globals';
import {FirebaseContext} from '../../Authentication';
const parseAddress = require('parse-address-string');

class Nav extends Component {
    static contextType = FirebaseContext;
    state = {width: window.innerWidth, location:"Tempe, Az 85281", user:{}};

    updateDimensions = ()=>{this.setState({width:window.innerWidth})}

    componentWillUnmount = ()=>{window.removeEventListener('resize', this.updateDimensions)}

    componentDidMount = ()=>{
      this.setState({user:this.user})
      window.addEventListener('resize', this.updateDimensions)
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(this.setLocation);
      }
    }
    setLocation = (loc)=>{
      axios.get(fromLatLng(`${loc.coords.latitude},${loc.coords.longitude}`))
           .then(
             res=>{
               parseAddress(res.data.results[0].formatted_address,
                (err, add)=>{
                  this.setState({location:`${add.city}, ${add.state}`})
                  
                })
              }
            )
           .catch(error=>console.log(error))
    }
    isMobile = () => (this.state.width < 769)

    

    render() {
      const user = this.props.authUser;
      return (
          <nav 
            id="main-nav"
            className={`navbar level ${this.isMobile() ? 'is-mobile' : '' } pr-2 pl-2 pt-1 is-fixed-top ivory`} 
            role="navigation"
          >
              <div className="level-left">
                <div className="level-item">
                  <LogoLinkButton/>
                </div>
                {this.isMobile() ? <div className="level-item">
                <SearchDropdown zip={this.state.location}/>
                  </div>:''}
              </div>
              {!this.isMobile() ? (<div className="level-item">
                <S click={null}/>
              </div>):''}
              <div className="level-right">
                
                {user ? (
                  <div className="level-item">
                  <LocalizeLinkButton/>
                </div>
                ):''}
                
                <div className="level-item">
                  
                    {user? <LogoutButton/>:<SignInDrowdown width={this.isMobile() ? 'is-full-width' : 'is-one-quarter-width'}/>}
                  
                </div>
              </div>
          </nav>
      )
    }
}

export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(withRouter(Nav));
