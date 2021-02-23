import express from 'express'
const router = express.Router()

import {addQuizItems, deleteQuiz, getQuiz, getQuizById, postScore, updateQuiz} from '../controllers/quizController.js'

import {protect, admin} from '../middleware/authMiddleware.js'


router.route('/').get(getQuiz).post(protect, admin, addQuizItems)
router.route('/:id').get(getQuizById).delete(protect, admin, deleteQuiz).put(protect, admin, updateQuiz)
router.route('/score').post(protect, postScore)

export default router