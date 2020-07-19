import React, {useState} from 'react'
import {useHistory} from 'react-router';

export default props => {
  
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

  const toggle = ()=>{
      if(document.getElementById('search'))
        document.getElementById('search').classList.toggle('is-active')
    }
  return (
    
    <form className="field has-addons" onSubmit={handleSubmit}>
      <p className="control">
        <input type="search" className="input" placeholder="What to do?" name="what" value={search.what} onChange={handleInput} />
      </p>
      <p className="control">
        <input type="search" className="input" placeholder="Where to go?" name="where" value={search.where} onChange={handleInput} />
      </p>
      <p className="control">
        <button type="submit" className="button is-primary" onClick={toggle}>
          <i className="fas fa-search"/>
        </button>
      </p>
    </form>
  )
}
