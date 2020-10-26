import React, { Component } from 'react';
import Particles from 'react-particles-js';

import './App.css';
import ParticleOptions from './Constants/ParticleOptions'

import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import UrlInputForm from './components/UrlInputForm/UrlInputForm.js'
import Rank from './components/Rank/Rank.js'
import ImageOutput from './components/ImageOutput/ImageOutput'
import SignIn from './components/SignIn/SignIn.js'
//Api
import Clarifai from 'clarifai'

const app = new Clarifai.App({
  apiKey: 'b8aad6f1ec154bab9037c10fa43e0f97'
});



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},

    }
  }
  calculateBoxLocation = (data) => {
    const boxLocations = data.outputs[0]
      .data
      .regions[0]
      .region_info
      .bounding_box
    const image = document.getElementById('outputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    console.log(image, width, height)
    return {
      leftCol: boxLocations.left_col * width,
      topRow: boxLocations.top_row * height,
      rightCol: width - (boxLocations.right_col * width),
      bottomRow: height - (boxLocations.bottom_row * height)
    }
  }

  displayBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (input) => {
    this.setState({ input: input.target.value })
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(
        response => {
          console.log(response)
          this.displayBox(this.calculateBoxLocation(response))
        })
      .catch(err =>
        console.log(err))
  }


  render() {
    return (
      <div className="App">
        <Particles className="particles"
          params={ParticleOptions} />
        <Navigation />
        <Logo />
        <SignIn/>
        <Rank />
        <UrlInputForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit} />
        <ImageOutput box={this.state.box} 
                    imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}



export default App;
