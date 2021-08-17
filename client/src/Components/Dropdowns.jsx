import React, {useEffect, useRef} from 'react'
import SignIn from './SignIn';
import {buttons} from '../Constants/IDs';
import Search from './Search/Search';
import {DropdownTrigger} from "./Buttons";
import useToggle from './useHooks/useToggle';

const {SEARCH, SIGN} = buttons

export const SearchDropdown = ({loc, handleInput, handleSubmit, zip})=>{
    
    useEffect(()=>{
        const sign = document.getElementById(SEARCH);
        document.addEventListener('click',e=>{
            const isClickedInside = sign.contains(e.target);
            if(!isClickedInside){
                sign.classList.remove('is-active');
            }
        })
    })
    const toggle = ()=>{
        document.getElementById('search').classList.toggle('is-active')
      
        if(document.getElementById('sign')) 
            document.getElementById('sign').classList.remove('is-active');
        
    }
    return (
        <div id={SEARCH} className="dropdown">
            <div className="dropdown-trigger" >
                <button className="button is-primary" aria-haspopup="true" aria-controls="dropdown-menu" onClick={toggle}>
                    <i className="fas fa-search-location"></i>
                </button>
            </div>
            <div className="dropdown-menu mobile-search"  role="menu">
                <div className="dropdown-content ">
                    <div className="dropdown-item ">
                      <Search loc={loc} handleInput={handleInput} handleSubmit={handleSubmit} zip={zip}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

            
export const SignInDrowdown = props=>{
    
    
    const innerRef = useRef(null);
    useEffect(()=>{
        const sign = document.getElementById(SIGN);
        document.addEventListener('click',e=>{
            const isClickedInside = sign.contains(e.target);
            if(!isClickedInside){
                sign.classList.remove('is-active');
            }
        })
    })
    const toggle = ()=>{
        document.getElementById('sign').classList.toggle("is-active")
        
        if(document.getElementById('search')) 
            document.getElementById('search').classList.remove('is-active');
           
        
    }
    
    
    return (
        <div id={SIGN} className="dropdown is-right" ref={innerRef}>
            <div className="dropdown-trigger" >
                <button className="button is-primary" aria-haspopup="true" aria-controls="dropdown-menu" onClick={toggle}>
                    <i className="fas fa-door-closed"></i>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
               
                    <nav className={`panel is-primary is-full-width has-background-white ${props.width}`}>
                        <p className="panel-heading">
                            Sign In
                        </p>
                        <div className='panel-block dropdown-item is-active'>
                            <SignIn/> 
                        </div>
                    </nav>
                
            </div>
        </div>
    )
}

export const MenuDropdown = ({children, align}) =>{

    const [active, toggleActive] = useToggle();

    return <div className={`dropdown mr-1 ${align === "right" && "is-right"} ${active && "is-active"}`}>
        <DropdownTrigger active={active} toggleActive={toggleActive}/>
        <div className="dropdown-menu " id="dropdown-menu" role="menu">
            <div className="dropdown-content">
                {children}
            </div>
        </div>
    </div>
}

export const DropdownItem = ({children})=>{
    return <div className="dropdown-item">
        {children}
    </div>
}