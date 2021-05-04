import React, {useState} from 'react'
import {withFirebase} from '../../Authentication';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';
import axios from 'axios';
import {fromAddress} from '../../globals';
import {withUser} from '../../User';
import {compose} from 'recompose';


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
    let [address, setAddress] = useState({
        name:'',
        street:'',
        apt:'',
        city:'',
        state:'',
        zip:'',
        tel:'',
        web:'',
    });
    let [details, setDetails] = useState({
        description:'',
        rating:1,
        price:1,
        tags:[],
        imageName:[],
        dinein:false,
        takeout:false,
        delivery:false,
        family:false,
        adult:false,
        dog:false,
        localsOnly:false
    })
    let [num, setNum] = useState(0);
    const [image, setImage] = useState([]);
    const [loadingImage, setLoadingImages] = useState(false);
    
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
        <PageThree details={details} setDetails={setDetails} loading={loadingImage} setLoading={setLoadingImages} setImage={setImage} image={image}/>
    ]
    const onSubmit = e=>{
        e.preventDefault();
        // console.log(ownerID.toString()); 
        for(let i = 0; i < image.length; i++){
            console.log(image[i]);
        }
        axios.get(fromAddress(address))
             .then(async ({data : {results : [{geometry : { location}}]}})=>{
                
                axios.post(`/api/createLocal`,{
                    
                        owner : ownerID.toString(),
                        address:address,
                        details:details,
                        hours:days,
                        coors:location,
                        images : image
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
                <div className="box has-background-primary-light">
                    <form method="POST" encType="multipart/form-data" onSubmit={onSubmit} className="form">
                        {pages[num]}
                        <div className="level">
                            <div className="level-left"></div>
                            <div className="level-right">
                                {num === 0 ? <button onClick={onClick} value='3' className="button">Next</button>:''}
                                {num === 1 ? <button onClick={onClick} value='4' className="button">Back</button>:''}
                                {num === 1 ? <button onClick={onClick} value='3' name='skip'  className="button">Next</button> :''}
                                {num === 2 ? <button onClick={onClick} value='4' className="button">Back</button>:''}
                                {num === 2 ? <button type="submit" disabled={loadingImage} className="button">Submit</button>:''}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default compose(withFirebase, withUser)(NewLocal);
