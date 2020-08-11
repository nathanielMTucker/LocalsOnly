import React from 'react';

export const UserContext = React.createContext(null);

export const withUser = Component => props => (
    <UserContext.Consumer>
      {user => <Component {...props} USER={user} />}
    </UserContext.Consumer>
  );

export default class User{
    constructor(){
        this.email = "";
        this.name = "";
        this.localTo = "";
        this.softLocalTo = [];
        this.role = "";
    }

    setUser(user){
      this.email = user.email;
      this.name = user.name;
      this.localTo = user.localTo;
      this.softLocalTo = user.softLocalTo;
      this.role = user.role;
    }
}