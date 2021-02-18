import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { quizCreateReducer, quizListReducer } from './reducers/quizReducer'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducer'


const reducer = combineReducers({
    quizList: quizListReducer,
    quizCreate: quizCreateReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    
})


const userInfoFromStorage = localStorage.getItem('userQuiz') ? JSON.parse(localStorage.getItem('userQuiz')) : null


const initialState = {userLogin: { userQuiz: userInfoFromStorage }}

const middleware = [thunk]



const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store