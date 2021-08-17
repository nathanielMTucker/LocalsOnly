import React from 'react';
import { getCookie, setCookie } from "./globals";
import axios from 'axios';

export const UserContext = React.createContext(null);

export const withUser = Component => props => (
    <UserContext.Consumer>
      {user => <Component {...props} user={user} />}
    </UserContext.Consumer>
  );

const updateLocal = async (_id)=>{
    if(getCookie("local-update-on") === undefined && getCookie("local-update") !== undefined){
      console.log(getCookie("local-update"));
      await axios.patch(`/api/v1/users/${_id}/local-to`,{
        localTo:getCookie("local-update")
      }).then((res)=>{
        setCookie("local-update", "", -1);
      })
    }}

export default class User{
    constructor(){
        this.ownerID = "";
        this.email = "";
        this.name = "";
        this.localTo = "";
        this.softLocalTo = [];
        this.role = "";
        this.avatar = "";
        this.handler = "";
    }
    
    isSet(){
      return !!this.ownerID;
    }
    
    isLocalTo(local){
      return !local.localsOnly || `${local.address.state}:${local.address.city.replace(" ","_")}` === this.localTo || this.isUnrestricted()
    }

    isUnrestricted(){
      return this.role !== "user"
    }
    
    set(user){
      this.ownerID = user.ownerID;
      this.email = user.email;
      this.name = user.name;
      this.localTo = user.localTo;
      this.softLocalTo = user.softLocalTo;
      this.role = user.role;
      this.avatar = user.avatar;
      this.handler = user.handler;
      updateLocal(user.ownerID);
    }
}