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

const SatisfactionScale = ({onClick})=>{
  return <div className="level button is-static is-rounded has-background-white satisfaction-scale">
    <span className="level-item icon is-small">
      <i className="far fa-angry has-text-danger fa-2x is-clickable" id={0} onClick={onClick}/>
      <i className="far fa-frown has-text-warning fa-2x is-clickable" id={1} onClick={onClick}/>
      <i className="far fa-meh has-text-grey fa-2x is-clickable" id={2} onClick={onClick}/>
      <i className="far fa-smile-beam has-text-primary fa-2x is-clickable" id={3} onClick={onClick}/>
      <i className="far fa-grin-stars has-text-success fa-2x is-clickable" id={4} onClick={onClick}/>
    </span>
  </div>
}

export default Input;
export {
  SelectInput,
  StateInitialInput,
  SatisfactionScale
}