import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { quizListReducers } from './reducers/quizReducer'


const reducer = combineReducers({
    quizList: quizListReducers
})


const userInfoFromStorage = localStorage.getItem('userQuiz') ? JSON.parse(localStorage.getItem('userQuiz')) : null


const initialState = {}

const middleware = [thunk]



const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store