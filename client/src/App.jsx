import React, { useEffect, useState, Suspense, lazy } from "react";
import Nav from "./Components/Search/Nav";
import Footer from "./Components/Footer";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import * as ROUTES from "./Constants/routes";
import { withFirebase } from "./Authentication";

import axios from "axios";
import { compose } from "recompose";

import { withUser } from "./User";


import Opening from "./Pages/Opening";


// Pages
const Results = lazy(()=>import("./Pages/Results"));
const Home = lazy(()=>import("./Pages/Home"));
const Local = lazy(()=>import("./Pages/Local"));
const NewLocal = lazy(()=>import("./Pages/NewLocal"));
const Registration = lazy(()=>import("./Pages/Registration"));
const Profile = lazy(()=>import("./Pages/Profile"));
const Upcoming = lazy(()=>import("./Pages/Upcoming"));
const ImageUpload = lazy(()=>import("./Pages/ImageUpload"));
const EditProfile = lazy(()=>import("./Pages/EditProfile"));
const LocalImages = lazy(()=>import("./Pages/LocalImages"));

export default compose(
  withFirebase,
  withUser
)(({firebase, user}) => {
  const [madeSearch, setMadeSearch] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const abortController = new AbortController();

  const setUser = (res) => {
    console.log(res);
    const {data} = res
    user.set({
      ownerID: data._id,
      name: data.name,
      email: data.email,
      localTo: data.localTo,
      role: data.role,
      softLocalTo: data.softLocalTo,
      avatar: data.avatar.data,
      handler: data.handle
    });
    setUserInfo(data);
    console.log(user);
  };

  const setAuth = (auth) => {
    setAuthUser(auth);
    if (auth) {
      axios
        .get(`/api/v1/users/auth/${auth.uid}`)
        .then(res=>{
          console.log(res);
          setUser(res)
        })
        .catch((err) => {
          setUserInfo(null);
        });
    }
  };

  

  useEffect(() => {
    const loc = window.location.href + "";
    
    if (!loc.includes("localhost") && loc.includes("http://"))
      window.location.href = loc.replace("http://", "https://");

    const listener = firebase.auth.onAuthStateChanged(setAuth);
    
    return async function cleanup() {
      console.dir(authUser);
      console.dir(userInfo)
      await listener();
      
      abortController.abort();
    };
  },[]);

  if (authUser && userInfo)
    return (
      <Router>
          <Nav setMadeSearch={setMadeSearch} />
        <Suspense fallback={<div className="section content columns box" style={{minHeight:"100vh"}}>Loading...</div>}>
          <Switch>
            <Route exact path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.NEW_LOCAL} component={NewLocal} />
            <Route
              path={ROUTES.SEARCH}
              component={() => (
                <Results setMadeSearch={setMadeSearch} madeSearch={madeSearch} />
              )}
            />
            <Route path={ROUTES.UPLOAD_IMAGE} component={ImageUpload}/>
            <Route path={ROUTES.LOCAL + "/images"} component={LocalImages}/>
            <Route path={ROUTES.LOCAL} component={Local} />
            <Route exact path={ROUTES.PROFILE} component={Profile} />
            <Route path={ROUTES.PROFILE + "/edit"} component={EditProfile}/>
            <Route path={"/upcoming-features"} component={Upcoming} />
            <Route render={() => <Redirect to={ROUTES.HOME} />} />
          </Switch>
        </Suspense>
        <Footer/>
      </Router>
    );

  return (
    <Router>
        <Switch>
          <Route exact path={ROUTES.HOME} component={()=><Opening setUser={setUser}/>} />
      <Suspense  fallback={<div className="columns is-centered">
        <div className="column">Loading...</div>
        </div>}>
          <Route path={ROUTES.SIGNUP} component={Registration} />
      </Suspense>
        </Switch>
    </Router>
  );
});
