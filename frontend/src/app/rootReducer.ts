import {combineReducers} from '@reduxjs/toolkit';
import authenticationReducer from '../features/authentication/authenticationSlice';
import alertReducer from '../features/alert/alertSlice';
import tagReducer from '../features/tags/tagSlice';
import taskReducer from '../features/tasks/taskSlice';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  alert: alertReducer,
  task: taskReducer,
  tag: tagReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
