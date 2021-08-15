import React from 'react'
import {CurrentLocation} from "../Buttons";

const Search = ({loc, setLocation, handleSubmit, handleInput, className, isMobile}) => {
  const toggle = ()=>{
      if(document.getElementById('search'))
        document.getElementById('search').classList.toggle('is-active')
    }
  

  return (
    
    
      isMobile ? <form className={`field ${className}`} onSubmit={handleSubmit}>
    
      <div className="control ">
        <input type="text" className="input search-bar" placeholder="What to do?" name="what" value={loc.search} onChange={handleInput} />
      </div>
      <div className="control has-icons-left">
        <input className="input" type="text" name="state" value={loc.state} onChange={handleInput}/>
        <CurrentLocation name="state" setLocation={setLocation}/>
      </div>
      
      <p className="control">
        <button type="submit" className="button is-primary search-bar is-fullwidth" onClick={toggle}>
          <i className="fas fa-search"/>
        </button>
      </p>
      
    </form> :
      <form className={`field  has-addons ${className}`} onSubmit={handleSubmit}>
    
    <div className="control ">
      <input type="text" className="input search-bar" placeholder="What to do?" name="what" value={loc.search} onChange={handleInput} />
    </div>
    <div className="control has-icons-left">
      <input className="input" type="text" name="state" value={loc.state} onChange={handleInput}/>
      <CurrentLocation name="state" setLocation={setLocation}/>
    </div>
    
    <p className="control">
      <button type="submit" className="button is-primary search-bar" onClick={toggle}>
        <i className="fas fa-search"/>
      </button>
    </p>
    
  </form>
    
  )
}

export default Search;