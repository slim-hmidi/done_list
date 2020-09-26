import { combineReducers } from "@reduxjs/toolkit";
import authenticationReducer from "../features/authentication/authenticationSlice";
import alertReducer from "../features/alert/alertSlice";

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  alert: alertReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
