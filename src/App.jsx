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

    

    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      if(authUser){
        this.setState({authUser:authUser})
        axios.get(`/api/getUsers?auth=${authUser.uid}`)
          .then((res)=>{
            const data = res.data;
            this.props.USER.set({
              ownerID : data._id,
              name: data.name,
              email: data.email,
              localTo: data.localTo,
              role : 'admin',
              softLocalTo : data.softLocalTo
            })
            console.log(data);
            this.setState({userInfo:data});
          })
          .catch(err=>{
            // alert("User Error: 404 - Please update info from dashboard");
            // axios.post(`${0}/user`,{
            //   authID: authUser.uid,
            //     email:'',
            //     name: '',
            //     localTo: '',
            // })
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
  
  async componentWillUnmount() {
    await this.listener();
    this.abortController.abort();
  }
  
    render() {
      return (
      <>
      {this.state.authUser && this.state.userInfo ? (
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
const app = compose(withFirebase, withUser)(App);

export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(app);