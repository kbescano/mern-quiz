import React, { useState, useEffect , useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logo } from '../data/data'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { quizlist } from '../actions/quizAction'
import {TweenLite, Power3} from 'gsap'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'


const Quiz = ({history}) => {

    let con = useRef(null)
    let a = useRef(null)
    let b = useRef(null)
    let c = useRef(null)
    gsap.registerPlugin(CSSPlugin)

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [seconds, setSeconds] = useState(30);
    const [isRunning, setIsRunning] = useState(false);
    const [optionChosen, setOptionChosen] = useState("");

    const nextQuestion = currentQuestion + 1;

    const dispatch = useDispatch()

    const quizList = useSelector(state => state.quizList)

    const { loading, quiz } = quizList

    const question = quiz.map(item => item.question)

    const answer1 = quiz.map(item => item.option1)
    const answer2 = quiz.map(item => item.option2)
    const answer3 = quiz.map(item => item.option3)
    const answer4 = quiz.map(item => item.option4)
    const answer = quiz.map(item => item.answer)

    useEffect(() => {
        dispatch(quizlist())
        if (isRunning) {
          const id = window.setInterval(() => {
            setSeconds(seconds => seconds - 1);
          }, 1000);

          return () => window.clearInterval(id);
        }    
        return undefined

    }, [isRunning, dispatch]);

    if (seconds === 0) {
        if (nextQuestion === quiz.length) {
            setCurrentQuestion(0)
        } else {
            setCurrentQuestion(nextQuestion)
        }
        setSeconds(30)
    }

    const chooseOption = (option) => {
        setOptionChosen(option);
        if (answer[currentQuestion] == option) {
            setScore(score + 10);
            toast('Correct')
        } else {
            toast.error('Wrong')
        }
        if (nextQuestion < quiz.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true)
        }

        if (nextQuestion === quiz.length) {
            history.push('/end')
        }
        setSeconds(30)
    };

    useEffect(() => {
        if(!loading) {
            TweenLite.to(con, 0, {css: {visibility: "visible"}})
            TweenLite.staggerFrom([a, b, c ], .8, {opacity: 0, x: 10, ease: Power3.easeInOut}, .2)
        }
    }, [loading])

    return (

        loading ? <Loader /> : (
            <div className='container' ref={el => con = el}>
                {isRunning && <h1 className='seconds'>{seconds}</h1>}
                <div className='quiz'>
                    <img src={logo[1].image} alt="" ref={el => c = el}/>
                    <form >
                        <div className='quiz__questions' ref={el => a = el}><h1>{question[currentQuestion]}</h1></div>
                        <div className='quiz__answers' ref={el => b = el}>
                            <div className='quiz__answers--list' 
                            onClick={() => chooseOption("option1") }>
                                {answer1[currentQuestion]}</div>
                            <div className='quiz__answers--list' 
                            onClick={() => chooseOption("option2")}>
                                {answer2[currentQuestion]}</div>
                            <div className='quiz__answers--list' 
                            onClick={() => chooseOption("option3")}>
                                {answer3[currentQuestion]}</div>
                            <div className='quiz__answers--list' 
                            onClick={() => chooseOption("option4")}>
                                {answer4[currentQuestion]}</div>
                        </div>
                    </form>
                </div>
            </div>
        )
    )
}

export default Quiz
