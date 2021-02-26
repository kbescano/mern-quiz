import React,{useRef, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {TweenLite, Power3} from 'gsap'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import Navbar from '../components/Navbar'

const HomeScreen = () => {
    let con = useRef(null)
    let a = useRef(null)
    gsap.registerPlugin(CSSPlugin)

    useEffect(() => {
        TweenLite.to(con, 0, {css: {visibility: "visible"}})
        TweenLite.staggerFrom([a], .8, {opacity: 0, y: 20, ease: Power3.easeInOut}, .2)
    }, [])


        return (
            <>
            <Navbar logo={''} speed={"1"}/>
            <div className='front' ref={el => con = el}>
                <h2><span>De</span>Molay <span>Qu</span>iz</h2> 
                <button ref={el => a = el}><Link to='/quiz'><lottie-player src="https://assets2.lottiefiles.com/datafiles/lWXrvNR9H2FhBqa/data.json"  background="white"  speed=".5"  style={{width: "100px", height: "100px"}} loop autoplay></lottie-player></Link></button>
            </div>
            </>
        )
}

export default HomeScreen
