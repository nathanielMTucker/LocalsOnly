import './Welcome.scss';
import React, { Component } from 'react'

export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class: "welcome",
        }
        this.exit = this.exit.bind(this);
    }
    exit(){
        this.setState(
            { class: "exit" }
        )
    }
    render() {
        return (
            <section className={this.state.class}>
            <button onClick={this.exit}>x</button>
                <h1>Welcome To Locals Only!</h1>
                <p>The website is still under production, but feel free to look around.
                <br/>If you have any ideas or suggestions; please press here.</p>
                <button className="button is-logo">Contact</button>
                
            </section>
        )
    }
}


