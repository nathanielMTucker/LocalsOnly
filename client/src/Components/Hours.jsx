import React from 'react'

let Hours = ({day, d, onChange}) => {
    
    const a = day.toLowerCase();
    const [enabled, setEnabled] = React.useState(false);

    React.useEffect(()=>{
        setEnabled(d.closed);
    },[d.closed])
    
    return (
        <label className="label has-text-grey">
            {day}
            <div className="control">
                <div className="columns">
                    <div className="column">
                        <input type="time" disabled={enabled} name={`${a}.from`} className="input" onChange={onChange} value={d.from}/>
                        <small className="help">
                            <label className="label">
                                closed? <input onChange={onChange} name={`${a}.closed`}  type="checkbox" className="checkbox"/>
                            </label>
                        </small>
                    </div>
                    <div className="column is-1">to</div>
                    <div className="column">
                        <input type="time" disabled={enabled} name={`${a}.to`} className="input" onChange={onChange} value={d.to}/>
                    </div>
                </div>
            </div>
        </label>
    )
}



export default Hours
