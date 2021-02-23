import React from 'react'
import {useSelector} from 'react-redux'

const Footer = () => {

    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin

    return (<footer>
        <>
        {userInfo && (
          <p><i className="fas fa-user" />{userInfo.name}</p> 
        )}
        </>
    </footer>)
}

export default Footer
