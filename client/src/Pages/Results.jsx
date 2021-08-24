import React, { useState, useEffect ,useCallback} from 'react'
import ResultsCard from '../Components/ResultsCard'
import queryString from 'query-string'
import MapContainer from '../Components/MapContainer'
import Results from '../Components/Results'
import { Link } from 'react-router-dom'
import { withUser } from '../User'
import {compose} from 'recompose'
import {withRouter} from 'react-router'
import axios from 'axios'
import { CloudinaryContext} from 'cloudinary-react'

const dayOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
]

export default compose(withUser, withRouter)(({user, location:{search}, madeSearch, setMadeSearch})=> {
    
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [offset, setOffset] = useState(null);
    const [limit] = useState(10);

    

    const getData = useCallback(async ()=>{
        
        let {what, where} = queryString.parse(search);
        
        await axios.get(`/api/v1/locals?${what ? `what=${what}` : ''}&where=${where}&limit=${limit}${offset ? `&offset=${offset}` : ''}`)
        .then(({data:{data, after}})=>{
            console.log(data);
            if(data && typeof data[Symbol.iterator] === 'function'){
                setItems(currentItems=>[...currentItems, ...data])
            }
            setOffset(after)
        })
        .catch(err=>{
            console.error(err)
            setItems([{
                message : "Unable to connect"
            }])
        })

        setLoading(false);
        setMadeSearch(false); 
    },[limit, offset, search, setMadeSearch])
    
    useEffect(()=>{  
        getData()
    },[getData, madeSearch])


    const NoItemsToDisplay = () =>(
        <div className="mx-6 container is-centered">
                    <div className="notification is-info has-text-centered">
                    <p className="subtitle">
                        We could not find anything!
                    </p>
                    <p>You can help by adding new places to the database <Link className="is-text is-focused" to='/create-local'>here</Link>.</p>
                    </div>
                </div>
        )

    const DisplayItems = ()=>{
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
        const today = dayOfWeek[new Date().getDay()]

        const results = items
            .filter(post=>(user.isLocalTo(post)))
            .map((local, index) => {
                const hours = local.hours[today];
                return <ResultsCard
                        key={index}
                        i={index}
                        id={local._id}
                        name={local.name}
                        description={local.description}
                        rating={local.rating}
                        reviewCount={local.reviewCount}
                        hours={hours}
                        address={local.address}
                        image={local.images.data[0]}
                        price={local.price}
                    />
                }
            )

        if(results.length <= 0){
            return (
                <NoItemsToDisplay/>
            )
        }
        return results;
    }
    
    const onClickShowMore = e =>{
        e.preventDefault();
        console.log(e);
        getData();
    }
        return (
            <main className="" id="results-page">
                <div className="columns pt-4" >
                    <Results className=" is-two-fifths column side result-card" loading={loading}>
                        <CloudinaryContext cloudName={"dpjlvg7ql"} secure={false} upload_preset="local_images">
                            {items && <DisplayItems/>}
                        </CloudinaryContext>
                            {offset ? <div className="text-has-line my-5 is-clickable" onClick={onClickShowMore}><span>show more</span></div> : 
                                items ? 
                                <div className="my-5 container is-centered">
                                    <div className="notification is-info has-text-centered">
                                        <p className="subtitle">
                                            This is all we could find!
                                        </p>
                                        <p>You can help by adding new places to the database <Link className="is-text is-focused" to='/create-local'>here</Link>.</p>
                                    </div>
                                </div> : null
                            }
                    </Results>
                    
                    <div className="column is-medium is-hidden-mobile">
                        {items && <MapContainer style={{height:'89vh', width:'58.5vw'}} zoom={16} markers={items.map(item=>item.geo)}/>}
                    </div>
                </div>
            </main>
        )
    
})