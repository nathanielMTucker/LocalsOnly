import React from 'react';

export const ServerContext = React.createContext(null);

export const withServer = Component => props => (
    <ServerContext.Consumer>
      {server => <Component {...props} server={server} />}
    </ServerContext.Consumer>
  );

export default class Server{
    constructor(){
        this.server = ''
    }

    set(server){
      this.server = server;
    }
}