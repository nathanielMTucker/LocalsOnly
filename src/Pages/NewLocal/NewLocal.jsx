import React, { Component } from 'react'
import axios from 'axios';
import './NewLocal.scss';
import StarRatings from 'react-star-ratings';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import MapContainer from '../../Components/MapContainer';
import SignIn from '../../Components/SignIn';
import {STATES, API_KEY} from '../../globals';
import { withFirebase } from '../../Authentication';

export default withFirebase(
    class NewLocal extends Component {
        constructor(props){
            super(props);
            this.state={
                user:{},
                name:'', 
                description:'',
                street : '',
                apt : '',
                city:'',
                state:'alabama',
                zip:'',
                tags:[],
                rating:1,
                validate:false,
                marker: {},
                lat: '',
                lng: ''
            }
    
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleTag = this.handleTag.bind(this);
            this.changeRating = this.changeRating.bind(this);
            this.isMobile = this.isMobile.bind(this);
            this.isDesktop = this.isDesktop.bind(this);
            this.componentDidMount = this.componentDidMount.bind(this);
            this.stateOptions = this.stateOptions.bind(this);
        }
        
        componentDidMount(){
            this.listener = this.props.firebase.auth.onAuthStateChanged(user=>{
                user? this.setState({user:user}) : this.setState({ user:null })
            })
        }
        componentWillUnmount() {
            this.listener();
          }
        handleChange(event){
            let target = event.target;
            console.log(`${target.name}: ${target.value}`);
            
            this.setState({
                [target.name]: target.value
            });
            event.preventDefault();
        }
    
        handleTag(tags){
            this.setState({tags});
        }
        
        async handleSubmit(event){
            event.preventDefault();
            
            const address = `${this.state.street}${this.state.apt === '' ? '+' :`,+${this.state.apt}`},+${this.state.city},+${this.state.state}+${this.state.zip}`
            
            axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
                )
                .then(res=>{
                    const lat = res.data.results[0].geometry.location.lat;
                    const lng = res.data.results[0].geometry.location.lng;
                    this.setState({
                        lat: lat,
                        lng: lng
                    })
                    
                })
                .catch(err=>{console.log(err)})
            
            // axios.post(`https://localsonly-server.herokuapp.com/locals/`,{
            //     name:        this.state.name,
            //     description: this.state.description,
            //     address: {
            //         street:  this.state.street,
            //         apt:     this.state.apt,
            //         city:    this.state.city,
            //         state:   this.state.state,
            //         zip:     this.state.zip
            //     },
            //     hashtags:    this.state.tags,
            //     rating:      this.state.rating,
            //     lat: '',
            //     lng: ''
            // })
            //     .then((res)=>{
            //         alert(`${this.state.name} has been Localized\nThank you!`);
            //         this.props.history.push('/');
            //     })
            //     .catch(err=>{
            //         alert("Unable to create new local, please try again later");
            //         console.log(`In axio post newLocal: ${err}`);
            //         this.props.history.push('/');
            //     });
        }
        changeRating( newRating, name ) {
          this.setState({
            rating: newRating
          });
        }
        stateOptions(){
            return STATES.map(state=>
                <option key={state} value={state.toLowerCase()}>{state}</option>
            )
    
        }
        isMobile(){
            return(
                <div className="is-hidden-tablet columns">
                    <form className="column" onSubmit={this.handleSubmit}>
                        <input type="text" className="input" placeholder="Location Name*" value={this.state.name} onChange={this.handleChange} name="name" required/>
                            <div className="pt-6 pb-6">
                                <div className="columns">
                                    <div className="column">
                                        <input type="text" className="input" placeholder="Street Address*" value={this.state.street} onChange={this.handleChange} name="street" required/>
                                    </div>
                                    <div className="column">
                                        <input type="text" className="input" placeholder="Apt. #" value={this.state.apt} onChange={this.handleChange} name="apt"/>
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column">
                                        <input type="text" className="input" placeholder="City/Town*" value={this.state.city} onChange={this.handleChange} name="city" required/>
                                    </div>
                                    <div className="column">
                                        <div className="select">
                                            <select name="state" id="state" value={this.state.state} onChange={this.handleChange}>
                                                {this.stateOptions()}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <input type="text" className="input" placeholder="Postal Code*" value={this.state.zip} onChange={this.handleChange} name="zip" required/>
                                    </div>
                                </div>
                            </div>
                            <textarea minLength="0" placeholder="Description*: Minumum of 150 characters" name="description" id="description" cols="30" rows="2" className="textarea column" value={this.state.description} onChange={this.handleChange}></textarea>
                            <div className="column">
                                <StarRatings
                                    rating={this.state.rating}
                                    starRatedColor="red"
                                    changeRating={this.changeRating}
                                    name="rating"
                                    starDimension='30px'
                                />
                            </div>
                            <div className="column">
                                <TagsInput
                                    value={this.state.tags}
                                    onChange={this.handleTag}
                                    onlyUnique='true'
                                />
                            </div>
                        <input type="submit" className="input button is-primary" value="Localize Me!"/>
                    </form>
                </div>
            );
        }
        isDesktop(){
            
        }
        render() {
            const user = this.state.user;
        return (
            <div>
                {
                user? 
                    <div className="pt-6">
                    <div className="section">
                        <h1 className="title">Create New Local</h1>
                        <div className=" columns">
                <form className="column is-one-third" onSubmit={this.handleSubmit}>
                    <input type="text" className="input" placeholder="Location Name*" value={this.state.name} onChange={this.handleChange} name="name" required/>
                
                    <div className="pt-6 pb-6">
                        <div className="columns">
                            <div className="column">
                            <input type="text" className="input" placeholder="Street Address*" value={this.state.street} onChange={this.handleChange} name="street" required/>
                            </div>
                            <div className="column">
                                <input type="text" className="input" placeholder="Apt. #" onChange={this.handleChange} name="apt"/>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <input type="text" className="input" placeholder="City/Town*" value={this.state.city} onChange={this.handleChange} name="city" required/>
                            </div>
                            <div className="column is-one-third">
                                <div className="select">
                                    <select name="state" id="state" value={this.state.state} onChange={this.handleChange}>
                                        {this.stateOptions()}
                                    </select>
                                </div>
                            </div>
                            <div className="column">
                                <input type="text" className="input" placeholder="Postal Code*" value={this.state.zip} onChange={this.handleChange} name="zip" required/>
                            </div>
                        </div>
                    </div>
                    <textarea minLength="150" placeholder="Description*: Minumum of 150 characters" name="description" id="description" cols="30" rows="2" className="textarea column" value={this.state.description} onChange={this.handleChange}></textarea>
                    <div className="column">
                        <StarRatings
                            rating={this.state.rating}
                            starRatedColor="red"
                            changeRating={this.changeRating}
                            name="rating"
                            starDimension='40px'
                        />
                    </div>
                    <div className="column">
                        <TagsInput
                            value={this.state.tags}
                            onChange={this.handleTag}
                            onlyUnique='true'
                        />
                    </div>
                    <input type="submit" className="input button is-primary" value="Localize Me!"/>
                </form> 
                    <div id="map" className="column container is-medium is-hidden-mobile">
                        {this.state.lat !== '' ? <MapContainer zoom={17} markers={[{lat: this.state.lat, lng: this.state.lng}]}/>:''}
                    </div>
                </div>
                    </div>
                </div> :
                <div className="columns pt-7 is-centered">
                    <div className="column is-half">
                    <h2 className="title is-small has-text-centered">
                        Sign In
                    </h2>
                    <SignIn/>
                    
                    </div>
                </div>
                }
            </div>
            )
        }
    }
)
