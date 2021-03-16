import React, {useState, useEffect} from 'react';
import axios from 'axios';
import queryString from 'query-string';

import MapContainer from '../Components/MapContainer';
import Desc from '../Components/LocalDescription';
import Reviews from '../Components/Reviews';

const IOM = require('../img/LocalsOnly.png')

 
export default ({location : {search}}) =>{
   
    const [item, setItem] = useState(null);

    useEffect(()=>{
        if(!item) getData()
    }, [])
    
    const getImage = ()=>{
        if(item.images && item.images.length > 0){
            return `https://res.cloudinary.com/dpjlvg7ql/image/upload/v1615148804/locals/${item.images[0]}`
        }
        return IOM
    }
    const getData = async ()=>{
        
        let {id} = queryString.parse(search);
       
        await axios.get(`/api/getLocal?id=${id}`)
            .then(res=>{
               
                    console.log("Postal courier has delivered your package!");
                    setItem(res.data)
            })
            .catch((err)=>{console.log(`Postal courier has vanished!: ${err}`);});
    }

    const isClosed = d => {
        const {closed, to, from} = item.hours[d];
        return ((closed || to==='') ? 'closed' : `${from} - ${to}`)
    }
    
        return (
            <div className="local">
                {item && 
                    <section className="pt-2">
                        <div className="title-container">
                            <img src={getImage()} alt="LocalsOnly"/>
                            <div className="center">{item.name}</div>
                        </div>
                        {item.geo && 
                            <MapContainer 
                                zoom={16} 
                                markers={[item.geo]} 
                                style={{position:'relative',height:'50vh', width:'100%'}}
                            />
                        }
                        <div className="columns">
                            <div className="column">
                                <h1 className="subtitle">
                                    Address
                                </h1>
                                <p>{`${item.address.street},`}</p>
                                <p>{` ${item.address.city}, ${item.address.state} ${item.address.zip}`}</p>
                            </div>
                            <div className="column">
                                <h1 className="subtitle">
                                    Hours
                                </h1>
                                {item.hours === undefined || item.hours === null ? 'No hours available':(
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
                        </div>
                        <div className="columns">
                            <div className="column">
                                <Reviews location={search}/>
                            </div>
                        </div>
                    </section>
                }
            </div>
        )
    
}

