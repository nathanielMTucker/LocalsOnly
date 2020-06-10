import React, { Component } from 'react'
import Search from './Components/Search';
import Results from './Pages/Results/Results';
import newLocal from './Pages/newLocal/newLocal';
import Home from './Pages/Home/Home';
import Local from './Pages/Local/Local';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends Component {
  render(){
    return (
      <Router>
        <Search/>
        <Switch>
          <Route exact path={"/"} component={Home}/>
          <Route path={"/search"} component={Results}/>
          <Route path={"/local"} component={Local}/>
          <Route path={"/create-local"} component={newLocal}/>
        </Switch>
      </Router>
    )
  }
}

export default App;


