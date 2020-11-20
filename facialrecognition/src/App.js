import React, { Component } from 'react';
import Particles from 'react-particles-js';

import './App.css';
//constants
import {ParticleOptions} from './Constants/ParticleOptions'
import {backend} from './Constants/Connections.js'

import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import UrlInputForm from './components/UrlInputForm/UrlInputForm.js'
import Rank from './components/Rank/Rank.js'
import ImageOutput from './components/ImageOutput/ImageOutput'
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register.js'

//Api
import Clarifai from 'clarifai'

//backend address
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
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: new Date()
      }

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
    //console.log(image, width, height)
    return {
      leftCol: boxLocations.left_col * width,
      topRow: boxLocations.top_row * height,
      rightCol: width - (boxLocations.right_col * width),
      bottomRow: height - (boxLocations.bottom_row * height)
    }
  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    else if (route === 'signin') {
      this.setState({ isSignedIn: false })
    }
    this.setState({ route: route })
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
          if (response) {
            fetch(`${backend}/image`, {
              method: 'put',
              headers: { 'Content-type': 'application/json' },
              body: JSON.stringify({
                id: this.state.user.id,
              })
            })
              .then(data =>
                data.json()
              )
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count }))
              })
          }
          this.displayBox(this.calculateBoxLocation(response))
        })
      .catch(err =>
        console.log(err))
  }

  //this is called from the register component to pass back
  //the user info from database after register
  loadUserInfo = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  render() {
    const { route, imageUrl, box, isSignedIn } = this.state;
    return (
      <div className="App">
        <Particles className="particles"
          params={ParticleOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {this.state.route === 'home'
          ? <div>
            <Logo />
            <Rank entries={this.state.user.entries}
              name={this.state.user.name}
            />
            <UrlInputForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit} />
            <ImageOutput box={box}
              imageUrl={imageUrl} />
          </div>
          : (route === 'signin'
            ? <SignIn loadUserInfo={this.loadUserInfo}
              onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange}
              loadUserInfo={this.loadUserInfo} />
          )
        }

      </div>
    );
  }
}



export default App;
