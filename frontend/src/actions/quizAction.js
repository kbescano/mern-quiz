import axios from 'axios'
import {toast} from 'react-toastify'
import { QUIZ_CREATE_FAIL, QUIZ_CREATE_REQUEST, QUIZ_CREATE_SUCCESS, QUIZ_DELETE_FAIL, QUIZ_DELETE_REQUEST, QUIZ_DELETE_SUCCESS, QUIZ_DETAILS_FAIL, QUIZ_DETAILS_REQUEST, QUIZ_DETAILS_SUCCESS, QUIZ_LIST_FAIL, QUIZ_LIST_REQUEST, QUIZ_LIST_SUCCESS, QUIZ_UPDATE_FAIL, QUIZ_UPDATE_REQUEST, QUIZ_UPDATE_SUCCESS, SCORE_SAVE_REQUEST } from "../constants/quizConstant"

export const quizlist = () => async (dispatch) => {
    try {
        dispatch({type: QUIZ_LIST_REQUEST})

        const {data} = await axios.get('https://mern-quiz.herokuapp.com/api/quiz')

        dispatch({type: QUIZ_LIST_SUCCESS, payload: data})

    } catch (error) {
        dispatch({
            type: QUIZ_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getQuizDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: QUIZ_DETAILS_REQUEST})

        const {data} = await axios.get(`https://mern-quiz.herokuapp.com/api/quiz/${id}`)

        dispatch({type: QUIZ_DETAILS_SUCCESS, payload: data})


    } catch (error) {
        dispatch({
            type: QUIZ_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createQuiz = (quiz) => async (dispatch, getState) => {
    try {
        dispatch({type: QUIZ_CREATE_REQUEST})

        const {userLogin: {
                userInfo
            }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }

        }

        console.log(userInfo.token)

        const {data} = await axios.post('https://mern-quiz.herokuapp.com/api/quiz', quiz, config)

        dispatch({type: QUIZ_CREATE_SUCCESS, payload: data})

        console.log(data)

        toast('Quiz question has been created!')
    } catch (error) {
        dispatch({
            type: QUIZ_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        toast.error(`${error.response.data.message}`)
    }
}

export const updateQuiz = (quiz) => async (dispatch, getState) => {
    try {
        dispatch({type: QUIZ_UPDATE_REQUEST})

        const {userLogin: {
                userInfo
            }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }

        }

        const {data} = await axios.put(`https://mern-quiz.herokuapp.com/api/quiz/${quiz._id}`, quiz, config)

        dispatch({type: QUIZ_UPDATE_SUCCESS, payload: data})

        toast('Quiz has been updated!')
    } catch (error) {
        dispatch({
            type: QUIZ_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteQuiz = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: QUIZ_DELETE_REQUEST})

        const {userLogin: {
                userInfo
            }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }

        }

        await axios.delete(`https://mern-quiz.herokuapp.com/api/quiz/${id}`, config)

        dispatch({type: QUIZ_DELETE_SUCCESS})
        toast.info('Quiz deleted!')

    } catch (error) {
        dispatch({
            type: QUIZ_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const addScore = (data) => async (dispatch) => {
        dispatch({
            type: SCORE_SAVE_REQUEST,
            payload: data
        })

        localStorage.setItem('score', JSON.stringify(data))

}
