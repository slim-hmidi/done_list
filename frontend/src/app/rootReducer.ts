import { combineReducers } from "@reduxjs/toolkit";
import authenticationReducer from "../features/authentication/authenticationSlice";

const rootReducer = combineReducers({
  authentication: authenticationReducer,
});

export default rootReducer;
