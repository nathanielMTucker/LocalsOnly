import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import './Local.css';
import MapContainer from '../Components/MapContainer';
import Desc from '../Components/LocalDescription';
import FileUpload from '../Components/FileUpload';
export default class Local extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:'',
            items:[],
            address:[],
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
        await axios.get(`https://localsonly-server.herokuapp.com/locals/${this.state.id}`)
            .then((res)=>{
                    console.log("Postal courier has delivered your package!");
                    const data = res.data;

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
                </div>
                <div className="column">
                    <MapContainer zoom={16} markers={[{lat:item.lat, lng: item.lng}]} style={{position:'relative',height:'50vh', width:'100%'}}/>
                    <h1 className="subtitle">
                        Address
                    </h1>
                    <p>{`${address.street}, ${address.city}`}</p>
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
