import React from "react";
import { Route } from "react-router-dom";

import Login from './Login';
import Signup from './Signup';

const Routes = () => (
  <div>
    <Route exact path="/login/" component={Login} />{" "}
    <Route exact path="/signup/" component={Signup} />{" "}
  </div>
);

export default Routes;