import React from 'react'

export default ({loading, children, className})=> {
    return (
        <div className={className}>
            {loading? <div className="loading">
                <progress className="progress is-large is-primary" max="100">15%</progress>
                <p>Wait while we search</p>
            </div>:
            children}
        </div>
    )
}
