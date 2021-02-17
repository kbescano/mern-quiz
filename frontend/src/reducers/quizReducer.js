import { QUIZ_LIST_FAIL, QUIZ_LIST_REQUEST, QUIZ_LIST_SUCCESS } from "../constants/quizConstant"

export const quizListReducers = (state = { quiz: [] }, action) => {
    switch (action.type) {
        case    QUIZ_LIST_REQUEST:
            return {
                loading: true,
                quiz: []
            }
        case   QUIZ_LIST_SUCCESS:
            return {
                loading: false,
                quiz: action.payload
            }
        case    QUIZ_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}