import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import promise from "redux-promise"
import createLogger from "redux-logger"

import reducers from "./reducers"
import App from "./components/app"

const createStoreWithMiddleware = applyMiddleware(thunk, promise, createLogger)(createStore)
const store = createStoreWithMiddleware(reducers)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
, document.querySelector(".app"))
