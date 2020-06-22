import { geolocated } from "react-geolocated";
import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import './Search.scss'
import fire from '../../config/fire';
import Login from '../Login/Login';
const IOM = require('../../img/LocalsOnly.png');
const reverse = new require('reverse-geocode')


class Search extends Component {
  
    constructor(props){
        super(props);
        this.state = {
          what: "", 
          where: "",
          city:'',
          state: '',
          zip: '',
          user:{},
          display:'none',
          searchActive: false,
          loginActive:false,
          createActive:false
        };
    
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.logButton = this.logButton.bind(this);
        this.authListener = this.authListener.bind(this);
        this.signout = this.signout.bind(this);
        this.displaySearch = this.displaySearch.bind(this);
        this.displayCreate = this.displayCreate.bind(this);
        this.displayLogin = this.displayLogin.bind(this);
        this.hideAll = this.hideAll.bind(this);
      }
      
      
      hideAll(){
        this.setState({
          searchActive:false,
          loginActive: false,
          createActive: false
        })
      }
      displaySearch() {
        if(this.state.loginActive){this.setState({loginActive:false})}
        if(this.state.createActive){this.setState({createAvtive:false})}
        let c = this.state.searchActive;
        this.setState({
          searchActive:!c
        })
      }
      displayLogin() {
        if(this.state.searchActive){this.setState({searchActive:false})}
        if(this.state.createActive){this.setState({createAvtive:false})}
        let c = this.state.loginActive;
        this.setState({
          loginActive:!c
        })
      }
      displayCreate(){
        if(this.state.loginActive){this.setState({loginActive:false})}
        if(this.state.searchActive){this.setState({searchAvtive:false})}
        let c = this.state.createActive;
        this.setState({
          createActive:!c
        })
      }
  authListener(){
    fire.auth().onAuthStateChanged((user)=>{
      if(user){
        
        
        this.setState({user});
      } else {
        this.setState({user:null});
      }
    });
  }
      componentDidMount() {
        this.authListener();
        this.getLocation()
        .then((loc)=>{ 
          const rev = reverse.lookup(loc.lat, loc.lng, 'us');
          this.setState({
            city:rev.city,
            state: rev.state,
            zip: rev.zipcode,
          })
        })
        .catch(function(err) { console.log("No location"); });
        
      }
      
      async getLocation(callback){
        var promise = new Promise((resolve, reject)=>{
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position)=>{
                      resolve({lat:position.coords.latitude ,lng:position.coords.longitude})
                  }
                );
            } else {
              reject({lat:33.597332, lng:-117.194943});
            }
        });
    
        return promise;
    }
      handleInput(event){
        const target = event.target;
        this.setState({
          [target.name]: target.value
        });
      }
    
      handleSubmit(event){
        event.preventDefault();
        console.log("Submit button is pressed");
        this.hideAll();
        if(this.state.city !== ''){
          console.log(`inside if statement: ${this.state.city}`);
          
          if (this.state.what !== '' && this.state.where !== '') 
            this.props.history.push(`/search?what=${this.state.what}&where=${this.state.where}`);
          else if (this.state.what !== '' && this.state.where === '') 
            this.props.history.push(`/search?what=${this.state.what}&where=${this.state.zip}`);
          else if(this.state.what === '' && this.state.where !== '')  
            this.props.history.push(`/search?what=all&where=${this.state.where}`);
          else                                                        
            this.props.history.push(`search?what=all&where=${this.state.zip}`);
          
            if(this.state.searchActive){this.setState({ searchActive:false });}
          this.forceUpdate();
        }
        
      }
      //If user is in protected route, send home. Else, leave user on currect page.
      signout(){
        fire.auth()
            .signOut()
            .catch(err=>console.log(err));
        
        if(this.props.location.pathname === "/createNewLocal"){
          this.props.history.push('/');
        }
        this.hideAll();
      }
      
      logButton(b, c){
        return(
          this.state.user ?
          (
            <div className="level-right">
              <div className="level-item">
                <Link className="button has-background-primary-light" to={`/createNewLocal`}>
                  <i className="fas fa-plus-circle"></i>
                </Link> 
              </div> 
              <div className="level-item">
                <button className="button is-primary" onClick={this.signout}> 
                <i className="fas fa-door-open"></i>
                </button>
              </div>
            </div>
          ):(
            <div className="level-right">
              <div className="level-item">
                <div className={`dropdown is-right ${b === 'mobile' ? null : 'is-hoverable'} ${this.state.loginActive ? 'is-active':null}`}>
                  <div className="dropdown-trigger">
                    <button className="button is-primary" onClick={this.displayLogin}> 
                      <i className="fas fa-door-closed"></i>
                    </button>
                  </div>
                  <div className={`dropdown-menu ${c}`} id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                      <div className="dropdown-item">
                        <Login/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        );
      }
      
      toggleSearch(){
        const currentState = this.state.searchActive;
        this.setState({searchActive: !currentState})
      }
    render() {
      return (
        <div>
          {/* Navbar for non-mobile devices */}
          <div className="is-hidden-mobile">
            <nav className="navbar level pr-2 pl-2 pt-1 is-fixed-top" role="navigation">
              <div className="level-left">
                <div className="level-item">
                  <Link to="/" onClick={this.hideAll}>
                    <img src={IOM} alt="localsonly-logo"/>
                  </Link>
                </div>
                <div className="level-item">
                  <div className="field has-addons">
                    <p className="control">
                      <input type="text" className="input" placeholder="What to do?" name="what" value={this.state.what} onChange={this.handleInput} />
                    </p>
                    <p className="control">
                      <input type="text" className="input" placeholder="Where to go?" name="where" value={this.state.where} onChange={this.handleInput} />
                    </p>
                    <p className="control">
                      <button className="button is-primary" onClick={this.handleSubmit}>
                      <i className="fas fa-search-location"></i>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
                  {this.logButton("desktop","is-one-quarter-width")}
            </nav>
            
          </div>

          {/* Navbar for mobile devices */}
          <div className="is-hidden-tablet">
            <nav className="navbar level pr-2 pl-2 pt-1 is-fixed-top is-mobile is-centered" role="navigation" aria-label="dropdown navigation">
                <div className="level-left">
                  <button className="level-item" onClick={this.hideAll}>
                    <Link to="/">
                      <img src={IOM} alt="localsonly-logo"/>
                    </Link>
                  </button>

                    
                  <div className="level-item">
                    <div className={`dropdown ${this.state.searchActive ? 'is-active':null}`}>
                      <div className="dropdown-trigger">
                      <button className="button is-primary" onClick={this.displaySearch}><i className="fas fa-search-location"></i></button>
                      </div>
                      <div className="dropdown-menu is-full-width" id="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                          <div className="dropdown-item">
                            <div className="field has-addons">
                              <p className="control">
                                <input type="text" className="input" placeholder="What to do?" name="what" value={this.state.what} onChange={this.handleInput} />
                              </p>
                              <p className="control">
                                <input type="text" className="input" placeholder="Where to go?" name="where" value={this.state.where} onChange={this.handleInput} />
                              </p>
                              <p className="control">
                                <button className="button is-primary" onClick={this.handleSubmit}>
                                <i className="fas fa-search"></i>
                                </button>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {this.logButton("mobile", "is-three-quarters-width")}
            </nav>
          </div>
        </div>
      )
    }
}

export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(withRouter(Search));
