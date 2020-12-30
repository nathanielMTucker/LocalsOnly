import React ,{useEffect, useState} from 'react'
import Nav from './Components/Search/Nav';
import Results from './Pages/Results/Results';
import Home from './Pages/Home';
import Local from './Pages/Local';
import NewLocal from './Pages/NewLocal/NewLocal';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.scss';
import * as ROUTES from './Constants/routes';
import { withFirebase} from './Authentication';
import Registration from './Pages/Registration';
import axios from 'axios';
import {compose} from 'recompose';
import Opening from './Pages/Opening';
import Profile from './Pages/Profile';
import {withUser} from './User';
import WelcomeAnimation from './Components/WelcomeAnimation'


export default compose(withFirebase, withUser)((props)=>{
  const [madeSearch, setMadeSearch] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const abortController = new AbortController();
  
  useEffect(()=>{
    const loc = window.location.href+'';
    
    if(!loc.includes('localhost') && loc.includes('http://'))
      window.location.href = loc.replace('http://','https://');

    const listener = props.firebase.auth.onAuthStateChanged(auth => {
      if(auth){
        setAuthUser(auth);
        axios.get(`/api/getUser?auth=${auth.uid}`)
          .then((res)=>{
            const data = res.data
            
            
            props.USER.set({
              ownerID : data._id,
              name: data.name,
              email: data.email,
              localTo: data.localTo,
              role : 'admin',
              softLocalTo : data.softLocalTo
            })
            setUserInfo(data);
          }).catch(err=>{
            setUserInfo(null)
          })
      }else{
        setAuthUser(null)
      }
      })
    return async function cleanup(){
      await listener();
      abortController.abort();
    }
    
  },[])

      return (
      <>
      {authUser && userInfo ?(
        <div className="section pb-0">
          <Router>
            <Nav setMadeSearch={setMadeSearch}/>
            <Switch>
                <Route exact path={ROUTES.HOME} component={Home}/>
                <Route path={ROUTES.NEWLOCAL} component={NewLocal}/>
                <Route path={ROUTES.SEARCH} component={()=><Results setMadeSearch={setMadeSearch} madeSearch={madeSearch}/>}/>
                <Route path={ROUTES.LOCAL} component={Local}/>
                <Route path={ROUTES.PROFILE} component={Profile}/>
                <Route render={() => <Redirect to={ROUTES.HOME}/>}/>
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
  )

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


