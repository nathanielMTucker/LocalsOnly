import React from 'react'
import '../App.scss';
import SignIn from '../Components/SignIn';
const IOM = require('../img/LocalsOnly.png')
export const Opening = () => {
    return (
        <div className="opening is-centered">
            <div className="column">
                <img className="logo" src={IOM} alt=""/>
                <SignIn/>
            </div>
        </div>
    )
}
