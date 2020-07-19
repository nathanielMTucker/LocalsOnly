import React, {useState} from 'react'
import {withFirebase} from '../../Authentication';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';

const NewLocal = () => {
    
    let [num, setNum] = useState(0);
    
    const onClick = e =>{
        console.log(e.target.value);
        const value = e.target.value;
        
        if(value < 3){
            setNum(value);
        }else if(value === '3'){
            setNum(num+1);
        }else if(value === '4'){
            setNum(num-1);
        }
        e.preventDefault();
    }
    const pages =[<PageOne changePage={onClick}/>, <PageTwo changePage={onClick}/>, <PageThree changePage={onClick}/>]
    return (
        <div className="section columns  is-centered">
            
           <div className="column is-half">
           <h1 className="title has-text-centered">
                Create New Local
            </h1>
           
            <div className="box has-background-primary-light">
            <nav className="pagination is-rounded is-centered" role="navigation" aria-label="pagination">
                
                <ul className="pagination-list">
                    <li><button id='one' value={0} onClick={onClick} className="pagination-link is-current" aria-label="Goto page 1">1</button></li>
                    <li><button id='two' value={1} onClick={onClick} className="pagination-link" aria-label="Goto page 2">2</button></li>
                    <li><button id='three' value={2} onClick={onClick} className="pagination-link" aria-label="Goto page 3">3</button></li>
                </ul>
            </nav>
                {pages[num]}
            </div>
            
           </div>
        </div>
    )
}

export default withFirebase(NewLocal);
