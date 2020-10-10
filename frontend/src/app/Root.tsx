import React from "react";
import { Route, Router } from "react-router-dom";
import App from "./App";
import SignIn from "../features/authentication/signIn/SignInContainer";
import SignUp from "../features/authentication/signUp/SignUpContainer";
import history from "../history/index";
// import HomePage from "./HomePage";

const Root = () => (
  <Router history={history}>
    <Route exact path="/" component={App} />
    {/* <Route exact path="/home" component={HomePage} /> */}
    <Route exact path="/signin" component={SignIn} />
    <Route exact path="/signup" component={SignUp} />
  </Router>
);

export default Root;
