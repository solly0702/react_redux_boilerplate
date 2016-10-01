import React, { Component } from "react";
import Example from "../containers/example";


import "../../style/style.scss";

class App extends Component {
  render() {
    return (
      <div class="container">
        <h1>React hello</h1>
        <button class="btn btn-primary">entry</button>
        <Example />
      </div>
    )
  }
}

export default App
