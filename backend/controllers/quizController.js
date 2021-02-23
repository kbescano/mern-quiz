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
        throw new Error('Invalid quiz data')
    }
    
})

// @desc Fetch all quiz
// @route GET /api/quiz
// @access Public
const getQuiz = asyncHandler(async (req, res) => {
    const quiz = await Quiz.find({})

    res.json(quiz)
})

// @desc Fetch single products
// @route GET /api/quiz/:id
// @access Public
const getQuizById = asyncHandler(async(req, res) => {
    const quiz = await Quiz.findById(req.params.id)

    if(quiz) {
        res.json(quiz)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
    
})

// @desc Update a quiz
// @route Put /api/quiz/:id
// @access Private/Admin

const updateQuiz=  asyncHandler(async(req, res) => {
    
    const { question, option1, option2 , option3, option4, answer} = req.body
    
    const quiz = await Quiz.findById(req.params.id)

    if(quiz) {   
        quiz.question = question
        quiz.option1 = option1
        quiz.option2 = option2
        quiz.option3 = option3
        quiz.option4 = option4
        quiz.answer = answer


        const updatedQuiz = await quiz.save()
        res.json(updatedQuiz)
    } else {
        res.status(404)
        throw new Error ('Product not found')
    }
})


// @desc Delete a quiz
// @route DELETE/api/quiz/:id
// @access Private/Admin

const deleteQuiz =  asyncHandler(async(req, res) => {
    const quiz = await Quiz.findById(req.params.id)

    if(quiz) {
      await quiz.remove()
      res.json({ Message: 'Quiz removed'})
    } else {
        res.status(404)
        throw new Error ('Quiz not found')
    }
   
})


const postScore =  asyncHandler(async(req, res) => {
    
    const { score } = req.body
    
    const user = await User.findById(req.user.id)

       const scores = {
           name: req.user.name,
           score
       }

       user.score.push(scores)
      
       if(scores) {
        await user.save()
        res.status(201).json({ message: 'Score added'})
       } else {
        res.status(404)
        throw new Error ('User not found')
       }   
    
})


export {
    addQuizItems, getQuiz, deleteQuiz, getQuizById, updateQuiz, postScore
}