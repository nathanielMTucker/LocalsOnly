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
      // console.log(getCookie("local-update"));
      await axios.patch(`/api/v1/users/${_id}/local-to`,{
        localTo:getCookie("local-update")
      }).then((res)=>{
        setCookie("local-update", "", -1);
      })
    }}

export default class User{
    #ownerID;
    #email;
    #name;
    #localTo;
    #role;
    #avatar;
    #handler;

    constructor(){
        this.#ownerID = "";
        this.#email = "";
        this.#name = "";
        this.#localTo = "";
        this.#role = "";
        this.#avatar = [];
        this.#handler = "";
    }
    
    getID=()=>this.#ownerID;
    getEmail=()=>this.#email;
    getName=()=>this.#name;
    getLocalTo=()=>this.#localTo;
    getRole=()=>this.#role;
    getAllAvatars=()=>this.#avatar;
    getAvatar=()=>{
      // console.log(this.#avatar);
      if(Array.isArray(this.#avatar) && this.#avatar.length && 'url' in this.#avatar[0]){
        return this.#avatar[0].url;
      }
      return null
    };
    getHandler=()=>this.#handler;
    
    isSet=()=>{
      console.log(!!this.getID());
      return !!this.getID();
    }
    
    isLocalTo(local){
      return local && (!local.localsOnly || this.isLocalToCity(local.address.state, local.address.city.replace(" ","_")))
    }

    isLocalToCity(state, city){
      if(state.length !== 2){
        throw new Error("State must be 2 digit code")
      }
      return `${state.toLowerCase()}:${city.replace(" ","_")}` === this.#localTo || !this.isRestricted()
    }

    isRestricted(){
      return this.getRole() === "user"
    }
    
    set(user){
      this.#ownerID = user.ownerID;
      this.#email = user.email;
      this.#name = user.name;
      this.#localTo = user.localTo;
      this.#role = user.role;
      this.#avatar = user.avatar;
      this.#handler = user.handler;
      console.log(this.getID());
      updateLocal(user.ownerID);
    }
}