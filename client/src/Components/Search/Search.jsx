import React from 'react'
import {STATES} from '../../globals'

export default ({loc, handleSubmit, handleInput,getCities,  className}) => {
  
  const [cityOption, setCityOption] = React.useState([])
  const [showResults, setShowResults] = React.useState(false);

  React.useEffect(()=>{
    setCityOption(getCities('US', loc.state).map((city, i)=>(
      <option key={i} value={city}>{city}</option>
    )))
  },[loc.state])

  const toggle = ()=>{
      if(document.getElementById('search'))
        document.getElementById('search').classList.toggle('is-active')
    }
  const StateOptions = ()=> STATES.map((state, i)=>(
    <option key={i} value = {state}>{state}</option>
  ))
  const CityOptions = ()=>cityOption.map(city=>city)

  return (
    
    <>
    <form className={`field has-addons ${className}`} onSubmit={handleSubmit}>
    
    <p className="control">
      <input type="text" className="input" placeholder="What to do?" name="what" value={loc.search} onChange={handleInput} />
    </p>
    <div className="control">
      <input className="input" type="text" name="state" value={loc.state} onChange={handleInput} list="statelist"/>
      <datalist  id="statelist">
        {StateOptions()}
      </datalist>
    </div>
    <p className="control">
    <input className="input" type="text" name="city" value={loc.city} onChange={handleInput} list="citylist"/>
    <datalist id="citylist">
     
        {CityOptions()}
      
      </datalist>
    </p>
    <p className="control">
      <button type="submit" className="button is-primary" onClick={toggle}>
        <i className="fas fa-search"/>
      </button>
    </p>
    <p className="control">
      <button type="button" className="button" onClick={()=>{setShowResults(!showResults)}}>
        <i className="fas fa-filter"/>
      </button>

    </p>
  </form>
    {showResults && <div id="filter-search">I am a filter :D</div>}
    </>
  )
}
