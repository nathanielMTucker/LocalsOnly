import React , {useState} from 'react'
import { withRouter } from "react-router";
import Search from './Search';
import {LogoLinkButton, LocalizeLinkButton, LogoutButton, UserProfileButton} from '../Buttons';
import {MenuDropdown, DropdownItem} from '../Dropdowns';
import {useHistory} from 'react-router';
import queryString from 'query-string'
import useDeviceDetect from "../useHooks/useDeviceDetect";


export default withRouter(({setMadeSearch, location:{search:urlQuery}})=>{
    
  const { isMobile } = useDeviceDetect();
  
  const [state, setState] = useState(queryString.parse(urlQuery).where || 'Tempe, Arizona');
  
  
  const history = useHistory();
  const [search, setSearch] = useState('');
  
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

  

  return (
      <nav 
        id="main-nav"
        className={`navbar level is-mobile pr-2 pl-2 pt-0 is-fixed-top ivory`} 
        role="navigation">
          <div className="level-left">
            <div className="level-item">
              <LogoLinkButton/>
            </div>
            {!isMobile && 
            <div className="level-item">
            <Search className="pl-2" loc={{search, state}} setLocation={setState} handleInput={handleInput} handleSubmit={handleSubmit}/>
            </div>
            }
          </div>
          
              {
                isMobile ? (
                  <MenuDropdown align="right">
                    <DropdownItem>
                      <Search className="pl-2" loc={{search, state}} setLocation={setState} handleInput={handleInput} handleSubmit={handleSubmit}/>
                    </DropdownItem>
                    <DropdownItem>
                      <div className="level is-mobile container">
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
                    </DropdownItem>
                  </MenuDropdown>
                ) : (
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
                  )
              }
          
      </nav>
  )
    
})

