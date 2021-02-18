import axios from 'axios'
import {toast} from 'react-toastify'
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from '../constants/userConstant'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: USER_LOGIN_REQUEST})

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post('https://mern-quiz.herokuapp.com/api/users/login', {
            email,
            password
        }, config)

        dispatch({type: USER_LOGIN_SUCCESS, payload: data})
        toast(`Welcome ${data.name}`)

        localStorage.setItem('userQuiz', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        toast.error(`Invalid Email or Password!`)
    }
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({type: USER_REGISTER_REQUEST})

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post('https://mern-quiz.herokuapp.com/api/users', {
            name,
            email,
            password
        }, config)

        dispatch({type: USER_REGISTER_SUCCESS, payload: data})

        dispatch({type: USER_LOGIN_SUCCESS, payload: data})

        toast('Thank you for register!')

        localStorage.setItem('userQuiz', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        toast.error(`${error.response.data.message}`)
    }
}


export const logout = () => (dispatch) => {

    localStorage.removeItem('userQuiz')
    dispatch({type: USER_LOGOUT})
    toast('Logged out Successfully')
}