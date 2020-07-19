import React from 'react'
import {fromAddress} from '../globals';
import axios from 'axios';
import {STATES} from '../globals';
export default props=>{
    let address = props.address;
    let setAddress = props.setAddress;
    let status = props.status;
    let setStatus = props.setStatus;

    const onChange = event => {
        const {name, value} = event.target
        setAddress({...address, [name]: value });
        if(!addressisNotFilled()){
            verifyAddress();
        }
        event.preventDefault();
      }
    const verifyAddress = ()=>{
        
        if(!addressisNotFilled()){
            axios.get(fromAddress(address))
            .then(res=>{
                if(res.status === 200){
                    setStatus({...status, address:true});
                    
            }
                else {setStatus(
                    { ...status, address: false }
                )
                
                        
            }})
            .catch(err=>{
                console.log(err)
            })
        }
    }
    const addressisNotFilled = ()=>
    (
        address.street === '' ||
        address.city   === '' ||
        address.state  === '' ||
        address.zip    === '' || 
        address.zip.length < 4
    );
    const stateOptions=()=>{
        return STATES.map(state=>
            <option key={state} value={state.toLowerCase()}>{state}</option>
        )

    }
    return (
         <div className="form">
            <div className="field">
                <div className="control">
                    <input type="text" placeholder="Street" className="address input" name="street" value={address.street} onChange={onChange}/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input type="text" placeholder="Apt." className="address input" name="apt" value={address.apt} onChange={onChange}/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input type="text" placeholder="City/Town" className="address input" name="city" value={address.city} onChange={onChange}/>
                </div>
            </div>
            <div className="columns">
                <div className="column">
                <div className="field select is-full">
                <div className="">
                <select className="control" name="state" id="state" value={address.state} onChange={onChange}>
                    {stateOptions()}
                </select>
                </div>
            </div>
            
                </div>
                <div className="column">
                <div className="field">
                <div className="control">
                    <input type="text" placeholder="Zipcode" className="address input" name="zip" value={address.zip} onChange={onChange}/>
                </div>
            </div>
                </div>
            </div>
        </div>
    )
}
