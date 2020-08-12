import React, {Component} from 'react'
import Nav from './Components/Search/Nav';
import Results from './Pages/Results/Results';
import Home from './Pages/Home';
import Local from './Pages/Local';
import NewLocal from './Pages/NewLocal/NewLocal';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import './App.scss';
import * as ROUTES from './Constants/routes';
import { withFirebase} from './Authentication';
import Registration from './Pages/Registration';
import axios from 'axios';
import {fromLatLng} from './globals';
import {compose} from 'recompose';
import { geolocated } from "react-geolocated";
import Opening from './Pages/Opening';
import Profile from './Pages/Profile';
import {withUser} from './User';
import {withServer} from './Server';
const config = require('./config');
let server;
const parseAddress = require('parse-address-string');

class App extends Component{
  constructor(props) {
    super(props);
 
    this.state = {
      authUser: null,
      userInfo: null,
      location:'Tempe, Az'
    };
  }
  
    abortController = new AbortController();
  
  async componentDidMount() {
    const loc = window.location.href+'';
    
    if(process.env.REACT_APP_ENVIRONMENT === "production" && loc.indexOf('http://') === 0)
      window.location.href = loc.replace('http://','https://');

    server = config[process.env.REACT_APP_ENVIRONMENT].server
    this.props.server.setServer(server);

    this.listener = await this.props.firebase.auth.onAuthStateChanged(authUser => {
      if(authUser){
        this.setState({authUser:authUser})
        axios.get(`${server}/user/${authUser.uid}`, {signal:this.abortController.signal})
          .then(res=>{
            this.props.USER.setUser(res.data[0])
          })
      }else{
        this.setState({authUser:null})
      }
      })
    
    navigator.geolocation.getCurrentPosition(pos => {
      this.setLocation(pos);
    })
  }

  setLocation = async loc =>{
    await axios.get(fromLatLng(`${loc.coords.latitude},${loc.coords.longitude}`))
         .then(
           res=>{
             parseAddress(res.data.results[0].formatted_address,
              (err, add)=>{
                this.setState({location:`${add.city}, ${add.state}`})
              })
            }
          )
         .catch(error=>console.log(error))
  }
  
  componentWillUnmount() {
    this.listener();
    this.abortController.abort();
  }
  
    render() {
      return (
      <>
      {this.state.authUser ? (
        <div className="section">
          <Router>
            <Nav authUser={this.state.authUser} loc={this.state.location}/>
            <Switch>
                <Route exact path={ROUTES.HOME} component={Home}/>
                <Route path={ROUTES.NEWLOCAL} component={NewLocal}/>
                <Route path={ROUTES.SEARCH} component={Results}/>
                <Route path={ROUTES.LOCAL} component={Local}/>
                <Route path={ROUTES.PROFILE} component={Profile}/>
              </Switch>
        </Router>
        </div>
       ):(
        <Router>
          <Switch>
            <Route exact path={ROUTES.HOME} component={Opening}/>
            <Route path={ROUTES.SIGNUP} component={Registration}/>
          </Switch>
        </Router>
      )}
      </>
    )
  }
}

// const ProtectedRoute = ({auth, component:Component, ...rest})=>{
//   return(
//     <Route
//     {...rest}
//     render ={()=>auth?(
//       <Component/>
//     ):(
//       <Redirect to={ROUTES.HOME}/>
//     )}
    
//     />
//   )
// }
const app = compose(withFirebase, withUser, withServer)(App);

export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(app);