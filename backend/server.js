import express from 'express'
import connectDB from './config/db.js'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import quizRoutes from './routes/quizRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {errorHandler, notFound} from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.use(cors())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.get('/', (req,res) => {
    console.log('App is running')
}) 


app.use(express.json())


app.use('/api/quiz', quizRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 4000

app.listen(PORT, console.log(`Server running in ${
    process.env.NODE_ENV
} mode on port ${PORT}`))