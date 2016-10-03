import React, { Component } from "react";

import Header from "./header"
import Footer from "./footer"

import "../../style/style.scss";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default App
