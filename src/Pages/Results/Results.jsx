import React, { Component } from 'react';
import axios from 'axios';
import ResultsCard from '../../Components/ResultsCard/ResultsCard';
import './Results.scss'
import queryString from 'query-string';
import MapContainer from '../../Components/MapContainer/MapContainer';

export default class Results extends Component {
    constructor(props){
        
        super(props);
        this.state = {
            what: [],
            where: [],
            items: [],
            loading: true,
            map:{}
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.getData = this.getData.bind(this);
        this.displayItems = this.displayItems.bind(this);
        this.initMap = this.initMap.bind(this);
    }
    
    initMap(){
        
        
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
                    loading:true,
                    center:{
                        lat:59.95,
                        lng:30.33
                    },
                    zoom: 11
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
            <div className="results columns">
                <div className="cards column is-two-fifths container side">
                    {this.state.loading? <div className="loading">
                        <progress class="progress is-large is-primary" max="100">15%</progress>
                        <p>Wait while we search</p>
                    </div>:
                    this.displayItems(this.state.items)}
                </div>
                <div id="map" className="column container is-medium is-hidden-mobile">
                    <MapContainer/>
                </div>
            </div>
        )
    }
}

