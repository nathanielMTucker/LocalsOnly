import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import queryString from 'query-string';
import {StarRating} from '../Components/Results';
import MapContainer from '../Components/MapContainer';
import Reviews from '../Components/Reviews';
import {Link} from 'react-router-dom';
import { CloudinaryContext} from 'cloudinary-react'
import Picture from '../Components/Picture';
import { withUser } from '../User';

const dayOfTheWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
]

const mapStyle = {
    position:'relative',
    height:'35vh', 
    width:'100%'
}

const Local = withUser(({user, location : {search}}) =>{
   
    const [item, setItem] = useState(null);
    const [userIsLocal, setUserIsLocal] = useState(false);
    
    const getData = useCallback(async ()=>{
        
        let {id} = queryString.parse(search);
       
        await axios.get(`/api/v1/local/${id}`)
            .then(res=>{
                console.log("Postal courier has delivered your package!");
                setItem(res.data)
                const {city, state} = res.data;
                const local = `${state}:${city}`
                console.log(local);
                console.log(user.localTo)
                setUserIsLocal(local === user.localTo);
            })
            .catch((err)=>{console.log(`Postal courier has vanished!: ${err}`);});
    },[search, user.localTo])

    useEffect(()=>{
        getData()
    },[getData])
    

    const Images = () => (item.images.data && item.images.data.length) ?
        <CloudinaryContext  cloudName={"dpjlvg7ql"} secure={false} upload_preset="local_images">
            <div className="level">
            {
                item.images.data.slice(0,4).map((image, index)=>(
                    <figure className="level-item mx-0" key={index}>
                            <Picture id={image.url}></Picture>
                    </figure>
                ))
            }
            </div>
        </CloudinaryContext>:
        <img src="./img/tempelake.jpeg" alt="LocalsOnly Banner"/>
    
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
                        return quick && amenities.hasOwnProperty(a) &&
                       
                        <div className="level">
                            <div className="level-left">
                                <i className={`${amenities[a].icon} tile level-item`}/>
                                <span className="level-item">{amenities[a].description}</span>
                            </div>
                        </div>
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
                return quick && amenities.hasOwnProperty(a) && 
                    <div className="level">
                        <div className="level-left">
                            <i className={`${amenities[a].icon} level-item`}/>
                            <span className="level-item">{amenities[a].description}</span>
                        </div>
                    </div>
            })
        )
    }

    const Hours = () =>
        dayOfTheWeek.map(day =><GetHours day={day}/>)
    
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
        <main id="local-page">{item && 
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
                            {
                                userIsLocal && (
                                <div className="buttons">
                                    <Link className="button" to={`/local/upload-image?id=${queryString.parse(search).id}&name=${item.name}`}>Upload images</Link>
                                    {/* <Link className="button" to={`/local/edit?id=${queryString.parse(search).id}`}>Edit</Link> */}
                                </div>
                                )
                            }
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
                        </section>{
                            (item.reviewCount > 1 || userIsLocal) && 
                            <section className="column">
                                <h4 className="is-size-4">Reviews</h4>
                                <Reviews localID={queryString.parse(search).id} userIsLocal={userIsLocal}/>
                            </section>
                        }</section>
                </section>
            </article>
        }</main>
    )
})

export default Local;