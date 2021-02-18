import { QUIZ_LIST_FAIL, QUIZ_LIST_REQUEST, QUIZ_LIST_SUCCESS, QUIZ_CREATE_REQUEST,
    QUIZ_CREATE_SUCCESS,QUIZ_CREATE_FAIL,QUIZ_CREATE_RESET, QUIZ_LIST_TIMER} from "../constants/quizConstant"

export const quizListReducer = (state = { quiz: [] }, action) => {
    switch (action.type) {
        case  QUIZ_LIST_REQUEST:
            return {
                loading: true,
                quiz: []
            }
        case QUIZ_LIST_SUCCESS:
            return {
                loading: false,
                quiz: action.payload
            }
        case QUIZ_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const quizCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case QUIZ_CREATE_REQUEST:
            return {
                loading: true
            }
        case QUIZ_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                quiz: action.payload
            }
        case QUIZ_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case QUIZ_CREATE_RESET:
            return {

            }
        default:
            return state

    }
}