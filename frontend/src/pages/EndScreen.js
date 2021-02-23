import React, {useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {TweenLite, Power3} from 'gsap'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'

const EndScreen = () => {

    let con = useRef(null)
    let a = useRef(null)
    let b = useRef(null)
    let c = useRef(null)
    let d = useRef(null)
    gsap.registerPlugin(CSSPlugin)

    const score = useSelector(state => state.score)

    const recentScore = score.score

    useEffect(() => {
  
    TweenLite.to(con, 0, {css: {visibility: "visible"}})
    TweenLite.staggerFrom([a, b, c , d], .8, {opacity: 0, x: 20, ease: Power3.easeInOut}, .3)

    }, [score])

    return (
        <>
        <div className="end" ref={el => con = el}>
        <div><lottie-player src="https://assets2.lottiefiles.com/packages/lf20_i6sqnxav.json"  background="transparent"  speed="1"  style={{width: "300px", height: "300px"}}  loop  autoplay></lottie-player></div>
        <h1 ref={el => a = el}>Congrats!</h1>
            <h1 ref={el => b = el}>Quiz Finished!</h1>
            <h1 ref={el => c = el}>Your score is <span>{score.score}</span></h1> 
            <button ref={el => d = el}><Link to='/'><lottie-player src="https://assets2.lottiefiles.com/private_files/lf30_lz2Fby.json"  background="white"  speed="1"  style={{width: "150px", height: "150px"}} loop autoplay></lottie-player></Link></button>
        </div>
    </>
    )
}

export default EndScreen
