import React, { Component } from "react"
import Example from "../containers/example"

import "react-bootstrap"
import injectTapEventPlugin from "react-tap-event-plugin";
import "../../style/style.scss"

class App extends Component {
  render() {
    return (
      <div class="container">
        <h1>React_Redux_Boilerplate</h1>
        <button class="btn btn-primary">Hello</button>
        <Example />
      </div>
    )
  }
}

export default App
