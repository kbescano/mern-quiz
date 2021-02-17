import React from 'react'
import {logo} from '../data/data'

const Loader = () => {
    return (
        <div className='loader'>
            <img src={logo[0].image} alt="" />
            <h2>Loading...</h2>
        </div>
    )
}

export default Loader
