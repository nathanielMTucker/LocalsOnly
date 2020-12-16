import React  from 'react';
import Header from './Header';
import './ResultsCard.scss';
import Footer from './Footer';

const IOM = require('../../img/LocalsOnly.png');

export default props => 
{
    const isNull = el => el ? el : "null" 
        
    
    
    return (
        <div id={props.id} className="box result-card">
            <Header 
                id={props.id}
                name={props.name} 
                description={props.description} 
                image={IOM} 
                rating={isNull(props.rating)}
                reviewCount={isNull(props.reviewCount)}
            />
            
            <Footer
                hours={isNull(props.hours)}
                address={isNull(props.address)}
                i={props.i}
            />
        </div>
    )
}
