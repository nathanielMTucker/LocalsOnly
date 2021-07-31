import React, { useEffect, useState } from "react";
import Nav from "./Components/Search/Nav";
import Results from "./Pages/Results";
import Home from "./Pages/Home";
import Local from "./Pages/Local";
import NewLocal from "./Pages/NewLocal";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import * as ROUTES from "./Constants/routes";
import { withFirebase } from "./Authentication";
import Registration from "./Pages/Registration";
import axios from "axios";
import { compose } from "recompose";
import Opening from "./Pages/Opening";
import Profile from "./Pages/Profile";
import { withUser } from "./User";
import Upcoming from "./Pages/Upcoming";
import ImageUpload from "./Pages/ImageUpload"
import 'bulma/css/bulma.min.css';
import EditProfile from "./Pages/EditProfile";

export default compose(
  withFirebase,
  withUser
)((props) => {
  const [madeSearch, setMadeSearch] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const abortController = new AbortController();

  const setUser = (res) => {
    const data = res.data;
    console.dir(data);
    props.user.set({
      ownerID: data._id,
      name: data.name,
      email: data.email,
      localTo: data.localTo,
      role: "admin",
      softLocalTo: data.softLocalTo,
      avatar: data.avatar.url
    });
    setUserInfo(data);
  };

  const setAuth = (auth) => {
    setAuthUser(auth);
    if (auth) {
      axios
        .get(`/api/v1/users/auth/${auth.uid}`)
        .then(setUser)
        .catch((err) => {
          setUserInfo(null);
        });
    }
  };

  useEffect(() => {
    const loc = window.location.href + "";

    if (!loc.includes("localhost") && loc.includes("http://"))
      window.location.href = loc.replace("http://", "https://");

    const listener = props.firebase.auth.onAuthStateChanged(setAuth);
    return async function cleanup() {
      await listener();
      abortController.abort();
    };
  }, []);

  if (authUser && userInfo)
    return (
      <Router>
        <Nav setMadeSearch={setMadeSearch} />
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
          <Route path={ROUTES.LOCAL} component={Local} />
          <Route exact path={ROUTES.PROFILE} component={Profile} />
          <Route exact path={ROUTES.PROFILE + "/edit"} component={EditProfile}/>
          <Route path={"/upcoming-features"} component={Upcoming} />
          <Route render={() => <Redirect to={ROUTES.HOME} />} />
        </Switch>
      </Router>
    );

  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.HOME} component={Opening} />
        <Route path={ROUTES.SIGNUP} component={Registration} />
      </Switch>
    </Router>
  );
});
