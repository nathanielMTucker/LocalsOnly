import React from 'react' 
import Rating from '@material-ui/lab/Rating'
import { withStyles } from '@material-ui/core/styles';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'

const Dollar = withStyles({})(Rating);
export default ({locals,setLocal,details, setDetails}) => {
    let {description, rating, price, tags} = details
    const [charCount, setCharCount] = React.useState(150);
    const [tagsCount, setTagsCount] = React.useState(6);
    React.useEffect(() => {
        setCharCount(150-description.length)
        setTagsCount(6-tags.length)
    }, [description, tags])
    const onChange = e=>{
        const name = e.target.name;
        const value = e.target.value;
        console.log(`Name: ${name}, Value: ${value}`);
        setDetails({...details, [name]:value})
    }
    const onTags=(t)=>{
        console.log(t);
        
        setDetails({...details, tags:t})
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
                    <textarea value={description} onChange={onChange} maxLength='150' rows='3' className="textarea" name="description" id="description" cols="30" required/>
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
                    <input className="file-input" type="file" name="resume"/>
                    <span className="file-cta">
                    <span className="file-icon">
                        <i className="fas fa-upload"></i>
                    </span>
                    <span className="file-label">
                        Choose a file…
                    </span>
                    </span>
                    <span className="file-name">
                    Screen Shot 2017-07-29 at 15.54.25.png
                    </span>
                </label>
            </div>
            </label>
            </div>
            <div className="column">
            <label className="label has-text-grey">Tags
                    <div className="control">
                        <TagsInput maxTags={6} className="input" value={tags} name="tags" onChange={onTags} onlyUnique={true}/>
                    </div>
                    <div className="level">
                    <div className="level-left"></div>
                    <div className="level-right">
                        <div className="level-item">
                            <small className="help">{`${tagsCount} tags remaining`}</small>
                        </div>
                    </div>
                </div>
                </label>
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
                
                <label className="label checkbox has-text-grey">
                    <small className="help checkbox">Only let locals see this page?</small>
                    <input value={locals} onChange={(e)=>{setLocal(e.target.checked)}} type="checkbox"/>
                </label>
            </div>
            </div>
            </>
            
    )
}
