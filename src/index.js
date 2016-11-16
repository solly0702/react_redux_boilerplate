import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { Router, browserHistory } from "react-router";

// middleware
import thunk from "redux-thunk";
import promise from "redux-promise";

import routes from "./routes";
import reducers from "./reducers";

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk, promise),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
, document.querySelector("#app"));
