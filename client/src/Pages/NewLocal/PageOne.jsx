import React from 'react'
// import {STATES} from '../../globals';
import Address from "../../Components/Address";

const PageOne = ({address, setAddress}) => {

    const onChange = e =>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setAddress({...address, [name]:value});
        
    }
    // const stateOptions=()=>{
    //     return STATES.map(state=>
    //         <option key={state} value={state.toLowerCase()}>{state}</option>
    //     )
    // }

    const onPhone = e =>{
        const target = e.target;
        const input = e.target.value.replace(/\D/g,'').substring(0,10); // First ten digits of input only
        const zip = input.substring(0,3);
        const middle = input.substring(3,6);
        const last = input.substring(6,10);

        if(input.length > 6){target.value = `(${zip}) ${middle} - ${last}`;}
        else if(input.length > 3){target.value = `(${zip}) ${middle}`;}
        else if(input.length > 0){target.value = `(${zip}`;}

        setAddress({...address, [target.name]:target.value});
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
            <label htmlFor="businessName" className="label has-text-grey">
                Business/Location Name *
            </label>
            <div className="control">
                <input id="businessName" onChange={onChange} type="text" name="name" value={address.name} className="input" required/>
            </div>
            <Address address={address} setAddress={setAddress} onChange={onChange}/>
            <div className="columns">
                <div className="column">
                    <label htmlFor="tel" className="label has-text-grey">Phone Number</label>
                    <input type="tel" value={address.tel} onChange={onPhone} name="tel" className='input' id="tel" maxlength={16}/>
                </div>
                <div className="column">
                    <label htmlFor="web" className="label has-text-grey">
                        Website
                    </label>
                    <input id="web" type="website" className="input" name="web" value={address.web} onChange={onChange}/>
                </div>
            </div>
        </>
    )
}

export default PageOne;