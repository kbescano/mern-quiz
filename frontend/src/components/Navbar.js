import React from 'react'
import {logo} from '../data/data'

const Navbar = () => {


    return (
        <header>
            <img src={logo[1].image} alt="" />
            <div className='nav'>
            <div className='nav__logo'>
            <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_XRf80W.json"  background="transparent"  speed="1"  style={{width: "100px", height: "100px"}}  loop  autoplay></lottie-player>
            </div>
            <div className='nav__links'>
               <button>Login</button>
            </div>
            </div>
        </header>
    )
}

export default Navbar
