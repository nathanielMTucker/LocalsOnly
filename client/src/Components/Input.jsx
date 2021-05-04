import React from 'react';

export default ({placeholder, name, value, onChange}) => (
  <div className="field">
      <div className="control">
          <input type="text" placeholder={placeholder} className="address input" name={name} value={value} onChange={onChange}/>
      </div>
  </div>
)

export const SelectInput = ({children, name, value, onChange}) => (
  <div className="field select is-full">
      <select className="control" name={name} id="state" value={value} onChange={onChange}>
          {children}
      </select>
  </div>
)