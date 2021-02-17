import axios from 'axios'
import { QUIZ_LIST_FAIL, QUIZ_LIST_REQUEST, QUIZ_LIST_SUCCESS } from "../constants/quizConstant"

export const quizlist = () => async (dispatch) => {
    try {
        dispatch({type: QUIZ_LIST_REQUEST})

        const {data} = await axios.get('https://mern-quiz.herokuapp.com/api/quiz')

        dispatch({type: QUIZ_LIST_SUCCESS, payload: data})

        console.log(data)

    } catch (error) {
        dispatch({
            type: QUIZ_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
