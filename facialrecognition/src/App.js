import React, { Component } from 'react';
import Particles from 'react-particles-js';

import './App.css';
import ParticleOptions from './Constants/ParticleOptions'

import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import UrlInputForm from './components/UrlInputForm/UrlInputForm.js'
import Rank from './components/Rank/Rank.js'
import ImageOutput from './components/ImageOutput/ImageOutput'

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
      imageUrl: ''

    }
  }

  onInputChange = (input) => {
    this.setState({ input: input.target.value })
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
      this.state.input)
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


        <ImageOutput imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}



export default App;
