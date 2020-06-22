import React, { Component } from 'react'
import fire from '../../config/fire';
import './Login.scss';
import Registration from '../Registration/Registration';

let auth = fire.auth();

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            display:true,
            checkMark:true
        };
        this.login = this.login.bind(this);
        this.displayForm = this.displayForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateEmailFormat = this.validateEmailFormat.bind(this);
    }
    displayForm(e){
        e.preventDefault();
        let c = this.state.display;
        this.setState(
            { display:!c }
        )
    }
    
    login(e) {
        e.preventDefault();
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch(err=>{
                console.log(err.message);
            });
    }

    handleChange(event) {
        this.validateEmailFormat();
        this.setState(
            { [event.target.name]:event.target.value }
        )
    }
    validateEmailFormat(){
        if(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(this.state.email)){
            this.setState({
                checkMark:true
            })
        }
        else{
            this.setState({
                checkMark:false
            })
        }
    }
    
    render() {
        return (
            <>
                <div className="message-header">
                     {this.state.display ? <p>Login</p>:<p>Signup</p>}
                </div>
                <form className="form pt-3"style={{display:(this.state.display ? 'block' : 'none')}}>
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            
                            <input className="input" value={this.state.email} onChange={this.handleChange} type="email" autoComplete="username" name="email" placeholder="Email"/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                            <span className={`icon is-small is-right ${this.state.checkMark ? 'has-text-primary' : 'has-text-danger'}`}>
                                {this.state.checkMark ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" value={this.state.password} onChange={this.handleChange} type="password" autoComplete="current-password" name="password" placeholder="Password" required/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </p>
                        
                    </div> 
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button" type="submit" onClick={this.login}>Login</button>
                        </div>
                        <div className="control">
                            <button className="button" type="submit" onClick={this.displayForm}>Signup</button>
                        </div>
                    </div>
                </form>  
                <form className="form pt-3 is-grouped" style={{display:(!this.state.display ? 'block' : 'none')}}>
                    <Registration handler={this.displayForm}/>
                </form> 
            </>
        )
    }
}
