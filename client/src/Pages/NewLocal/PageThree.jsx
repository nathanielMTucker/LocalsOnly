import React, {useState} from 'react' 
import Rating from '@material-ui/lab/Rating'

// import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'
import ImageUpload from '../../Components/ImageUpload';
// const cloudinary = require('cloudinary');

const Dollar = Rating;

export default ({details, setDetails, setImage ,image ,setLoading}) => {

    let {description, rating, price, tags} = details
    const [charCount, setCharCount] = useState(150);

    React.useEffect(() => {
        setCharCount(150-description.length)
    }, [description, tags])

    const onChange = e=>{
        const name = e.target.name;
        const value = e.target.value;
        setDetails({...details, [name]:value})
    }
    const onCheck = e =>{
        const name = e.target.name;
        const check = e.target.checked;
        setDetails({...details, [name]:check})
    }
    

    return (
            <>
            <nav className="pagination is-rounded is-centered" role="navigation" aria-label="pagination">
                        <ul className="pagination-list">
                            <li><span id='0' className="pagination-link " aria-label="Goto page 1">1</span></li>
                            <li><span id='1' className="pagination-link " aria-label="Goto page 2">2</span></li>
                            <li><span id='2' className="pagination-link is-current" aria-label="Goto page 3">3</span></li>
                        </ul>
                    </nav>
            <div className="columns">
            <div className="column">
            <label className="label has-text-grey">
                Description
                <div className="control">
                    <textarea 
                        value={description} onChange={onChange} 
                        maxLength='150' rows='3' 
                        className="textarea" name="description" 
                        id="description" cols="30" required
                    />
                </div>
                <div className="level">
                    <div className="level-left"></div>
                    <div className="level-right">
                        <div className="level-item">
                            <small className="help">{`${charCount} characters remaining`}</small>
                        </div>
                    </div>
                </div>
            </label>
            <label className="label has-text-grey">Photos
                <div className="file has-name is-boxed">
                    <label className="file-label">
                        <ImageUpload setImage={setImage} image={image} setLoading={setLoading}/>
                    </label>
                </div>
            </label>
            <label className="label has-text-grey">
                   Locals Only: <input onChange={onCheck} name="localsOnly" type="checkbox"/>
                   <small className="help has-text-info">
                       Place will <strong><u className="has-text-info">only</u></strong> be viewed by locals
                   </small>
                </label>
            </div>
            <div className="column">
            
                <label className="label has-text-grey">
                    Rating
                    <div className="control">
                    <Rating name="rating" value={rating} onChange={onChange}/>
                    </div>
                </label>
                <label className="label has-text-grey">Price
                    <div className="control">
                    <Dollar name="price" value={price} onChange={onChange} icon={<i className="fas fa-dollar-sign"></i>}/>
                    </div>
                </label>
                
                
                <label className="label has-text-grey">
                    Amenities
                <div className="columns">
                    <div className="column">
                        <ul>
                            <li>
                                <label className="label">
                                    Dine-In: <input onChange={onCheck} name="dinein" type="checkbox" className="checkbox"/>
                                </label>
                            </li>
                            <li>
                                <label className="label">
                                    Take-Out: <input onChange={onCheck} name="takeout" type="checkbox" className="checkbox"/>
                                </label>
                            </li>
                            <li>
                                <label className="label">
                                    Delivery: <input onChange={onCheck} name="delivery" type="checkbox" className="checkbox"/>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className="column">
                        <ul>
                            <li>
                                <label className="label">
                                    Family Friendly: <input onChange={onCheck} name="family" type="checkbox" className="checkbox"/>
                                </label>
                            </li>
                            <li>
                                <label className="label">
                                    21+: <input onChange={onCheck} name="adult" type="checkbox" className="checkbox"/>
                                </label>
                            </li>
                            <li>
                                <label className="label">
                                    Dog Friendly: <input onChange={onCheck} name="dog" type="checkbox" className="checkbox"/>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                </label>
                
            </div>
            
            </div>
            </>
            
    )
}
