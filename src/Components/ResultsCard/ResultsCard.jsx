import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './ResultsCard.scss';
import Footer from './Footer';
const IOM = require('../../img/LocalsOnly.png');

export default class ResultsCard extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
            display: 'none',
            arrow: "fa-angle-down"
        }

        this.rating = this.rating.bind(this);
        this.showDisplay = this.showDisplay.bind(this);
    }
    rating(rate){
        var r = [];
        for(var i = 0; i < rate; i++){
            r.push(
                <i key={i} className="fas fa-star"></i>
            );
        }
        return r;
    }
    showDisplay(){
        if(this.state.display === 'none'){
            this.setState(
                { display: 'block', arrow: "fa-rotate-180" }
            )
        }
        else if(this.state.display === 'block'){
            this.setState(
                { display: 'none', arrow:"" }
            )
        }
    }
    render() {
        return (
            <div className="box">
                <article className="media">
                    <div className="media-left">
                        <figure className="image is-96x96">
                            {
                                this.props.image ?
                                    <img src={this.props.image} alt="LocalsOnly"/> :
                                    <img src={IOM} alt="LocalsOnly"/>
                            }
                        </figure>
                    </div>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>{this.props.name}</strong>
                                <br/>
                                {this.props.description}
                            </p>
                        </div>
                        <section className="pl-6 level content">
                            <div className="level-left">
                                <div className="icon has-text-info level-item">
                                    {this.rating(this.props.rating)}
                                </div>
                                <p className="pl-6 level-item">
                                    {this.props.reviewCount} {this.props.reviewCount === 1 ? "review" : "reviews"}
                                </p>
                            </div>
                        </section>
                    </div>
                    <div className="media-right">
                        <div className="columns">
                            <div className="rows">
                                <Link className="content row button is-primary is-outlined" to={`/local?id=${this.props.id}`}>View</Link>
                                <button className="button row is-dark">
                                    Order
                                </button>
                            </div>
                            
                        </div>
                        
                    </div>
                </article>
                <div className="card-footer mt-1" style={{display : this.state.display}}>
                    <Footer/>
                </div>
                <div className="columns is-centered">
                    <button className="column is-one-quarter outline-is-none" onClick={this.showDisplay}>
                        <i className={`outline-is-none fas ${this.state.arrow} fa-angle-down level-item`} > </i>
                    </button>
                </div>
            </div>
        )
    }   
}
