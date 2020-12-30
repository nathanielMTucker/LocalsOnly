import React from 'react'

export default ({sortOption, onSort}) => {
    const [isOpen, setIsOpen] = React.useState(true);
    const showFilters = (e)=>{
        setIsOpen(!isOpen);
    }
    return (
        <div id="search-engine-filter" className="">
            <div className="level columns">
            <div className="level-left column">
                <label className="label level-item">
                    Filters:<button onClick={showFilters}>{isOpen ? "open" : "close"}</button>
                </label>
            </div>
            <div className="level-right column">
                <label htmlFor="sort-options" className="level-item">
                    Sort:
                </label>
                <div className="control">
                    <div className="select">
                        <select name="sort-options" id="sort-options" value={sortOption} onChange={onSort}>
                            <option value="local-faves">Local Faves</option>
                            <option value="highest-rated">Highest Rated</option>
                            <option value="most-reviewed">Most Reviewed</option>
                        </select>
                    </div>
                </div>
            </div>
            </div>
            <div hidden={isOpen}>
            <label className="pl-1">
                21+<input type="checkbox"/>
            </label>
            <label className="pl-1">
                Family Friendly<input type="checkbox"/>
            </label>
            <label className="pl-1">
                Takeout<input type="checkbox"/>
            </label>
            <label className="pl-1">
                Dine-in<input type="checkbox"/>
            </label>
            <label className="pl-1">
                Delivery<input type="checkbox"/>
            </label>
            <label className="pl-1">
                Dog Friendly<input type="checkbox"/>
            </label>
            </div>
        </div>
    )
}
