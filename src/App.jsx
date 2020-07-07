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

class App extends Component{
  constructor(props) {
    super(props);
 
    this.state = {
      authUser: null,
    };
  }
 
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }
  componentWillUnmount() {
    this.listener();
  }
    render() {
      return (
      <Router>
        <Nav authUser={this.state.authUser}/>
        <Switch>
            <Route exact path={ROUTES.HOME} component={Home}/>
            <Route exact path={ROUTES.SIGNUP} component={Registration}/>
            <Route exact path={ROUTES.NEWLOCAL} component={NewLocal}/>
            <Route path={ROUTES.SEARCH} component={Results}/>
            <Route path={ROUTES.LOCAL} component={Local}/>
            
          </Switch>
      </Router>
    )
  }
}

export default withFirebase(App);


