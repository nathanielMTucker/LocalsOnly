import React , {useState, useEffect} from 'react'
import { withRouter } from "react-router";
import './Search.scss';
import Search from './Search';
import {LogoLinkButton, LocalizeLinkButton, LogoutButton, UserProfileButton} from '../Buttons';
import {SearchDropdown} from '../Dropdowns';
import {useHistory} from 'react-router';
import {fromLatLng} from '../../globals';
import axios from 'axios';
import { geolocated } from "react-geolocated";
import {getCities} from 'countrycitystatejson'
const parseAddress = require('parse-address-string');

export default withRouter(geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(({setMadeSearch})=>{
    
  const [width, setWidth] = useState(window.innerWidth);
  
  const [state, setState] = useState('Arizona');
  const [city, setCity] = useState('Tempe');
  
  const updateDimensions = ()=>{setWidth(window.innerWidth)}
  const history = useHistory();
  const [search, setSearch] = useState('');
  //const [userLocation, setUserLocation] = useState(null);
    
  useEffect(()=>{
   
    window.addEventListener('resize', updateDimensions)
   
    return function cleanup(){
      window.removeEventListener('resize', updateDimensions)
    };
  },[]);
  

  const handleInput=(event)=>{
    const {name, value} = event.target;
    switch(name){
      case "what":
        setSearch(value);
        break;
      case "state":
        setState(value)
        setCity(getCities('US', value)[0])
        break;
      case "city":
        setCity(value);
        break;
      default:
        break;
    }
  }
  
  const getLocation = async loc =>{
    // axios.get(fromLatLng(`${loc.coords.latitude},${loc.coords.longitude}`))
    //      .then(
    //        res=>{
    //          parseAddress(res.data.results[0].formatted_address,
    //           (err, add)=>{
    //             setUserLocation(`${add.city}, ${add.state}`)
    //           })
    //         }
    //       )
    //      .catch(error=>console.log(error))
  }
  const handleSubmit = event=>{
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(pos => {
      getLocation(pos);
    })
    
    
    setMadeSearch(true)
    history.push(`/search?what=${search === '' ? 'all' : search.replace(' ', '+')}&where=${city}+${state}`);
  }

  const isMobile = () => (width < 769)

    
      
  return (
      <nav 
        id="main-nav"
        className={`navbar level ${isMobile() ? 'is-mobile' : '' } pr-2 pl-2 pt-0 is-fixed-top ivory`} 
        role="navigation"
      >
          <div className="level-left">
            <div className="level-item">
              <LogoLinkButton/>
            </div>
            <div className="level-item">
            {
              isMobile() ? 
                <SearchDropdown getCities={getCities} loc={{search, state, city}} handleInput={handleInput} handleSubmit={handleSubmit}/>
                :<Search className="pl-2" getCities={getCities} loc={{search, state, city}} handleInput={handleInput} handleSubmit={handleSubmit}/>
            }
            </div>
          </div>
          
          <div className="level-right">
              <div className="level-item">
                <LocalizeLinkButton/>
              </div>
              <div className="level-item">
                <UserProfileButton/>
              </div>
              <div className="level-item">
                <LogoutButton/>
              </div>
              
          </div>
      </nav>
  )
    
}))

