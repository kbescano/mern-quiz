import mongoose from 'mongoose'

const quizSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    question: {
        type: String,
        required: true
    }, 

    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    },
    option4: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
 

    createdAt: {
        type: Date
    }
}, {timestamps: true})

const Quiz = mongoose.model('Quiz', quizSchema)

export default Quiz
