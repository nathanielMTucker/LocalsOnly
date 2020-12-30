import React from 'react'
const IOM = require('../img/LocalsOnly.png')
export default ({loading, children, className})=> {
    return (
        <div className={className}>
            
            {loading? <div className="loading has-text-centered">
                <div className="animate__slower animate__animated animate__pulse animate__infinite"><img alt="LocalsOnly" src={IOM}></img></div>
                <p>Wait while we search</p>
            </div>:
            children}
        </div>
    )
}
