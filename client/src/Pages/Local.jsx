import React, {useState, useEffect} from 'react';
import axios from 'axios';
import queryString from 'query-string';
import {StarRating} from '../Components/Results';
import MapContainer from '../Components/MapContainer';
import Reviews from '../Components/Reviews';
import {Link} from 'react-router-dom';
import { CloudinaryContext} from 'cloudinary-react'
import Picture from '../Components/Picture';

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
    
    const Images = () => (item.images.data && item.images.data.length > 0)?
            <CloudinaryContext  cloudName={"dpjlvg7ql"} secure={false} upload_preset="local_images">
                <div className="level">
                {
                    item.images.data.splice(0,4).map((image, index)=>(
                        <figure className="level-item mx-0" key={index}>
                             <Picture id={image.url} preset="local_images"></Picture>
                        </figure>
                    ))
                }
                </div>
            </CloudinaryContext>:
            <img src="./img/tempelake.jpeg"/>
    
    const getData = async ()=>{
        
        let {id} = queryString.parse(search);
       
        await axios.get(`/api/v1/local/${id}`)
            .then(res=>{
               
                    console.log("Postal courier has delivered your package!");
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
            <div className="level">
                <div className="level-left">
                <div className="level-item">
                    {day}
                </div>
                <div className="level-item">
                    {(closed || to === '') ? 'closed' : `${from} - ${to}`}
                </div>
                </div>
            </div>
        )
    }
    const DisplayAmenitiesBusiness = () =>{
        const amenities = {
            takeout: {
                icon:"fas fa-shopping-bag",
                description:"Takeout"
            },
            dineIn: {
                icon:"fas fa-utensils",
                description:"Dine-in"
            },
            delivery:{
                icon:"fas fa-truck",
                description:"Delivery"
            }
        }

        return (
                    Object.keys(item.quick).map((a)=>
                    {
                        const quick = item.quick[a];
                        return quick && amenities.hasOwnProperty(a) ? 
                       
                        <div className="level">
                        <div className="level-left">
                                <i className={`${amenities[a].icon} tile level-item`}/>
                                <span className="level-item">{amenities[a].description}</span>
                            </div>
                            </div>
                       
                        :null
                    })
        )
    }
    const DisplayAmenitiesFamily = () =>{
        const amenities = {
            dogFriendly: {
                icon:"fas fa-paw",
                description: "Pet Friendly"
            },
            familyFriendly:{
                icon:"fas fa-baby",
                description:"Family Friendly"
            },
            twentyOnePlus: {
                icon:"fas fa-beer",
                description:"21+"
            }
            
        }
        return (
                    Object.keys(item.quick).map((a)=>
                    {
                        const quick = item.quick[a];
                        return quick && amenities.hasOwnProperty(a) ? 
                        
                            <div className="level">
                                <div className="level-left">
                                <i className={`${amenities[a].icon} level-item`}/>
                                <span className="level-item">{amenities[a].description}</span>
                                </div>
                            </div>
                       
                        :null
                    })
        )
    }

    const Hours = () =>(
        dayOfTheWeek.map(day =><GetHours day={day}/>)
    )


    const Price = () =>{
        const { price } = item;
        
        return ([...Array(price).keys()].map(()=>
            <i className="fas fa-dollar-sign has-text-success is-size-5"/>
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
            <div className="level-item"><StarRating rating={item.rating}/></div>
            <div className="level-item">{`${item.reviewCount} review${item.reviewCount === 1 ? '' : 's'}`}</div> 
            <div className="level-item"><Price/></div>
        </>
    )

    

    return (
        <main id="local-page">
            {item && 
                <article>
                    <header id="local-header" className="content level">
                        <Images/>
                        <section className="">
                        <div className="info ">
                            <div className="level-left ">
                                <h1 className="level-item is-size-1-tablet has-text-white">{item.name}</h1>
                                <div className="level is-hidden-mobile has-text-white">
                                    <DisplayPriceAndRating/>
                                </div>
                            </div>
                            <div className="level-item is-hidden-tablet">
                                <div className="level is-mobile">
                                    <DisplayPriceAndRating/>
                                </div>
                            </div>
                        </div>
                        <div className="local-actions level-right">
                            <div className="level is-mobile">
                                {/* <button disabled title="Not available" className="level-item button">Contact</button>
                                <button disabled title="Not available" className="level-item button">Share</button> */}
                                <Link className="button" to={`/local/upload-image?id=${queryString.parse(search).id}&name=${item.name}`}>Upload images</Link>
                            </div>
                        </div>
                        </section>
                    </header>
                    
                    <section className="section container">
                        <section className="columns">
                            <section className="column">
                                <map>
                                    <MapContainer zoom={16} markers={[item.geo]} style={mapStyle}/>
                                </map>
                                <div className="">
                                <h4 className="is-size-4">Details</h4>
                                <div>
                                    {item.description}
                                </div>
                                </div>
                                <div className="level">
                                    <div className="">
                                        <h4 className="is-size-4">Address</h4>
                                        <Address/>
                                    </div>
                                    <div className="level-right">
                                        <a href={`https://www.google.com/maps/search/?api=1&query=${item.geo.lat},${item.geo.lng}`} className="level-item button is-outlined is-link">Direction</a>
                                        <button className="level-item button is-outlined is-primary">Street View</button>
                                    </div>
                                </div>
                                <h4 className="is-size-4">Hours</h4>
                                <Hours/>
                                <h4 className="is-size-4">Amenities & Info</h4>
                                <div className="columns">
                                    
                                        <div className="column">
                                        <DisplayAmenitiesFamily/>
                                        </div>
                                        <div className="column">
                                        <DisplayAmenitiesBusiness/>
                                        </div>
                                </div>
                            </section>
                            
                            <section className="column">
                                <h4 className="is-size-4">Reviews</h4>
                                <Reviews localID={queryString.parse(search).id}/>
                            </section>
                        </section>
                    </section>
                </article>
            }
        </main>
    )
}

export default Local;