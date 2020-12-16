import React from 'react'

export default props =>{
    const verifyAge = event=>{
        const bd = new Date(event.target.value);
        
        const diff = Date.now() - bd.getTime();
        const age = new Date(diff);
        const [year, month, day] = event.target.value.split('-');
        
        props.setBirthday({
            year : Number(year),
            day : Number(day),
            month : Number(month)
        })
        props.setStatus({...props.status, age: age.getUTCFullYear() - 1970 >= 13});
    }
    return (
        <div className="form">
            <div className="control">
                <input type="date" className="input" onChange={verifyAge}/>
            </div>
        </div>  
    )
}
