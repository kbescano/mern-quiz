import express from 'express'
const router = express.Router()

import {addQuizItems, getQuiz} from '../controllers/quizController.js'

import {protect, admin} from '../middleware/authMiddleware.js'


router.route('/').get(getQuiz).post(protect, admin, addQuizItems)


export default router