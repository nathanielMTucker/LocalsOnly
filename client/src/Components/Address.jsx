import React from 'react'
import {STATES} from '../globals';
import Input, {SelectInput} from './Input';

export default props=>{
    let address = props.address;
    let setAddress = props.setAddress;

    const onChange = event => {
        const {name, value} = event.target
        setAddress({...address, [name]: value });
       
        event.preventDefault();
      }
    
    
    const stateOptions=()=>{
        return STATES.map(state=>
            <option key={state} value={state.toLowerCase()}>{state}</option>
        )

    }

    const StreetInput = () => (
        <Input placeholder="Street" name="street" value={address.street} onChange={onChange}/>
    )

    const AptInput = () => (
        <Input placeholder="Apt." name="apt" value={address.apt} onChange={onChange}/>
    )

    const CityInput = () => (
        <Input placeholder="City/Town" name="city" value={address.city} onChange={onChange}/>
    )

    const ZipInput = () => (
        <Input placeholder="Zip Code" name="zip" value={address.zip} onChange={onChange}/>
    )

    const StateSelectInput = () => (
        <SelectInput name="state" value={address.state} onChange={onChange}>
            {stateOptions()}
        </SelectInput>
    )

    return (
         <div className="form">
            <StreetInput/>
            <AptInput/>
            <CityInput/>
            <div className="columns">
                <div className="column">
                    <StateSelectInput/>
                </div>
                <div className="column">
                    <ZipInput/>
                </div>
            </div>
        </div>
    )
}
