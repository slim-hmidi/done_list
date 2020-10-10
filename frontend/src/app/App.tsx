import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "./rootReducer";
import Container from "@material-ui/core/Container";
import HomePage from "./HomePage";
import AppBar from "../components/AppBar";
// import { isAuthenticated } from "./utils";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

function App() {

  const { username, loading} = useSelector(
    (state: AppState) => ({
      username: state.authentication.user.username,
      loading: state.authentication.loading,
    }));


    if (loading === "resolved" && username) {
      return (<div>
        <AppBar />
        <Container>
          <HomePage />
        </Container>
      </div>);
     } 

     if (loading === "pending") {
      return <CircularProgress />
     }
    
     return <Redirect to="/signin" />;
}


export default App;
