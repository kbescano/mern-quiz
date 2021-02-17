import asyncHandler from 'express-async-handler'
import Quiz from '../models/quizModel.js'

// @desc Create new quiz
// @route Post /api/quiz
// @access Private
const addQuizItems = asyncHandler(async (req, res) => {
    const {
        questions,
        answers
    } = req.body

    if (questions && questions.length > 4) {
        res.status(400)
        throw new Error('4 answers needed!')
        return
    } else {
        const order = new Order({
            user: req.user._id,
            questions,
            answers,
        })

        const createdQuiz = await order.save()

        res.status(201).json(createdQuiz)
    }
})

const getQuiz = asyncHandler(async (req, res) => {
    const quiz = await Quiz.find({})

    res.json(quiz)
})

export {
    addQuizItems, getQuiz
}