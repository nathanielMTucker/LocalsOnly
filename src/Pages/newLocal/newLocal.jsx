import React, { Component } from 'react'
import axios from 'axios';
import './newLocal.scss';
import StarRatings from 'react-star-ratings';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

export default class newLocal extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'', 
            description:'',
            street : '',
            apt : '',
            city:'',
            state:'',
            zip:'',
            hashtags:[],
            rating:1,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTag = this.handleTag.bind(this);
        this.changeRating = this.changeRating.bind(this);
    }

    handleChange(event){
        let target = event.target;
        this.setState({
            [target.name]: target.value
        });
    }

    

    handleAddress(event){
        let target = event.target;
        this.setState({
            [target.name]: target.value 
        });
    }
    handleTag(tags){
        this.setState({hashtags:tags});
        console.log(this.state.hashtags);
    }
    
    async handleSubmit(event){
        event.preventDefault();

        axios.post(`locals/`,{
            name:        this.state.name,
            description: this.state.description,
            address: {
                street:  this.state.street,
                apt:     this.state.apt,
                city:    this.state.city,
                state:   this.state.state,
                zip:     this.state.zip
            },
            hashtags:    this.state.hashtags,
            rating:      this.state.rating
        })
            .then((res)=>{
                alert(`${this.state.name} has been Localized\nThank you!`);
                this.props.history.push('/');
            })
            .catch(err=>{
                alert("Unable to create new local, please try again later");
                console.log(`In axio post newLocal: ${err}`);
                this.props.history.push('/');
            });
    }
    changeRating( newRating, name ) {
      this.setState({
        rating: newRating
      });
    }
    render() {
        return (
            <div>
            
                <form className="form-add" onSubmit={this.handleSubmit}>
                    <div className="field">

                        <label className="label">Local<span className="help is-danger">*</span></label>
                        <div className="control">
                            <input required={true} name="name" placeholder="Name of Local" type="text"  className="input" value={this.state.name} onChange={this.handleChange}/>
                        </div>
                   
                            <div className="control addr">
                                <label className="label">Street<span className="help is-danger">*</span></label>
                                <input placeholder="123 Main Street" required={true} name="street" type="text" className="input" value={this.state.street} onChange={this.handleAddress}/>
                                
                                <label className="label">Apt/Bld #</label>
                                <input placeholder="2A" name="apt" type="text" className="input" value={this.state.apt} onChange={this.handleAddress}/>
                                
                                <label className="label">City/Town<span className="help is-danger">*</span></label>
                                <input placeholder="Pheonix" required={true} name="city" type="text" className="input" value={this.state.city} onChange={this.handleAddress}/>
                                
                                <label className="label">State<span className="help is-danger">*</span></label>
                                <input placeholder="Arizona" required={true} name="state" type="text" className="input" value={this.state.state} onChange={this.handleAddress}/>
                                
                                <label className="label">Postal Code<span className="help is-danger">*</span></label>
                                <input placeholder="85251" required={true} name="zip" type="text" className="input" value={this.state.zip} onChange={this.handleAddress}/>
                            </div>
            
                        <label className="label">Description<span className="help is-danger">*</span></label>
                        <div className="control">
                            <textarea name="description" className="input" id="desc" value={this.state.description} onChange={this.handleChange}/>
                        </div>

                        <label className="label">Rating</label>
                        <StarRatings
                            rating={this.state.rating}
                            starRatedColor="red"
                            changeRating={this.changeRating}
                            numberOfStars={5}
                            name='rating'
                        />
                        <label className="label">Tags</label>
                        <div className="hashtags">
                            <TagsInput value={this.state.hashtags} onChange={this.handleTag} />
                        </div>
                    </div>
                    <button className="button is-success" type="submit">Submit</button>
                    <small><span className="help is-danger">*</span> required items</small>
                </form>
            </div>
        )
    }
}
