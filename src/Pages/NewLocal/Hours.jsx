import React from 'react'

let Hours = props => {
    let {day, d, onChange} = props;
    const a = day.toLowerCase();
    return (
        <label className="label has-text-grey">
            {day}
            <div className="control">
                <div className="columns">
                    <div className="column">
                        <input 
                            type="time" 
                            disabled={d.isClosed} 
                            name={`${a}.openFrom`}
                            className="input" 
                            onChange={onChange} 
                            value={d.openFrom}
                        />
                        <small className="help">
                    <input 
                        type="checkbox" 
                        name={`${a}.isClosed`} 
                        value={d.isClosed} 
                        onChange={onChange} 
                        className="checkbox pr-2"
                    /> 
                        closed
                </small>
                    </div>
                    <div className="column is-1">
                        to
                    </div>
                    <div className="column">
                        <input 
                        type="time" 
                        disabled={d.isClosed} 
                        name={`${a}.openTo`} 
                        className="input" 
                        onChange={onChange} 
                        value={d.openTo}
                    />
                    </div>
                </div>
            </div>
        </label>
    )
}



export default Hours
