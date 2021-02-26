import React, { useState, useEffect , useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { addScore, quizlist } from '../actions/quizAction'
import {TweenLite, Power3} from 'gsap'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import ProgressBar from "@ramonak/react-progress-bar";


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

    const progress =  Math.round((currentQuestion / quiz.length) * 100)

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
        if(!loading){
            TweenLite.to(con, 0, {css: {visibility: "visible"}})
            TweenLite.staggerFrom([a,b,c], .8, {opacity: 0,y: 10, ease: Power3.easeInOut}, .2)
        }
        if(score) {
            TweenLite.from(d, .8, {opacity: 0, x: 5, ease: Power3.easeOut}, .2)
        }
        
    }, [ score, loading])


    if (seconds === 0) {
        setCurrentQuestion(nextQuestion)
        setSeconds(60)
    }

    const chooseOption = (option) => {
        setOptionChosen(option);
        if (answer[currentQuestion] == option) {
            setScore(score + 10);
            toast('Correct', {
                autoClose: 2000,
                position: "top-center",
            })
        } else {
            toast.error('Wrong', {
                autoClose: 2000,
                position: "top-center",
            })
        }
        if (nextQuestion < quiz.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true)
        }

        if (nextQuestion === quiz.length) {
            dispatch(addScore(score + 10))
            history.push('/end')
        }
        setSeconds(60)
    };

  

    return (
        <>  
            <section>
            <div className='nav'>
            <div className='nav__logo'>
            {currentQuestion > 0 ? (
                <ProgressBar completed={progress} bgcolor={'#7DCD85'} baseBgColor={'#f5f5f5'}/>
            ) : ''} 
            </div>
            <div className='nav__links'>
            {score > 0 ? (<p>Score: <span ref={el => d = el}>{score}</span></p>) : ''}
            </div>
            </div>
            </section>
        {loading ? <Loader /> : (
                <>
                
                
            <div className='container' ref={el => con = el}>
            <img className='img' src='/images/dml.png' alt="logo" />
                {isRunning && 
                   <>
                   <div className='seconds'>
                <lottie-player src="https://assets3.lottiefiles.com/datafiles/JurDGEHkXvf87GO/data.json"  background="transparent"  speed="1"  style={{width: "200px" , height: "200px"}}  loop  autoplay></lottie-player>
                <h1>{seconds}</h1></div> </>}  
                
                <div className='quiz'>
                    <div className='quiz__left'ref={el => c = el}>
                    <img src='/images/templarcross.png' alt="" />
                    </div>
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
            </>
        )}
                    </>
    )
}

export default Quiz
