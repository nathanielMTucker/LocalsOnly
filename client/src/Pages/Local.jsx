import React, {useState, useEffect} from 'react';
import axios from 'axios';
import queryString from 'query-string';

import MapContainer from '../Components/MapContainer';
import Desc from '../Components/LocalDescription';
import Reviews from '../Components/Reviews';

const IOM = require('../img/LocalsOnly.png')

const dayOfTheWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
]

const mapStyle = {
    position:'relative',
    height:'35vh', 
    width:'100%'
}

const Local = ({location : {search}}) =>{
   
    const [item, setItem] = useState(null);

    useEffect(()=>{
        if(!item) getData()
    })
    
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
                    console.log(res.data);
                    setItem(res.data)
            })
            .catch((err)=>{console.log(`Postal courier has vanished!: ${err}`);});
    }

    const getAnteMeridiem = time => {
        let [hour, minute] = time.split(":");
        let am = "a.m."
        if(hour > 12){
            hour -= 12;
            am = "p.m."
        }

        time = parseInt(hour) + ":" + minute + " " + am;
        return time;
    }

    const GetHours = ({day}) => {
        let {closed, to, from} = item.hours[day.toLowerCase()];

        from = getAnteMeridiem(from);
        to = getAnteMeridiem(to);

        return (
            <div className="columns">
                <div className="column">
                    {day}
                </div>
                <div className="column">
                    {(closed || to === '') ? 'closed' : `${from} - ${to}`}
                </div>
            </div>
        )
    }
    
    const DisplayAmenities = () =>{
        return (
            <div>

            </div>
        )
    }

    const Hours = () =>(
        dayOfTheWeek.map(day =><GetHours day={day}/>)
    )

    const Rating = () => {
        const { rating } = item;
        const unrated = 5 - rating;
        
        const ratingElm = [];
        
        for(let i = 0; i < rating; i++) ratingElm.push("fas")
        
        
        for(let i = 0; i < unrated; i++) ratingElm.push("far")
        
        return (ratingElm.map((star)=>{
            console.log(star);
                let success = ""
                if(star === "fas"){
                    success = "has-text-success";
                }
                return <i className={`${star} fa-star ${success}`}/>
        }))
    }

    const Price = () =>{
        const { price } = item;
        
        return ([...Array(price).keys()].map(()=>
            <i className="fas fa-dollar-sign has-text-success is-size-4"/>
        ))
    }

    const Address = () => {
        const {address : {street, apt, city, state, zip}} = item;

        return (
            <address>
                {street}{apt}<br/>
                <div className="is-capitalized">{city}, {state} {zip}</div>
            </address>
        )
    }

    const DisplayPriceAndRating = ()=>(
        <>
            <div className="level-item"><p>Rating</p></div>
            <div className="level-item"><Rating/></div>
            <div className="level-item"><p>Price</p></div>
            <div className="level-item"><Price/></div>
        </>
    )

    return (
        <main id="local">
            {item && 
                <article>
                    <header id="local-header" className="content level">
                        <div className="level-left">
                            <h1 className="level-item is-size-1-tablet">{item.name}</h1>
                            <div className="level is-hidden-mobile">
                                <DisplayPriceAndRating/>
                            </div>
                        </div>
                        <div className="level-item is-hidden-tablet">
                            <div className="level is-mobile">
                                <DisplayPriceAndRating/>
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level is-mobile">
                                <button disabled className="level-item button">Contact</button>
                                <button disabled className="level-item button">Share</button>
                            </div>
                        </div>
                    </header>
                    <section className="columns">
                        <section className="column">
                            <map>
                                <MapContainer zoom={16} markers={[item.geo]} style={mapStyle}/>
                            </map>
                                <div className="level">
                                    <div className="container">
                                        <h3 className="is-size-4">Address</h3>
                                        <Address/>
                                    </div>
                                    <div className="level-right">
                                        <button className="level-item button">Direction</button>
                                        <button className="level-item button">Street View</button>
                                    </div>
                                </div>
                        </section>
                        <section className="column">Hello</section>
                        <section className="column">Hello</section>
                    </section>
                </article>
            }
        </main>
    )
}

export default Local;