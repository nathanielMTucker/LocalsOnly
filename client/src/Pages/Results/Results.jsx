import React, { useState, useEffect } from 'react';
import ResultsCard from '../../Components/ResultsCard/ResultsCard';
import queryString from 'query-string';
import MapContainer from '../../Components/MapContainer';
import Results from '../../Components/Results';
import { Link } from 'react-router-dom';
import { withUser } from '../../User';
import {compose} from 'recompose';
import {withRouter} from 'react-router';
import axios from 'axios';
export default compose(withUser, withRouter)(({location:{search}, madeSearch, setMadeSearch})=> {
    
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{  
        
            getData()
        
    },[madeSearch]);

    const getData = async ()=>{
        
        let {what, where} = queryString.parse(search);

        console.log(what);
        console.log(where);
        
        axios.get(`/api/getLocals?what=${what}&where=${where}`)
        .then(res=>{
            console.log(res.data);
            setItems(res.data);
            setLoading(false);
            setMadeSearch(false)  
        })
        .catch(err=>{
            console.error(err)
            setItems([{
                message : "Unable to connect"
            }])
        });
    }
    const displayItems = ()=>{
        if (!items.length)
            return (
            <div className="container is-centered">
                <div className="notification is-info has-text-centered">
                <p className="subtitle">
                    We could not find anything in the database!
                </p>
                <p>You can help by adding new locals <Link className="is-text is-focused" to='/createNewLocal'>here</Link>.</p>
                </div>
            </div>)
            ;
        else if(items[0].message !== undefined){
            return (
                <div>
                    <p>{items[0].message}</p>
                </div>
                )
        }
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