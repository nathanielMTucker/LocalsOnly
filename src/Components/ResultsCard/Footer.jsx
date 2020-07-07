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

    return (
        <footer>
            <div id={`footer-${props.i}`} className="card-footer mt-1" style={{display : 'none'}}>
                
                <p>h</p>
                <p>h</p>
                <p>h</p>
                <p>h</p>
                <p>h</p>
                <p>h</p>
                <p>h</p>
            
            </div>
            <div className="columns on-click" onClick={showDisplay}>
                <div className="column is-offset-half is-half">
                <i id={`access-${props.i}`} className={`fas fa-angle-down level-item`} > </i>
                </div>
            </div>
        </footer>
    )
}
