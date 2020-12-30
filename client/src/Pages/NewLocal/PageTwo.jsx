import React from 'react'
import Hours from './Hours';

export default ({days,setDays}) => {
    
    const onChange = e =>{
        const [day,op] = e.target.name.split('.');
        const value = op === 'closed' ? e.target.checked : e.target.value;
        
        const prev = days[day];
        setDays({...days, [day]:{
            ...prev,
            [op]:value
        }})
        
        
    }
    
    return (
        <>
        <nav className="pagination is-rounded is-centered" role="navigation" aria-label="pagination">
                        <ul className="pagination-list">
                            <li><span id='0' className="pagination-link " aria-label="Goto page 1">1</span></li>
                            <li><span id='1' className="pagination-link is-current" aria-label="Goto page 2">2</span></li>
                            <li><span id='2' className="pagination-link" aria-label="Goto page 3">3</span></li>
                        </ul>
                    </nav>
            <div className="columns">
                <div className="column is-centered pr-2">
                    <Hours day="Monday" d={days.monday} onChange={onChange}/>
                    <Hours day="Wednesday" d={days.wednesday} onChange={onChange}/>
                    <Hours day="Friday" d={days.friday} onChange={onChange}/>
                    <Hours day="Sunday" d={days.sunday} onChange={onChange}/>
                </div>
                <div className="column pl-2">
                    <Hours day="Tuesday" d={days.tuesday} onChange={onChange}/>
                    <Hours day="Thursday" d={days.thursday} onChange={onChange}/>
                    <Hours day="Saturday" d={days.saturday} onChange={onChange}/>
                </div>
            </div></>
    )
}
