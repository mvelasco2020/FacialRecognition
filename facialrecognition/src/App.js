import React, { Component } from 'react';
import Particles from 'react-particles-js';

import './App.css';
import ParticleOptions from './Constants/ParticleOptions'

import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import UrlInputForm from './components/UrlInputForm/UrlInputForm.js'
import Rank from './components/Rank/Rank.js'
import imageOutput from './components/ImageOutput/ImageOutput'

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

    }
  }

  onInputChange = (event) => {
    console.log(event.target.value)
  }

  onSubmit = () => {
    console.log('clicked')

    app.models.predict("a403429f2ddf4b49b307e318f00e528b",
      "https://samples.clarifai.com/face-det.jpg")
      .then(
        function (response) {
          console.log(response)
        },
        function (error) {
          console.log(error)

        }
      )
  }
  render() {
    return (
      <div className="App">
        <Particles className="particles"
          params={ParticleOptions} />
        <Navigation />
        <Logo />
        <Rank />

        <UrlInputForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit} />

        
        <imageOutput/>
      </div>
    );
  }
}



export default App;
