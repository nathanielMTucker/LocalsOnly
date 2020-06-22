import React, { Component } from 'react'
import Search from './Components/Search/Search';
import Results from './Pages/Results/Results';
import Home from './Pages/Home/Home';
import Local from './Pages/Local/Local';
import NewLocal from './Pages/NewLocal/NewLocal';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import fire from './config/fire';
import './App.scss';


class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      user:{},
    }
  }
  componentDidMount() {
    this.authListener();
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
  
  render(){
    return (
      
      <Router>
        <Search/>
        <Switch>
            <Route exact path={"/"} component={Home}/>
            <Route path={"/search"} component={Results}/>
            <Route path={"/local"} component={Local}/>
            <Route path={"/createNewLocal"} component={NewLocal}/>
          </Switch>
      </Router>
      
    )
  }
}

export default App;


