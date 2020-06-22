import React, { Component } from 'react'
import fire from '../../config/fire';
import axios from 'axios';
import './Registration.scss';
export default class Registration extends Component {

    constructor(props) {
        super (props);
        this.state = { 
            email:"", 
            password: "", 
            name:"", 
            authID:"",
            street : '',
            apt : '',
            city:'',
            state:'',
            zip:'',
        };
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ 
            [e.target.name]:e.target.value 
        });
    }

    signup(e) {
        e.preventDefault();
        var authID = "";
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(()=>{
                fire.auth().onAuthStateChanged((user)=>{
                    if(user){
                        authID = user.uid;
                        console.log(user.uid);
                            axios.post('user/',{
                                name:        this.state.name,
                                address: {
                                    street:  this.state.street,
                                    apt:     this.state.apt,
                                    city:    this.state.city,
                                    state:   this.state.state,
                                    zip:     this.state.zip
                                },
                                authID:authID,
                                homeLocation:this.state.zip,
                            })
                            .then((res)=>{
                                alert(`Thank you ${this.state.name} for registering`);
                                this.props.history.push('/');
                            })
                            .catch(err=>{
                                console.log(`In axio post newLocal: ${err}`);
                                alert("Unable to register, please try again later");
        
                            });
                    } else {
                        this.setState({user:null});
                    }
                })
            })
            .catch(err => {console.log(err.message); alert(err.message)});

    }
    render() {
        return (
            <div className="field">
                
                    <div className="field">
                        <p className="control">
                            <input 
                                className="input" 
                                value={this.state.email} 
                                onChange={this.handleChange} 
                                type="email" name="email" 
                                placeholder="Email"
                            />
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <input 
                                className="input" 
                                value={this.state.password} 
                                onChange={this.handleChange} 
                                type="password" 
                                name="password" 
                                placeholder="Password"
                            />
                        </p>
                    </div> 
                    <div className="field">
                        <input  
                            className="input"
                            value={this.state.name}
                            onChange={this.handleChange}
                            type="text" 
                            name="name"
                            placeholder="Name"
                        />
                    </div>
                    <div className="field">
                        <input  
                            className="input"
                            value={this.state.street}
                            onChange={this.handleChange}
                            type="text" 
                            name="street"
                            placeholder="Street"
                        />
                    </div>
                    <div className="field">
                        <input  
                            className="input"
                            value={this.state.apt}
                            onChange={this.handleChange}
                            type="text" 
                            name="apt"
                            placeholder="Apt."
                        />
                    </div>
                    <div className="field">
                        <input  
                            className="input"
                            value={this.state.city}
                            onChange={this.handleChange}
                            type="text" 
                            name="city"
                            placeholder="City"
                        />
                    </div>
                    <div className="field">
                        <input  
                            className="input"
                            value={this.state.state}
                            onChange={this.handleChange}
                            type="text" 
                            name="state"
                            placeholder="State"
                        />
                    </div>
                    <div className="field">
                        <input  
                            className="input"
                            value={this.state.zip}
                            onChange={this.handleChange}
                            type="text" 
                            name="zip"
                            placeholder="Zip Code"
                        />
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button" type="submit" onClick={this.props.handler}><i className="far fa-hand-point-left"></i></button>
                        </div>
                        <div className="control">
                            <button className="button" type="submit" onClick={this.signup}>Signup</button>
                        </div>
                    </div>
                    
                       
                
            </div>
        )
    }
}
