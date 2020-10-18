import React from 'react'
import Tilt from 'react-tilt'
import brain from './icons8-brain-96.png'


const Logo = () => {
    return (
        <div className="ma4 mt0">
            Hi
            <Tilt className="Tilt br2 shadow-2" options={{ max: 25 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa4"> 
                <img alt='Logo'src={brain}/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;