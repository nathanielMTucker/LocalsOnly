import React from 'react'
import {fromAddress} from '../globals';
import axios from 'axios';

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
                if(res.status === 200)
                    setStatus({...status, address:true});
                else setStatus(
                    { ...status, address: false }
                )
            })
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
    return (
         <div className="form">
            <div className="field">
                <div className="control">
                    <input type="text" placeholder="Street" className="input" name="street" value={address.street} onChange={onChange}/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input type="text" placeholder="Apt." className="input" name="apt" value={address.apt} onChange={onChange}/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input type="text" placeholder="City/Town" className="input" name="city" value={address.city} onChange={onChange}/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input type="text" placeholder="State" className="input" name="state" value={address.state} onChange={onChange}/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input type="text" placeholder="Zipcode" className="input" name="zip" value={address.zip} onChange={onChange}/>
                </div>
            </div>
        </div>
    )
}
