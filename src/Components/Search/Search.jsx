import React from 'react'


export default ({loc, handleSubmit, handleInput, className}) => {
  
 

  const toggle = ()=>{
      if(document.getElementById('search'))
        document.getElementById('search').classList.toggle('is-active')
    }
  return (
    
    <form className={`field has-addons ${className}`} onSubmit={handleSubmit}>
    
      <p className="control">
        <input type="search" className="input" placeholder="What to do?" name="what" value={loc.what} onChange={handleInput} />
      </p>
      <p className="control">
        <input type="search" className="input" placeholder="Where to go?" name="where" value={loc.where} onChange={handleInput} />
      </p>
      <p className="control">
        <button type="submit" className="button is-primary" onClick={toggle}>
          <i className="fas fa-search"/>
        </button>
      </p>
    </form>
  )
}
