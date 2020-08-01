import React from 'react'

export default props => {
    return (
        <div className="cards  column is-two-fifths side">
            {props.loading? <div className="loading">
                <progress className="progress is-large is-primary" max="100">15%</progress>
                <p>Wait while we search</p>
            </div>:
            props.children}
        </div>
    )
}
