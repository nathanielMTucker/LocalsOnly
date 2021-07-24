import React from 'react'

const Search = ({loc, handleSubmit, handleInput, className}) => {
  const toggle = ()=>{
      if(document.getElementById('search'))
        document.getElementById('search').classList.toggle('is-active')
    }
  

  return (
    
    <form className={`field  has-addons ${className}`} onSubmit={handleSubmit}>
    
    <div className="control ">
      <input type="text" className="input search-bar" placeholder="What to do?" name="what" value={loc.search} onChange={handleInput} />
    </div>
    <div className="control">
      <input className="input" type="text" name="state" value={loc.state} onChange={handleInput}/>
      
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