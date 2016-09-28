import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import logger from "react-logger"

import reducers from "./reducers"
import App from "./components/app"

const createStoreWithMiddleware = applyMiddleware(logger())(createStore)
const store = createStoreWithMiddleware(reducers)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.querySelector(".app"))
