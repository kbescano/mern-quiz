import React, { useState , useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userAction'




const Navbar = ({logo, speed}) => {


    const [click, setClick] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin

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
            <div className='nav__links' >
              <div  onClick={handleClick}>
            <lottie-player src="https://assets2.lottiefiles.com/temp/lf20_hUIoYZ.json"  background="transparent" speed={speed} style={{width: "100px", height : "100px"}}  loop  autoplay></lottie-player></div>
            </div>
            </div>
            {!click ? (<div></div>) : (
          <section className={click ? 'sidebar active' : 'sidebar'} >
            <div className='sidebar__links--x' onClick={handleClick}><i className='fas fa-times' /></div> 
            <div className='sidebar__links'>
              <Link to='/'><p>Home</p></Link>
              {/* <Link to='/scores'><p>Scores</p></Link> */}
              {userInfo && userInfo.isAdmin ? (
                <>
                <Link to='/admin/create'><p>Create Quiz</p></Link>
                {/* <Link to='/admin/userlist'><p>User list</p></Link> */}
                <Link to='/admin/quizlist'><p>Quiz list</p></Link>
                {/* <Link to='/admin/scores'><p>Scores list</p></Link> */}
                </>
              ) : ''}
              {userInfo ? (<Link to='/'><button className='sidebar__links--button' onClick={logoutHandler}>Logout</button></Link>):(<Link to='/login'><button className='sidebar__links--button' >Login</button></Link>)}
            </div>
          </section>
        )}
        </header>
    )
}

export default Navbar
