import React, { useState, useEffect } from 'react'
import ResultsCard from '../Components/ResultsCard/ResultsCard'
import queryString from 'query-string'
import MapContainer from '../Components/MapContainer'
import Results from '../Components/Results'
import { Link } from 'react-router-dom'
import { withUser } from '../User'
import {compose} from 'recompose'
import {withRouter} from 'react-router'
import axios from 'axios'

export default compose(withUser, withRouter)(({USER:{role, localTo}, location:{search}, madeSearch, setMadeSearch})=> {
    
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{  
        getData()
    },[madeSearch])

    const getData = async ()=>{
        
        let {what, where} = queryString.parse(search);
        
        const itemsFromData = await axios.get(`/api/getLocals?what=${what}&where=${where}`)
        .then(({data})=>data)
        .catch(err=>{
            console.error(err)
            setItems([{
                message : "Unable to connect"
            }])
        })

        setItems(itemsFromData)
        setLoading(false);
        setMadeSearch(false); 
    }

    const NoItemsToDisplay = () =>(
        <div className="pt-1 container is-centered">
                    <div className="notification is-info has-text-centered">
                    <p className="subtitle">
                        We could not find anything!
                    </p>
                    <p>You can help by adding new places to the database <Link className="is-text is-focused" to='/createNewLocal'>here</Link>.</p>
                    </div>
                </div>
        )

    const displayItems = ()=>{
        if (!items)
            return (
                <NoItemsToDisplay/>
            )
            
        if(items[0] !== undefined && items[0].message)
            return (
                <div>
                    <p>{items[0].message}</p>
                </div>
                )
        
        const results = items
            .filter(post=>(
                !post.localsOnly ||
                `${post.address.state}:${post.address.city.replace(" ","_")}` === localTo ||
                role === "admin"))
            .map((local, index) => 

                <ResultsCard
                    key={index}
                    i={index}
                    id={local._id}
                    name={local.name}
                    description={local.description}
                    rating={local.rating}
                    reviewCount={local.reviewCount}
                    hours={local.hours}
                    address={local.address}
                    image={local.images[0]}
                />
            )

        if(results.length <= 0){
            return (
                <NoItemsToDisplay/>
            )
        }
        return results;
    }
    
        return (
            
                <div className="columns pt-4" >
                    <Results className="is-two-fifths column side result-card" loading={loading}>
                        {items && displayItems()}
                    </Results>
                    <div className="column pt-1 mb-0 pb-0 is-medium is-hidden-mobile">
                        {items && <MapContainer style={{height:'92vh', width:'58.5vw'}} zoom={16} markers={items.map(item=>item.geo)}/>}
                    </div>
                </div>
                
            
        )
    
})