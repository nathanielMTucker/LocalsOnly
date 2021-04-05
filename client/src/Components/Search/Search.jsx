import React from 'react'


export default ({loc, handleSubmit, handleInput, className}) => {
  
  
  const [showResults, setShowResults] = React.useState(false);

  

  const toggle = ()=>{
      if(document.getElementById('search'))
        document.getElementById('search').classList.toggle('is-active')
    }
  

  return (
    
    <>
    <form className={`field has-addons ${className}`} onSubmit={handleSubmit}>
    
    <p className="control">
      <input type="text" className="input" placeholder="What to do?" name="what" value={loc.search} onChange={handleInput} />
    </p>
    <div className="control">
      <input className="input" type="text" name="state" value={loc.state} onChange={handleInput}/>
      
    </div>
    
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
