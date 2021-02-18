import asyncHandler from 'express-async-handler'
import Quiz from '../models/quizModel.js'

// @desc Create new quiz
// @route Post /api/quiz
// @access Private
const addQuizItems = asyncHandler(async (req, res) => {
    const { question, option1, option2, option3, option4, answer} = req.body
    
    const quiz = new Quiz({
        user: req.user._id,
        question,
        option1,
        option2,
        option3,
        option4,
        answer
     
    })

    const createdQuiz = await quiz.save()
    if(createdQuiz) {
        res.json(createdQuiz)
    } else {
        res.status(400)
        throw new Error('Invalid product data')
    }
    
})

const getQuiz = asyncHandler(async (req, res) => {
    const quiz = await Quiz.find({})

    res.json(quiz)
})



export {
    addQuizItems, getQuiz
}