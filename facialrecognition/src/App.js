import React, { Component } from 'react';
import Particles from 'react-particles-js';

import './App.css';
import ParticleOptions from './Constants/ParticleOptions'

import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import UrlInputForm from './components/UrlInputForm/UrlInputForm.js'
import Rank from './components/Rank/Rank.js'

//Api
import clarifaiApp from './Api/Clarifi'

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

  onSubmit = () =>{
    console.log('clicked')
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
        onSubmit={this.onSubmit}/>

        {/* 
        <FaceRecognition/>
         */
        }
      </div>
    );
  }
}



export default App;
