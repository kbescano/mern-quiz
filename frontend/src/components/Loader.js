import React from 'react'


const Loader = () => {
    return (
        <div className='loader'>
            <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_ctopYC.json"  background="transparent"  speed="1"  style={{width: "300px" ,height: "300px"}}  loop autoplay></lottie-player>
        </div>
    )
}

export default Loader
