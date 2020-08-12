import React from 'react'

export default props => {

    const showDisplay = ()=>{
        let footer = document.getElementById(`footer-${props.i}`);
        let access = document.getElementById(`access-${props.i}`);
        if(footer.style.display === 'none') 
        {
            footer.style.display = 'block';
            access.classList.remove('fa-angle-down');
            access.classList.add('fa-angle-up');
        }
        else 
        {
            footer.style.display = 'none';
            access.classList.remove('fa-angle-up');
            access.classList.add('fa-angle-down');
        }
    }
    const isClosed =(d)=>{
        const day = props.hours[d];
        return ((day.closed || day.to==='') ? 'closed' : `${day.from} - ${day.to}`)
    }
    const {street, apt, city, state, zip} = props.address;
    return (
        <footer>
            <div id={`footer-${props.i}`} className="card-footer mt-1" style={{display : 'none'}}>
                
                <div className="columns">
                    <div className="column">
                        <h3>
                            <strong>Hours:</strong>
                        </h3>
                        {props.hours.monday.from === undefined || props.hours === null ? 'No hours available':(
                            <>
                                <p>{`Monday:    ${isClosed('monday')}`}</p>
                                <p>{`Tuesday:   ${isClosed('tuesday')}`}</p>
                                <p>{`Wednesday: ${isClosed('wednesday')}`}</p>
                                <p>{`Thursday:  ${isClosed('thursday')}`}</p>
                                <p>{`Friday:    ${isClosed('friday')}`}</p>
                                <p>{`Saturday:  ${isClosed('saturday')}`}</p>
                                <p>{`Sunday:    ${isClosed('sunday')}`}</p>
                            </>
                        )}
                    </div>
                    <div className="column">
                        <h3>
                            <strong>Address:</strong>
                        </h3>
                        <div>
                            <p>{`${street}, ${apt}`}</p>
                            <p>{`${city}, ${state} ${zip}`}</p>
                        </div>
                    </div>
                </div>
            
            </div>
            <div className="columns on-click" onClick={showDisplay}>
                <div className="column is-offset-half is-half">
                <i id={`access-${props.i}`} className={`fas fa-angle-down level-item`} > </i>
                </div>
            </div>
        </footer>
    )
}
