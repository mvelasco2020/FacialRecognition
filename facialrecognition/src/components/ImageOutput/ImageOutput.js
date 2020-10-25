import React from 'react'

const ImageOutput = ({ imageUrl }) => {
    return (<div className="center ma">
        <img className="absolute mt2"
            width='500px'
            height='auto'
            alt='User generated image'
            src={imageUrl}
        />
    </div>);
}

export default ImageOutput;