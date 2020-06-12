import React, { Component } from 'react';
import axios from 'axios';
import './Local.scss';
import queryString from 'query-string';
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
        let id = await queryString.parse(this.props.location.search).id;

        this.setState({ 
                id:id,
            }
        ,()=>{this.loadItems();})
    }
    async getData(){
        await axios.get(`locals/${this.state.id}`)
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
        
        this.setState({page:<section>
            <h1>{item.name}</h1>
            <h3>{item.description}</h3>
            <p>{address.street}</p>
            <p>{address.city}</p>
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
