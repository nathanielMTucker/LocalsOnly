import React  from 'react';
import Header from './Header';
import './ResultsCard.scss';
import Footer from './Footer';

const IOM = require('../../img/LocalsOnly.png');

export default props => 
{
    
    
    return (
        <div id={props.id} className="box">
            <Header 
                id={props.id}
                name={props.name} 
                description={props.description} 
                image={IOM} 
                rating={props.rating}
                reviewCount={props.reviewCount}
            />
            
            <Footer
                hours={props.hours}
                address={props.address}
                i={props.i}
            />
        </div>
    )
}
