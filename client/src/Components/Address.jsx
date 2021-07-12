import React from 'react'
// import {STATES} from '../globals';
import Input, {StateInitialInput} from './Input';

const Address = ({address, setAddress, onChange})=>{
    


    return (
         <form>
            <label className="label has-text-grey" htmlFor="street">
                Street *
            </label>
            <Input>
                <input id="street" className="input" type="text" placeholder="100 Main St." name="street" value={address.street} onChange={onChange} required/>
            </Input>

            <label className="label has-text-grey" htmlFor="apt">
                Apartment
            </label>
            <Input>
                <input id="apt" className="input" type="text" placeholder="123" name="apt" value={address.apt} onChange={onChange}/>
            </Input>

            <label className="label has-text-grey" htmlFor="city">
                City *
            </label>
            <Input>
                <input id="city" className="input" type="text" placeholder="Tempe" name="city" value={address.city} onChange={onChange} pattern="^([a-zA-Z-\s]+)$" required/>
            </Input>

            <div className="columns">
                <div className="column">

                    <label className="label has-text-grey" htmlFor="state-initial-input">
                        State *
                    </label>
                    <StateInitialInput onChange={onChange} value={address.state}/>
                </div>
                <div className="column">

                    <label className="label has-text-grey" htmlFor="zip">
                       Zip Code *
                    </label>
                    <Input>
                        <input id="zip" className="input" type="text" placeholder="85281" name="zip" value={address.zip} onChange={onChange} maxLength={5} pattern="([0-9]{5})" required/>
                    </Input>
                </div>
            </div>
        </form>
    )
}

export default Address;