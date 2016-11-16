import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/app";
import Body from "./components/body";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Body} />
  </Route>
)
