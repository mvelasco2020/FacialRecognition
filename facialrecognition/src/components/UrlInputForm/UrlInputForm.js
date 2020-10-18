import React from 'react'
import './UrlInputForm.css'

const UrlInputForm = ({onInputChange, onSubmit}) => {
    return (
        <div>
            <p className="f3">
                {'This App has its own brain, it detects faces in your pictures!'}
            </p>
            <div className="center">
                <div className="center br3 shadow-5 form">
                    <input className="f4 p2 w-70"
                        type='text'
                        onChange={onInputChange}></input>
                    <button 
                    className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                    onClick={onSubmit}>
                        Detect
                        </button>
                </div>
            </div>
        </div>
    )
}

export default UrlInputForm