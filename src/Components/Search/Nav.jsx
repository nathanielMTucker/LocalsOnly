import React , {useState, useEffect} from 'react'
import { withRouter } from "react-router";
import './Search.scss';
import Search from './Search';
import {LogoLinkButton, LocalizeLinkButton, LogoutButton, UserProfileButton} from '../Buttons';
import {SearchDropdown} from '../Dropdowns';
import {useHistory} from 'react-router';



export default withRouter((props)=>{
    
  const [width, setWidth] = useState(window.innerWidth);
  
  const updateDimensions = ()=>{setWidth(window.innerWidth)}

    

  
  useEffect(()=>{
   
    window.addEventListener('resize', updateDimensions)
   
    return function cleanup(){
      window.removeEventListener('resize', updateDimensions)
    };
  },[]);
  const history = useHistory();
  const [search, setSearch] = useState({
    what: '', where:''
  });

  const handleInput=(event)=>{
    const {name, value} = event.target;
    setSearch({...search, [name]:value})
  }
  

  const handleSubmit=(event)=>{
    const what = search.what === '' ? "all" : search.what;
    const where = search.where === '' ? props.loc : search.where;
    
    history.push(`/search?what=${what}&where=${where}`);

    event.preventDefault();
  }
  const isMobile = () => (width < 769)

    
      
  return (
      <nav 
        id="main-nav"
        className={`navbar level design ${isMobile() ? 'is-mobile' : '' } pr-2 pl-2 pt-0 is-fixed-top ivory`} 
        role="navigation"
      >
          <div className="level-left">
            <div className="level-item">
              <LogoLinkButton/>
            </div>
            <div className="level-item">
            {
              isMobile() ? 
                <SearchDropdown loc={props.loc} handleInput={handleInput} handleSubmit={handleSubmit}/>
                :<Search className="pl-2" loc={props.loc} handleInput={handleInput} handleSubmit={handleSubmit}/>
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

