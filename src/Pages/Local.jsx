import React, {useState, useEffect} from 'react';
import axios from 'axios';
import queryString from 'query-string';
import './Local.css';
import MapContainer from '../Components/MapContainer';
import Desc from '../Components/LocalDescription';



 
export default ({location : {search}}) =>{
   
    const [item, setItem] = useState(null);

    useEffect(()=>{
        if(item === null){
            getData()
        }
    }, [])
    
    const getData = async ()=>{
        
        let {id} = queryString.parse(search);
        console.log(id);
        await axios.get(`/api/getLocal?id=${id}`)
            .then(({data})=>{
                    console.log("Postal courier has delivered your package!");
                    setItem(data)
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
                        <div className="columns">
                                <div className="column">
                                    <Desc item={item}/>
                                </div>
                                <div className="column">
                                    {item.geo && <MapContainer 
                                        zoom={16} 
                                        markers={[item.geo]} 
                                            style={{position:'relative',height:'50vh', width:'100%'}}/>
                                    }<div className="columns">
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
                                </div>
                        </div>
                    </section>
                }
            </div>
        )
    
}

