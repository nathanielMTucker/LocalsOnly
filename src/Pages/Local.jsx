import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import './Local.css';
import MapContainer from '../Components/MapContainer';
import Desc from '../Components/LocalDescription';
import Rating from '@material-ui/lab/Rating'
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

const Dollar = withStyles({

})(Rating)
export default class Local extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:'',
            items:{},
            address:{},
            loading:true,
            page:null
        }
    }
    async componentDidMount() {
        let id = queryString.parse(this.props.location.search).id;

        this.setState({ 
                id:id,
            }
        ,()=>{this.loadItems();})
    }
    async getData(){
        await axios.get(`http://localhost:5000/locals/${this.state.id}`)
            .then((res)=>{
                    console.log("Postal courier has delivered your package!");
                    const data = res.data;
                    console.log(data);
                    this.setState({ 
                            items:data, 
                            address:data.address,
                            loading: false 
                        }
                    );
                }
            )
            .catch((err)=>{console.log(`Postal courier has vanished!: ${err}`);});
    }
    isClosed(d){
        const day = this.state.items.hours[d];
        return ((day.closed || day.to==='') ? 'closed' : `${day.from} - ${day.to}`)
    }
    async loadItems(){
        await this.getData();
        var item = this.state.items;
        var address = this.state.address;
         
        this.setState({page:
        <section className="section">
           <div className="columns">
                <div className="column">
                    <div className="">
                        <Desc item={item}/>
                    </div>
                    <div className="columns is-centered">
                        <div className="column">
                                <h1 className="subtitle">Rating</h1>
                                <Rating readOnly name="read-only" value={this.state.items.rating}/>
                        </div>
                        <div className="column">
                        <h1 className="subtitle">Price</h1>
                            
                            <Dollar readOnly value={this.state.items.price} icon={<i className="fas fa-dollar-sign"></i>}/>
                        </div>
                    </div>
                    
                    
                </div>
                <div className="column">
                    <MapContainer zoom={16} markers={[{lat:item.lat, lng: item.lng}]} style={{position:'relative',height:'50vh', width:'100%'}}/>
                    <div className="columns">
                        <div className="column">
                            <h1 className="subtitle">
                                Address
                            </h1>
                            <p>{`${address.street},`}</p>
                            <p>{` ${address.city}, ${address.state} ${address.zip}`}</p>
                        </div>
                        <div className="column">
                            <h1 className="subtitle">
                                Hours
                            </h1>
                            {this.state.items.hours === undefined || this.state.hours === null ? 'No hours available':(
                                <>
                                <p>{`Monday:    ${this.isClosed('monday')}`}</p>
                            <p>{`Tuesday:   ${this.isClosed('tuesday')}`}</p>
                            <p>{`Wednesday: ${this.isClosed('wednesday')}`}</p>
                            <p>{`Thursday:  ${this.isClosed('thursday')}`}</p>
                            <p>{`Friday:    ${this.isClosed('friday')}`}</p>
                            <p>{`Saturday:  ${this.isClosed('saturday')}`}</p>
                            <p>{`Sunday:    ${this.isClosed('sunday')}`}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
           </div>
        </section>
        })
    }
    render() {
        return (
            <div className="local">
                {this.state.page}
            </div>
        )
    }
}
