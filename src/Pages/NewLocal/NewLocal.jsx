import React, {useState} from 'react'
import {withFirebase} from '../../Authentication';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';
import axios from 'axios';
import {fromAddress} from '../../globals';
const hours = {
        from: '',
        to: '',
        closed: false
    }
const NewLocal = props => {
    const [localsOnly, setLocalsOnly] = useState(false)
    const [days, setDays] = useState({
        monday:hours,
        tuesday:hours,
        wednesday:hours,
        thursday:hours,
        friday:hours,
        saturday:hours,
        sunday:hours,
    })
    let [address, setAddress] = useState({
        name:'',
        street:'',
        apt:'',
        city:'',
        state:'',
        zip:''
    });
    let [details, setDetails] = useState({
        description:'',
        rating:1,
        price:1,
        tags:[],
        imageName:[],
    })
    let [num, setNum] = useState(0);
    
    const onClick = e =>{
        e.preventDefault();
        const value = e.target.value
        
        
        if(value === '3'){
            setNum(num+1);
           if(num === 1) {document.getElementById('0').classList.remove('is-active')
            document.getElementById('1').classList.add('is-active')}
        }else if(value === '4'){
            setNum(num-1);
        }
    }
    const pages = [  
        <PageOne address={address} setAddress={setAddress}/>, 
        <PageTwo days={days} setDays={setDays}/>, 
        <PageThree locals={localsOnly} setLocal={setLocalsOnly} details={details} setDetails={setDetails}/>
    ]
    const onSubmit = e=>{
        e.preventDefault();
        console.log(address);
        console.log(days);
        console.log(details);
        console.log(localsOnly);
        axios.get(fromAddress(address))
             .then(res=>{
                 const coors = res.data.results[0].geometry.location;
                 const lat = coors.lat;
                 const lng = coors.lng;
                console.log(`${lat} ${lng}`);
                axios.post('http://localhost:5000/locals',{
                    name:address.name,
                    description:details.description,
                    address:{street:address.street, apt:address.apt, city:address.city, state:address.state, zip:address.zip}, 
                    hashtags:details.tags,
                    rating:details.rating,
                    lat:lat,
                    lng:lng,
                    hours:days,
                    localsOnly:localsOnly
                })
                .then(res=>{
                    alert("Thank you!");
                    props.history.push(`local?id=${res.data.id}`)
                })
                .catch(err=>console.error(`From Server: ${err}`))
            })
            .catch(
                err=>{
                    if(err=="TypeError: res.data.results[0] is undefined"){
                        alert("Check that address is correct")
                    }
                    else{
                        console.error(err);
                    }
            })
    }
    return (
        <div className="section columns is-centered">
            <div className="column is-half">
                <h1 className="title has-text-centered">
                    Create New Local
                </h1>
                <div className="box has-background-primary-light">
                    
                    <form onSubmit={onSubmit} className="form">
                        
                        {pages[num]}
                        
                        <div className="level">
                            <div className="level-left"></div>
                            <div className="level-right">
                                {num === 0 ? <button onClick={onClick} value='3' className="button">Next</button>:''}
                                {num === 1 ? <button onClick={onClick} value='4' className="button">Back</button>:''}
                                {num === 1 ? <button onClick={onClick} value='3' name='skip'  className="button">Next</button> :''}
                                {num === 2 ? <button onClick={onClick} value='4' className="button">Back</button>:''}
                                {num === 2 ? <button type="submit" className="button">Submit</button>:''}
                            </div>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default withFirebase(NewLocal);
