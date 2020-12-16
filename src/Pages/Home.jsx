import React, { Component } from 'react'
 import {withUser} from '../User';



class Home extends Component {
    constructor(props){
        super(props);

        this.Welcome = this.Welcome.bind(this);
    } 

    Welcome(){
        console.log(this.props.USER);
        const hour = new Date().getHours();
        let greeting = ""
        if(hour < 12 && hour >= 5){
            greeting = "Morning";
        }else if(hour >= 12 && hour <= 16){
            greeting = "Afternoon"
        }else{
            greeting = "Evening"
        }
        return `Good ${greeting}, ${this.props.USER.name}!`
    }
    render() {
        return (
            <div className="">
                <span className="container">
                    {this.Welcome()}
                </span>
            </div>
        )
    }
}

export default withUser(Home);