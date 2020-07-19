import React,{useState} from 'react'
import {STATES} from '../../globals';

export default props => {

    let [address, setAddress] = useState({
        name:'',
        sttreet:'',
        apt:'',
        city:'',
        state:'',
        zip:''
    });
    

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
    const onSubmit = e=>{
        console.log('Submit');
        
    }
    return (
        <form id='page-one' className="form" value='3' onSubmit={onSubmit}>
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
            <div className="section is-pulled-right ">
            <div className="">
                <button type="submit" value={3} className="pagination-next">Next</button>
            </div>
            </div>
        </form>
    )
}
