import React from 'react' 

export default ({locals,setLocal,details, setDetails}) => {
    let {description, rating, price, imageName} = details
    const [charCount, setCharCount] = React.useState(150);
    
    React.useEffect(() => {
        setCharCount(150-description.length)
        
    }, [description])
    const onChange = e=>{
        const name = e.target.name;
        const value = e.target.value;
        setDetails({...details, [name]:value})
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
                <label className="label has-text-grey">
                    Rating
                    <div className="control">
                    <input type="number" value={rating} onChange={onChange} name="rating" min="1" max='5' className="input" required/>
                    </div>
                </label>
                <label className="label has-text-grey">Price
                    <div className="control">
                    <input type="number" value={price} onChange={onChange} name="price" min="1" max='5' className="input" required/>
                    </div>
                </label>
                <label className="label has-text-grey">Tags</label>
                <label className="label checkbox has-text-grey">
                    <small className="help checkbox">Only let locals see this page?</small>
                    <input value={locals} onChange={(e)=>{setLocal(e.target.checked)}} type="checkbox"/>
                </label>
            </div>
            </div>
            </>
            
    )
}
