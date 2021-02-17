import mongoose from 'mongoose'
import dotenv from 'dotenv'
import quiz from './data/quiz.js'
import user from './data/user.js'
import User from './models/userModel.js'
import Quiz from './models/quizModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Quiz.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(user)

        const adminUser = createdUsers[0]._id

        const sampleQuiz = quiz.map(item => {
            return {
                ...item,
                user: adminUser
            }
        })

        await Quiz.insertMany(sampleQuiz)

        console.log('Data Imported!')
        process.exit()
    } catch (error) {
        console.error(`Error: ${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Quiz.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed!')
        process.exit()
    } catch (error) {
        console.error(`Error: ${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}
