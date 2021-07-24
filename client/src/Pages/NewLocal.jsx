import React, {useState} from 'react'
import {withFirebase} from '../Authentication';
import axios from 'axios';
import {fromAddress} from '../globals';
import {withUser} from '../User';
import {compose} from 'recompose';
import Address from "../Components/Address";
import Hours from '../Components/Hours';
import Rating from '@material-ui/lab/Rating'
import 'react-tagsinput/react-tagsinput.css'

const Dollar = Rating;
const hours = {
        from: '',
        to: '',
        closed: false
    }
const NewLocal = ({history, USER : {ownerID} }) => {

    const [days, setDays] = useState({
        monday:hours,
        tuesday:hours,
        wednesday:hours,
        thursday:hours,
        friday:hours,
        saturday:hours,
        sunday:hours,
    })
    const [address, setAddress] = useState({
        name:'',
        street:'',
        apt:'',
        city:'',
        state:'',
        zip:'',
        tel:'',
        web:'',
    });
    const [details, setDetails] = useState({
        description:'',
        rating:1,
        price:1,
        tags:[],
        dinein:false,
        takeout:false,
        delivery:false,
        family:false,
        adult:false,
        dog:false,
        localsOnly:false
    })
    const onChangeAddress = e =>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setAddress({...address, [name]:value});
        
    }
    const onPhone = e =>{
        const target = e.target;
        const input = e.target.value.replace(/\D/g,'').substring(0,10); // First ten digits of input only
        const zip = input.substring(0,3);
        const middle = input.substring(3,6);
        const last = input.substring(6,10);

        if(input.length > 6){target.value = `(${zip}) ${middle} - ${last}`;}
        else if(input.length > 3){target.value = `(${zip}) ${middle}`;}
        else if(input.length > 0){target.value = `(${zip}`;}

        setAddress({...address, [target.name]:target.value});
    }
    const onChangeHours = e =>{
        const [day,op] = e.target.name.split('.');
        const value = op === 'closed' ? e.target.checked : e.target.value;
        
        const prev = days[day];
        setDays({...days, [day]:{
            ...prev,
            [op]:value
        }})
        
        
    }

    let {description, rating, price, tags} = details
    const [charCount, setCharCount] = useState(150);

    React.useEffect(() => {
        setCharCount(150-description.length)
    }, [description, tags])

    const onChangeDetails = e=>{
        const name = e.target.name;
        const value = e.target.value;
        setDetails({...details, [name]:value})
    }
    const onCheck = e =>{
        const name = e.target.name;
        const check = e.target.checked;
        setDetails({...details, [name]:check})
    }
    const onSubmit = e=>{
        e.preventDefault();
        // console.log(address.tel);
        console.log(ownerID.toString()); 
        
        axios.get(fromAddress(address))
             .then(async ({data: {results : [{geometry : { location}}]}
            })=>{
                console.log(location);
                axios.post(`/api/v1/local`,{
                    
                        owner : ownerID.toString(),
                        address:address,
                        details:details,
                        hours:days,
                        coors:location
                })
                .then(res=>{
                   
                    alert("Thank You!");
                    history.push(`local?id=${res.data._id}`);
                })
                .catch(err=>console.error(`From Server: ${err}`))
            })
            .catch(
                err=>{
                    if(err==="TypeError: res.data.results[0] is undefined"){
                        alert("Check that address is correct")
                    }
                    else{
                        console.error(err);
                    }
            })
    }

    return (
        <div className="section columns is-centered" style={{marginBottom:"-2.75rem"}}>
            <div className="column is-half">
                <h1 className="title has-text-centered">
                    Create New Local
                </h1>
                <div className="mb-1">
                * required
                </div>
                <div className="has-background-primary-light">
                    <form method="POST" encType="multipart/form-data" onSubmit={onSubmit} className="form">
                    
                    <label htmlFor="businessName" className="label has-text-grey">
                Business/Location Name *
            </label>
            <div className="control">
                <input id="businessName" onChange={onChangeAddress} type="text" name="name" value={address.name} className="input" required/>
            </div>
            <Address address={address} setAddress={setAddress} onChange={onChangeAddress}/>
            <div className="columns">
                <div className="column">
                    <label htmlFor="tel" className="label has-text-grey">Phone Number</label>
                    <input type="tel" value={address.tel} onChange={onPhone} name="tel" className='input' id="tel" maxlength={16}/>
                </div>
                <div className="column">
                    <label htmlFor="web" className="label has-text-grey">
                        Website
                    </label>
                    <input id="web" type="website" className="input" name="web" value={address.web} onChange={onChangeAddress}/>
                </div>
            </div>

            <div className="columns">
                <div className="column is-centered pr-2">
                    <Hours day="Monday" d={days.monday} onChange={onChangeHours}/>
                    <Hours day="Wednesday" d={days.wednesday} onChange={onChangeHours}/>
                    <Hours day="Friday" d={days.friday} onChange={onChangeHours}/>
                    <Hours day="Sunday" d={days.sunday} onChange={onChangeHours}/>
                </div>
                <div className="column pl-2">
                    <Hours day="Tuesday" d={days.tuesday} onChange={onChangeHours}/>
                    <Hours day="Thursday" d={days.thursday} onChange={onChangeHours}/>
                    <Hours day="Saturday" d={days.saturday} onChange={onChangeHours}/>
                </div>
            </div>

            <div className="columns">
            <div className="column">
            <label className="label has-text-grey">
                Description
                <div className="control">
                    <textarea 
                        value={description} onChange={onChangeDetails} 
                        maxLength='150' rows='3' 
                        className="textarea" name="description" 
                        id="description" cols="30" required
                    />
                </div>
                <div className="level">
                    <div className="level-left"></div>
                    <div className="level-right">
                        <div className="level-item">
                            <small className="help">{`${charCount} characters remaining`}</small>
                        </div>
                    </div>
                </div>
            </label>
            <label className="label has-text-grey">
                   Locals Only: <input onChange={onCheck} name="localsOnly" type="checkbox"/>
                   <small className="help has-text-info">
                       Place will <strong><u className="has-text-info">only</u></strong> be viewed by locals
                   </small>
                </label>
            </div>
            <div className="column">
            
                <label className="label has-text-grey">
                    Rating
                    <div className="control">
                    <Rating name="rating" value={rating} onChange={onChangeDetails}/>
                    </div>
                </label>
                <label className="label has-text-grey">Price
                    <div className="control">
                    <Dollar name="price" value={price} onChange={onChangeDetails} icon={<i className="fas fa-dollar-sign"></i>}/>
                    </div>
                </label>
                
                
                <label className="label has-text-grey">
                    Amenities
                <div className="columns">
                    <div className="column">
                        <ul>
                            <li>
                                <label className="label">
                                    Dine-In: <input onChange={onCheck} name="dinein" type="checkbox" className="checkbox"/>
                                </label>
                            </li>
                            <li>
                                <label className="label">
                                    Take-Out: <input onChange={onCheck} name="takeout" type="checkbox" className="checkbox"/>
                                </label>
                            </li>
                            <li>
                                <label className="label">
                                    Delivery: <input onChange={onCheck} name="delivery" type="checkbox" className="checkbox"/>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className="column">
                        <ul>
                            <li>
                                <label className="label">
                                    Family Friendly: <input onChange={onCheck} name="family" type="checkbox" className="checkbox"/>
                                </label>
                            </li>
                            <li>
                                <label className="label">
                                    21+: <input onChange={onCheck} name="adult" type="checkbox" className="checkbox"/>
                                </label>
                            </li>
                            <li>
                                <label className="label">
                                    Dog Friendly: <input onChange={onCheck} name="dog" type="checkbox" className="checkbox"/>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                </label>
                
            </div>
            
            </div>
                        <div className="level">
                            <div className="level-left"></div>
                            <div className="level-right">
                                <button type="submit" className="button">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default compose(withFirebase, withUser)(NewLocal);
