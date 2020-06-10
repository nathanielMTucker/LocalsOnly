import React from 'react'
import {STAR_PATH} from '.././globals';
import {Link} from 'react-router-dom';
const IOM = require('./LocalsOnly.png');
var a = 0;
var r = [];

let rating = (rate) =>{
    for(var i = 0; i < rate; i++){
        r.push(
            <svg key={a++} className="w-4 h-4 mx-px fill-current text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                <path  d={STAR_PATH}/>
            </svg>
        );
    }
    return r;
}

export default function ResultsCard(props) {
    return (
        <div className="flex items-center justify-center min-h-screen"> 
            <div className="max-w-md md:max-w-2xl px-2 min-w">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden md:flex">
                    <div className="bg-cover bg-bottom h-56 md:h-auto md:w-56 image-box">
                        {
                            props.image === undefined ? 
                            <img className="res-img" src={IOM} alt="LocalsOnly"/> 
                            : <img className="res-img" src={props.image} alt="LocalsOnly"/>
                        }
                    </div>
                    <div> 
                        <div className="p-4 md:p-5">
                            <p className="font-bold text-xl md:text-2xl">{props.name}</p>
                            <p className="text-gray-700 md:text-lg text-box-size">{props.description}</p>
                        </div>
                        <div className="p-4 md:p-5 bg-gray-100 minw grey-box">
                            <div className="sm:flex sm:justify-between sm:items-center">
                                <div >
                                    {/* <div className="text-lg text-gray-700"><span className="text-gray-900 font-bold">17</span> per person*</div> */}
                                    <div className="flex items-center">
                                        <div className="flex inline-flex -mx-px">
                                            {rating(props.rating)}
                                        </div>
                                        <div className="text-gray-600 ml-2 text-sm md:text-base mt-1">{props.reviewCount} {props.reviewCount === 1 ? 'review' : 'reviews'}</div>
                                    </div>
                                </div>
                                <Link to={`/local?id=${props.id}`}>
                                    <button className="mt-3 sm:mt-0 py-2 px-5 md:py-3 md:px-6 bg-indigo-700 hover:bg-indigo-600 font-bold text-white md:text-lg rounded-lg shadow-md">View</button>
                                </Link>
                                </div>
                            {/* <div className="mt-3 text-gray-600 text-sm md:text-base">*Prices may vary depending on selected date.</div> */}
                        </div>
                    </div>
                </div>
            </div>
            {r=[]}
        </div>
    )
}
