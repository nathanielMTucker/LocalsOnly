import React, { Component } from 'react';
import axios from 'axios';
// import {TEST} from '../../globals';
import ResultsCard from '../../Components/ResultsCard';
import './results.scss';
import queryString from 'query-string';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export default class Results extends Component {
    constructor(props){
        
        super(props);
        this.state = {
            what: [],
            where: [],
            items: [],
            loading: true,
            
        }
    }
    
    componentDidMount(){
        let values = queryString.parse(this.props.location.search);
        
        this.setState({ 
                what:values.what,
                where:values.where 
            },
        ()=>{ this.getData();})
        
       
        
    }
    componentDidUpdate(){
        let values = queryString.parse(this.props.location.search);
        if(this.state.what !== values.what || this.state.where !== values.where){
            this.setState({ 
                    what:values.what,
                    where:values.where,
                    loading:true
                }
            )
            window.location.reload();
        }
    }
    getData(){
        axios.get(`locals/hashtags/${this.state.what}/address/${this.state.where}`)
            .then((res)=>{
                    console.log("Postal courier has delivered your package!");
                    const data = res.data;
                    this.setState({ items:data, loading: false });
                }
            )
            .catch(()=>{console.log("Postal courier has vanished!");});
        
    }
    displayItems(posts){
        if(!posts.length) 
            return <div>Nothing to see here</div>;
        else
            return posts.map((post, index)=>(
            <ResultsCard 
                key={index}
                id={post._id}
                name={post.name} 
                description={post.description}
                rating={post.rating}
                reviewCount={post.reviewCount}
                image={undefined}
                />
            ));
    }
   
    render() {
        
        return (
            
            <div className="results">
                {this.state.loading? <div className="loading">
                    <ClimbingBoxLoader
                        size={30}
                        color={"#000000"}
                        loading={this.state.loading}
                    />
                    <p>Loading up good stuff</p>
                </div>:
                this.displayItems(this.state.items)}
            </div>
            
        )
    }
}

