import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Meta from '../components/Meta'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import { createQuiz, quizlist } from '../actions/quizAction'
import { QUIZ_CREATE_RESET } from '../constants/quizConstant'
import { toast } from 'react-toastify'



const CreateQuiz = ({ history }) => {

    toast.configure()


    const [question, setQuestion] = useState('')
    const [option1, setOption1] = useState('')
    const [option2, setOption2] = useState('')
    const [option3, setOption3] = useState('')
    const [option4, setOption4] = useState('')
    const [answer, setAnswer] = useState('')

    const dispatch = useDispatch()

    const quizCreate = useSelector(state => state.quizCreate)

    const { loading, success,  quiz } = quizCreate


    useEffect(() => {
        if (success) {
            dispatch({ type: QUIZ_CREATE_RESET })
            dispatch(quizlist())
            history.push('/admin/quizlist')
        }

    }, [dispatch, history, success, quiz])


    const submitHandler = (e) => {
        e.preventDefault()
        if(answer === option1 || answer === option2 || answer === option3 || answer === option4 ){
            dispatch(createQuiz({ question, option1, option2, option3, option4, answer  }))
        } else {
            toast.error('Invalid data!')
        }
       
    }

    return (
        <>
            <Meta title='Create quiz' />
            <Navbar />
            {loading && <Loader />}
            <div className='createquiz'>
                <div className='createquiz__main'>
                    <div className='createquiz__main--content'>
                        <h1>Create Quiz</h1>
                        <form onSubmit={submitHandler}>
                            <div className='createquiz__main--content--input'>
                                <label>Question</label>
                                <input type="text" placeholder='Question' value={question} onChange={(e) => setQuestion(e.target.value)} />
                            </div>
                            <div className='createquiz__main--content--input'>
                                <label>Option 1</label>
                                <input type="text" placeholder='Option 1'
                                    value={option1} onChange={(e) => setOption1(e.target.value)} />
                            </div>
                            <div className='createquiz__main--content--input'>
                                <label>Option 2</label>
                                <input type="text" placeholder='Option 2'
                                    value={option2} onChange={(e) => setOption2(e.target.value)} />
                            </div>
                            <div className='createquiz__main--content--input'>
                            <label>Option 3</label>
                                <input type="text" placeholder='Option 3'
                                    value={option3} onChange={(e) => setOption3(e.target.value)} />
                            </div>
                            <div className='createquiz__main--content--input'>
                            <label>Option 4</label>
                                <input type="text" placeholder='Option 4'
                                    value={option4} onChange={(e) => setOption4(e.target.value)} />
                            </div>
                            <div className='createquiz__main--content--input'>
                            <label>Answer</label>
                                <input type="text" placeholder='Answer'
                                    value={answer} onChange={(e) => setAnswer(e.target.value)} />
                            </div>
                            
                            <div className='createquiz__main--content--button'>
                                <button>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateQuiz
