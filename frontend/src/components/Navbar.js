import React, { useState , useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userAction'
import {toast} from 'react-toastify'



const Navbar = ({logo, speed}) => {

    const [click, setClick] = useState(false)
    const [dropdown, setDropdown] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin

    
      const dropHandler = () => {
        if (dropdown === true) {
          setTimeout(() => {
            setDropdown(false)
          }, 4000);
        }
        setDropdown(!dropdown)
      }
    
      const handleClick = () => {
        setClick(!click)
      }
    
      const logoutHandler = () => {
        dispatch(logout())
       
      }

    return (
        <header>
            <img src={logo} alt="" />
            <div className='nav'>
            <div className='nav__logo'>
            <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_XRf80W.json"  background="transparent" speed={speed}  style={{width: "100px", height: "100px"}}  loop  autoplay></lottie-player>
            </div>
            <div className='nav__links'>
            <lottie-player src="https://assets2.lottiefiles.com/temp/lf20_hUIoYZ.json"  background="transparent" speed={speed} style={{width: "100px", height : "100px"}}  loop  autoplay></lottie-player>
            </div>
            </div>
        </header>
    )
}

export default Navbar
