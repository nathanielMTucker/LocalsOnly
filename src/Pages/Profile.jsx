import React from 'react'

export default ({user}) => {
    return (
        <div>
            <p>Name: {user.name}</p>
            <p>ID: {user.authID}</p>
        </div>
    )
}
