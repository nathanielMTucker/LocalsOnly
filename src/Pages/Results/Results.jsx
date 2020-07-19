import React, { Component } from 'react';
import axios from 'axios';
import ResultsCard from '../../Components/ResultsCard/ResultsCard';
import './Results.scss'
import queryString from 'query-string';
import MapContainer from '../../Components/MapContainer';
import R from '../../Components/Results';
import {Link} from 'react-router-dom';

export default class Results extends Component {
    constructor(props){
        
        super(props);
        this.state = {
            what: [],
            where: [],
            items: [],
            loading: true
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.getData = this.getData.bind(this);
        this.displayItems = this.displayItems.bind(this);
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
    async getData(){
        axios.get(`http://localhost:5000/locals/hashtags/${this.state.what}/address/${this.state.where}`)
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
            return (<div>
                <p className="subtitle">
                    We could not find anything in the database!
                </p>
                <p>You can help by adding new locals</p>
                <Link className="button" to='/createNewLocal'>
                    <i className="fas fa-plus-circle">Localize</i>
                </Link>
            </div>);
        else
            return posts.map((local, index)=>{
                
            return <ResultsCard 
                key={index}
                i={index++}
                id={local.id}
                name={local.name}
                description={local.description}
                rating={local.rating}
                reviewCount={local.reviewCount}
            />
            });
    }
   getMarkers = ()=>{
       let markers = []
       this.state.items.forEach((item, index) => {
        markers.push({lat:item.lat, lng:item.lng, })
    })
    
    return markers;
   }
   
    render() {
        return (
            <div id="results" className="columns pt-1">
                <R loading={this.state.loading}>
                    {this.displayItems(this.state.items)}
                </R>
                <div id="map" className="column container is-medium is-hidden-mobile">
                    <MapContainer 
                       zoom={16} markers={this.getMarkers()} 
                    />
                </div>
            </div>
        )
    }
}

