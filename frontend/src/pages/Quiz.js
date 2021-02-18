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
    let d = useRef(null)
    gsap.registerPlugin(CSSPlugin)

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [seconds, setSeconds] = useState(60);
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
    const answer =  quiz.map(item => item.answer)

    useEffect(() => {
        
        const fetchData = async () => {
            const data = await dispatch(quizlist());
            const timer = await setIsRunning(true);
         }
         fetchData()
       
        if (isRunning) {
            const id = window.setInterval(() => {
              setSeconds(seconds => seconds - 1);
            }, 1000);
  
            return () => window.clearInterval(id);
          }    
          return undefined   
        
    }, [isRunning, dispatch]);

    useEffect(() => {
        if(!loading) {
            TweenLite.to(con, 0, {css: {visibility: "visible"}})
            TweenLite.staggerFrom([a, b, c ], .8, {opacity: 0, x: 10, ease: Power3.easeInOut}, .2)
        }
        if(score) {
            TweenLite.staggerFrom([d ], .8, {opacity: 0, x: 5, ease: Power3.easeInOut}, .2)
        }
        
    }, [loading , score])

    if (seconds === 0) {
        setCurrentQuestion(nextQuestion)
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
        setSeconds(60)
    };

  

    return (
        <>
            <header>
            <img src='/images/dml.png' alt="logo" />
            <div className='nav'>
            <div className='nav__logo'>
            <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_XRf80W.json"  background="transparent" speed="0"  style={{width: "100px", height: "100px"}}  loop  autoplay></lottie-player>
            </div>
            <div className='nav__links'>
            <lottie-player src="https://assets2.lottiefiles.com/temp/lf20_hUIoYZ.json"  background="transparent" speed="0"  style={{width: "100px", height : "100px"}}  loop  autoplay></lottie-player>
            </div>
            </div>
            </header>
        {loading ? <Loader /> : (
            
            <div className='container' ref={el => con = el}>
                {score > 0 ? (<p>Score: <span ref={el => d = el}>{score}</span></p>) : ''}
                {isRunning && 
                   <>
                   <div className='seconds'>
                <lottie-player src="https://assets3.lottiefiles.com/datafiles/JurDGEHkXvf87GO/data.json"  background="transparent"  speed="1"  style={{width: "200px" , height: "200px"}}  loop  autoplay></lottie-player>
                <h1>{seconds}</h1></div> </>}  
                <div className='quiz'>
                    <img src={logo[1].image} alt="" ref={el => c = el}/>
                    <form >
                        <div className='quiz__questions' ref={el => a = el}><h2>{question[currentQuestion]}</h2></div>
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
        )}
                    </>
    )
}

export default Quiz
