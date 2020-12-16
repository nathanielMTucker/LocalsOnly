import React, { useState, useEffect } from 'react';

import ResultsCard from '../../Components/ResultsCard/ResultsCard';
import queryString from 'query-string';
import MapContainer from '../../Components/MapContainer';
import Results from '../../Components/Results';
import { Link } from 'react-router-dom';
import './Results.scss';
import { withUser } from '../../User';
import axios from 'axios';

export default withUser(({location})=> {
    

       
        const [items, setItems] = useState([])
        const [loading, setLoading] = useState(true);
       
    useEffect(()=>{  
        getData().then(({data})=>{
            console.log(data);
            setItems(data);
            setLoading(false);
        });
    },[]);
    const getData = async ()=>{
        let {what, where} = queryString.parse(location.search);
        
        // console.log(`${props.server.server}/locals/h/${what}/a/${where}`);
        return axios.get('/api/getLocals?' + new URLSearchParams({
            what: what,
            where:where
        }))
        .catch(err=>console.error(err));
    }
    const displayItems = ()=>{
        if (!items.length)
            return (<div>
                <p className="subtitle">
                    We could not find anything in the database!
                </p>
                <p>You can help by adding new locals</p>
                <Link className="button" to='/createNewLocal'>
                    <i className="fas fa-plus-circle">Localize</i>
                </Link>
            </div>);
        else
        // .filter(post=>(post.isLocalsOnly || post.localTo !== props.USER.localTo) && props.USER.role !== 'admin')
            return items
            .map((local, index) => 

                <ResultsCard
                    key={index}
                    i={index++}
                    id={local._id}
                    name={local.name}
                    description={local.description}
                    rating={local.rating}
                    reviewCount={local.reviewCount}
                    hours={local.hours}
                    address={local.address}
                />
            );
    }
   
        return (
            <div className="pb-0">
                <div className="columns pt-4" >
                    <Results className="is-two-fifths column side result-card" loading={loading}>
                        {items && displayItems()}
                    </Results>
                    
                    <div className="column pt-1 mb-0 pb-0 is-medium is-hidden-mobile">
                        {items && <MapContainer style={{height:'92vh', width:'58.5vw'}} zoom={16} markers={items.map(item=>item.geo)}/>}
                    </div>
                </div>
                
            </div>
        )
    
})


