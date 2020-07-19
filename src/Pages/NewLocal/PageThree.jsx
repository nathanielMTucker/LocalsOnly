import React from 'react' 

export default props => {
    const [rating, setRating] = React.useState(1)
    const [price, setPrice] = React.useState(1)
    const [charCount, setCharCount] = React.useState(150);
    const [desc, setDesc] = React.useState("");
    const changeCharCount = e=>{
        setDesc(e.target.value);
        setCharCount(150 - e.target.value.length);
    }
    
    return (
        <form id='page-three' className="form ">
            <div className="columns">
            <div className="column">
            <label className="label has-text-grey">
                Description
                <div className="control">
                    <textarea value={desc} onChange={changeCharCount} maxLength='150' rows='5' className="textarea" name="description" id="description" cols="30" required/>
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
                    <input type="number" value={rating} onChange={e=>{setRating(e.target.value)}} name="rating" min="1" max='5' className="input" required/>
                    </div>
                </label>
                <label className="label has-text-grey">Price
                    <div className="control">
                    <input type="number" value={price} onChange={e=>{setPrice(e.target.value)}} name="price" min="1" max='5' className="input" required/>
                    </div>
                </label>
                <label className="label has-text-grey">Tags</label>
            </div>
            </div>
            <div className="section is-pulled-right ">
            <div className="">
                <button onClick={props.changePage} value='4' className="pagination-previous">Back</button>
                <button name='next'  className="pagination-next">Finish</button>
            </div>
            </div>
        </form>
    )
}
