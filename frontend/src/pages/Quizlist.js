import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { deleteQuiz, quizlist } from '../actions/quizAction'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'


const Quizlist = () => {

    const dispatch = useDispatch()

    const quizList = useSelector(state => state.quizList)

    const { loading, quiz } = quizList

    const quizDelete = useSelector(state => state.quizDelete)

    const {  loading: loadingDelete , success } = quizDelete

    useEffect(() => {
        dispatch(quizlist())
        if(success){
            dispatch(quizlist())
        }
    }, [dispatch,  success])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteQuiz(id))
        }

    }

    return (
        <>  
            <Navbar speed={'0'}/>
            {loadingDelete && <Loader />}
            {loading ? <Loader/> : (
                <div className='list__container'>
                <table className="quizlist">
                    <thead>
                        <th>ID</th>
                        <th>Question</th>
                        <th>Option 1</th>
                        <th>Option 2</th>
                        <th>Option 3</th>
                        <th>Option 4</th>
                        <th>Answer</th>
                        <th>Update</th>
                    </thead>
                    <tbody>
                        {quiz.map((item, index) => (
                            <tr key={item._id}>
                                <td data-label="Product Id">{index + 1}</td>
                                <td data-label="Question" className='quizlist--name'>{item.question}</td>
                                <td data-label="Option 1">{item.option1}</td>
                                <td data-label="Option 2">{item.option2}</td>
                                <td data-label="Option 3">{item.option3}</td>
                                <td data-label="Option 4">{item.option4}</td>
                                <td data-label="Answer" className='quizlist--answer'>{item.answer === 'option1' && item.option1 || item.answer === 'option2' && item.option2 || item.answer === 'option3' && item.option3 || item.answer === 'option4' && item.option4 }</td>
                                <td data-label="Update">
                                    <Link to={`/admin/quiz/${item._id}/edit`}>
                                        <i className='fas fa-edit'></i></Link><i className='fas fa-trash' onClick={() => deleteHandler(item._id)}></i></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            )}
            

        </>
    )
}

export default Quizlist
