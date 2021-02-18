import axios from 'axios'
import {toast} from 'react-toastify'
import { QUIZ_CREATE_FAIL, QUIZ_CREATE_REQUEST, QUIZ_CREATE_SUCCESS, QUIZ_LIST_FAIL, QUIZ_LIST_REQUEST, QUIZ_LIST_SUCCESS } from "../constants/quizConstant"

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

export const createQuiz = (quiz) => async (dispatch, getState) => {
    try {
        dispatch({type: QUIZ_CREATE_REQUEST})

        const {userLogin: {
                userQuiz
            }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${
                    userQuiz.token
                }`
            }

        }

        const {data} = await axios.post('https://mern-quiz.herokuapp.com/api/quiz', quiz, config)

        dispatch({type: QUIZ_CREATE_SUCCESS, payload: data})

        toast('Quiz question has been created!')
    } catch (error) {
        dispatch({
            type: QUIZ_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        toast.error(`${error.response.data.message}`)
    }
}
