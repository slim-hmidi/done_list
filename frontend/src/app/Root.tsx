import React from 'react';
import {Route, Router} from 'react-router-dom';
import App from './App';
import SignIn from 'features/authentication/signIn/SignInContainer';
import SignUp from 'features/authentication/signUp/SignUpContainer';
import history from 'browserHistory/index';
const Root = (): JSX.Element => (
  <Router history={history}>
    <Route exact path="/" component={App} />
    <Route exact path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
  </Router>
);

export default Root;
