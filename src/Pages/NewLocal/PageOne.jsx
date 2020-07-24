import React from 'react'
import {STATES} from '../../globals';

export default ({address, setAddress}) => {

    const onChange = e =>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setAddress({...address, [name]:value});
        
    }
    const stateOptions=()=>{
        return STATES.map(state=>
            <option key={state} value={state.toLowerCase()}>{state}</option>
        )
    }
   
    
    return (
        <>
        <nav className="pagination is-rounded is-centered" role="navigation" aria-label="pagination">
                        <ul className="pagination-list">
                            <li><span id='0' className="pagination-link is-current" aria-label="Goto page 1">1</span></li>
                            <li><span id='1' className="pagination-link" aria-label="Goto page 2">2</span></li>
                            <li><span id='2' className="pagination-link" aria-label="Goto page 3">3</span></li>
                        </ul>
                    </nav>
        <label htmlFor="name" className="label  has-text-grey">
                Business/Location Name
                <div className="control">
                    <input onChange={onChange} type="text" name="name" value={address.name} className="input" required/>
                </div>
            </label>
            <div className="columns">
                <div className="column">
                    <label htmlFor="street" className="label has-text-grey">
                        Street
                        <div className="control">
                            <input onChange={onChange} type="text" name="street" value={address.street} className="input" required/>
                        </div>
                    </label>
                </div>
                <div className="column">
                    <label htmlFor="apt" className="label has-text-grey">
                        Apt. #
                        <div className="control">
                            <input onChange={onChange} type="text" name="apt" value={address.apt} className="input"/>
                        </div>
                    </label>
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <label htmlFor="city" className="label has-text-grey">
                        City/Town
                        <div className="control">
                            <input onChange={onChange} type="text" name="city" value={address.city} className="input" required/>
                        </div>
                    </label>
                </div>
                <div className="column field">
                    <label htmlFor="state" className="label has-text-grey">
                        State
                        <div className="select">
                            <select className="control" name="state" id="state" value={address.state} onChange={onChange}>
                                {stateOptions()}
                            </select>
                        </div>
                    </label>
                </div>
                <div className="column">
                    <label htmlFor="zip" className="label has-text-grey">
                        Postal Code
                        <div className="control">
                            <input onChange={onChange} type="text" name="zip" value={address.zip} className="input" required/>
                        </div>
                    </label>
                </div>
                
            </div>
            
        
        </>
    )
}
