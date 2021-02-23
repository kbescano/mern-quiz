import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Meta from '../components/Meta'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import {  getQuizDetails, updateQuiz } from '../actions/quizAction'
import { toast } from 'react-toastify'
import { QUIZ_UPDATE_RESET } from '../constants/quizConstant'



const UpdateQuiz = ({ history, match }) => {

    toast.configure()
    const quizId = match.params.id

    const [question, setQuestion] = useState('')
    const [option1, setOption1] = useState('')
    const [option2, setOption2] = useState('')
    const [option3, setOption3] = useState('')
    const [option4, setOption4] = useState('')
    const [answer, setAnswer] = useState('option1')

    const dispatch = useDispatch()

    const quizDetails = useSelector(state => state.quizDetails)

    const { loading, quiz } = quizDetails

    const quizUpdate = useSelector(state => state.quizUpdate)

    const { loading: loadingUpdate, success , error} = quizUpdate


     useEffect(() => {
        if (success) {
            dispatch({type: QUIZ_UPDATE_RESET})
            dispatch(getQuizDetails(quizId))
            history.push('/admin/quizlist')
        } else {
            if (!quiz.question || quiz._id !== quizId) {
                dispatch(getQuizDetails(quizId))
            } else {
                setQuestion(quiz.question)
                setOption1(quiz.option1)
                setOption2(quiz.option2)
                setOption3(quiz.option3)
                setOption4(quiz.option4)
                setAnswer(quiz.answer)
            }
        }
    }, [dispatch, quiz, quizId, history, success])

    console.log(answer)

    const submitHandler = (e) => {
        e.preventDefault()
        if(answer === 'option1' || answer === 'option2' || answer === 'option3' || answer === 'option4' ){
            dispatch(updateQuiz({ _id: quizId, question, option1, option2, option3, option4, answer  }))
        } else {
            toast.error('Invalid data!')
        }
       
    }

    return (
        <>
            <Meta title='Create quiz' />
            <Navbar />
            {loading && <Loader />}
            {loadingUpdate && <Loader />}
            {error && console.log(error)}
            <div className='updatequiz'>
                <div className='updatequiz__main'>
                    <div className='updatequiz__main--content'>
                        <h1>Update Quiz</h1>
                        <form onSubmit={submitHandler}>
                            <div className='updatequiz__main--content--input'>
                                <label>Question</label>
                                <input type="text" placeholder='Type question' value={question} onChange={(e) => setQuestion(e.target.value)} />
                            </div>
                            <div className='updatequiz__main--content--input'>
                                <label>Option 1</label>
                                <input type="text" placeholder='Type option 1'
                                    value={option1} onChange={(e) => setOption1(e.target.value)} />
                            </div>
                            <div className='updatequiz__main--content--input'>
                                <label>Option 2</label>
                                <input type="text" placeholder='Type option 2'
                                    value={option2} onChange={(e) => setOption2(e.target.value)} />
                            </div>
                            <div className='updatequiz__main--content--input'>
                            <label>Option 3</label>
                                <input type="text" placeholder='Type option 3'
                                    value={option3} onChange={(e) => setOption3(e.target.value)} />
                            </div>
                            <div className='updatequiz__main--content--input'>
                            <label>Option 4</label>
                                <input type="text" placeholder='Type option 4'
                                    value={option4} onChange={(e) => setOption4(e.target.value)} />
                            </div>
                            <div className='updatequiz__main--content--input'>
                            <label>Answer</label>
                                <select value={answer} onChange={(e) => setAnswer(e.target.value)}> 
                                    <option value='option1' key='1' >{option1}</option> 
                                    <option value='option2' key='2' >{option2}</option>
                                    <option value='option3' key='3' >{option3}</option>
                                    <option value='option4'  key='4' >{option4}</option>
                                </select>
                            </div>
                            
                            <div className='updatequiz__main--content--button'>
                                <button>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateQuiz
