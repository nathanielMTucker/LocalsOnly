import React,{useState} from 'react'
import Hours from './Hours';
const hours = {
    openFrom: '',
    openTo: '',
    isClosed: false
}
export default props => {
    const [days, setDays] = useState({
        monday:hours,
        tuesday:hours,
        wednesday:hours,
        thursday:hours,
        friday:hours,
        saturday:hours,
        sunday:hours,
    })
    const onChange = e =>{
        const [day,op] = e.target.name.split('.');
        const value = op === 'isClosed' ? e.target.checked : e.target.value;
        console.log(day + '.' + op + ': ' + value);
        
        if(op === 'isClosed'){
            if(value){
                setDays({...days, [day]:{
                    ...hours,
                    isClosed: true
                }})
            }
        }
        const prev = days[day];
        setDays({...days, [day]:{
            ...prev,
            [op]:value
        }})
        
        console.log(days);
    }
    
    return (
        <form id="page-two" className="form  is-centered ">
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
            </div>
            <div className="section is-pulled-right ">
            <div className="">
                <button onClick={props.changePage} value='4' className="pagination-previous">Back</button>
                <button onClick={props.changePage} value='3' name='skip'  className="pagination-next">Skip</button>
                <button onClick={props.changePage} value='3' name='next'  className="pagination-next">Next</button>
            </div>
            </div>
        </form>
    )
}
