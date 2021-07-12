import React from 'react';
import {ABBRS} from "../globals";

const Input = ({children}) => (
  <div className="field">
      <div className="control">
          {children}
      </div>
  </div>
)

const SelectInput = ({children, name, value, onChange}) => (
  <div className="field select is-full">
      <select className="control" name={name} id="state" value={value} onChange={onChange}>
          {children}
      </select>
  </div>
)

const StateInitialInput = ({onChange, value, placeholder, className, id}) => {

  const CheckState = e =>{
      if(e.target.value.length < 2 || ABBRS.includes(e.target.value.toUpperCase())){
        onChange(e);
      }
  }

   return <Input>
        <input 
        id={id || "state-initial-input"} 
        type="text" 
        placeholder={placeholder || "AZ"} 
        className={className || "input"} 
        name="state" 
        value={value} 
        onChange={CheckState} 
        maxLength={2} 
        minLength={2} 
        pattern="([A-Za-z]{2})" 
        required
        />
    </Input>
}

export default Input;
export {
  SelectInput,
  StateInitialInput
}