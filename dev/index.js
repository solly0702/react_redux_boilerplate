import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import { Router, Route, IndexRoute, browserHistory } from "react-router"
import thunk from "redux-thunk"
import promise from "redux-promise"
import createLogger from "redux-logger"

import reducers from "./reducers"
import App from "./components/app"
import Body from "./components/body"

const createStoreWithMiddleware = applyMiddleware(thunk, promise, createLogger)(createStore)
const store = createStoreWithMiddleware(reducers)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Body} />
      </Route>
    </Router>
  </Provider>
, document.querySelector("#app"))
