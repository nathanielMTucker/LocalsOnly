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
} from "react-router-dom";
import './App.scss';
import * as ROUTES from './Constants/routes';
import { withFirebase} from './Authentication';
import Registration from './Pages/Registration';
import axios from 'axios';
import {fromLatLng} from './globals';
import {compose} from 'recompose';
import { geolocated } from "react-geolocated";
import {Opening} from './Pages/Opening';
const parseAddress = require('parse-address-string');

class App extends Component{
  constructor(props) {
    super(props);
 
    this.state = {
      authUser: null,
      location:'Tempe, Az'
    };
  }
 
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
    navigator.geolocation.getCurrentPosition(pos => {
      this.setLocation(pos);
    })
  }
  setLocation = async (loc)=>{
    await axios.get(fromLatLng(`${loc.coords.latitude},${loc.coords.longitude}`))
         .then(
           res=>{
             parseAddress(res.data.results[0].formatted_address,
              (err, add)=>{
                console.log(add.city);
                
                this.setState({location:`${add.city}, ${add.state}`})
              })
            }
          )
         .catch(error=>console.log(error))
  }
  componentWillUnmount() {
    this.listener();
  }
    render() {
      return (
      <>
      {this.state.authUser ? (
        <Router>
        <Nav authUser={this.state.authUser} loc={this.state.location}/>
        <Switch>
            <Route exact path={ROUTES.HOME} component={Home}/>
            <Route exact path={ROUTES.NEWLOCAL} component={NewLocal}/>
            <Route path={ROUTES.SEARCH} component={Results}/>
            <Route path={ROUTES.LOCAL} component={Local}/>
          </Switch>
      </Router>):(
        <Router>
        <Switch>
        <Route exact path={ROUTES.HOME} component={Opening}/>
        <Route exact path={ROUTES.SIGNUP} component={Registration}/>
        </Switch>
        </Router>
      )}
      </>
    )
  }
}

const app = compose(withFirebase)(App);

export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(app);