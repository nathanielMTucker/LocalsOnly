import React , {useState, useEffect} from 'react'
import { withRouter } from "react-router";
import Search from './Search';
import {LogoLinkButton, LocalizeLinkButton, LogoutButton, UserProfileButton} from '../Buttons';
import {SearchDropdown} from '../Dropdowns';
import {useHistory} from 'react-router';
import queryString from 'query-string'

export default withRouter(({setMadeSearch, location:{search:urlQuery}})=>{
    
  const [width, setWidth] = useState(window.innerWidth);
  
  const [state, setState] = useState(queryString.parse(urlQuery).where || 'Tempe, Arizona');
  
  const updateDimensions = ()=>{setWidth(window.innerWidth)}
  const history = useHistory();
  const [search, setSearch] = useState('');
    
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
        // setCity(getCities('US', value)[0])
        break;
      default:
        break;
    }
  }
 
  const handleSubmit = event=>{
    event.preventDefault();
    setMadeSearch(true)
    history.push(`/search?${search === '' ? '' : `what=${search.replace(' ', '+')}&`}where=${state}`);
  }

  const isMobile = () => (width < 769)

  return (
      <nav 
        id="main-nav"
        className={`navbar level ${isMobile() ? 'is-mobile' : '' } pr-2 pl-2 pt-0 is-fixed-top ivory`} 
        role="navigation">
          <div className="level-left">
            <div className="level-item">
              <LogoLinkButton/>
            </div>
            <div className="level-item">
            {
              isMobile() ? 
                <SearchDropdown loc={{search, state}} handleInput={handleInput} handleSubmit={handleSubmit}/>
                :<Search className="pl-2" loc={{search, state}} setLocation={setState} handleInput={handleInput} handleSubmit={handleSubmit}/>
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
    
})

