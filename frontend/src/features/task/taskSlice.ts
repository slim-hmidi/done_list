import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {openAlert} from '../alert/alertSlice';
import {addTaskApi, getAllTasksApi} from './task.apis';
import {
  AddTask,
  LoadingStatus,
  TaskBody,
  TaskCreationResponse,
  TaskFetchResponse,
  TaskSliceState,
} from 'types/index';
import history from 'browserHistory/index';

export const addTask = createAsyncThunk(
  'task/add',
  async (task: AddTask, {dispatch, rejectWithValue}) => {
    try {
      const response = await addTaskApi(task);
      history.push('/home');
      return response;
    } catch (error) {
      let errorMessage = 'Internal Server Error';
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      dispatch(openAlert({message: errorMessage, severity: 'error'}));
      return rejectWithValue(errorMessage);
    }
  },
);

export const getAllTasks = createAsyncThunk(
  'task/getAll',
  async (queryParams: string[], {dispatch, rejectWithValue}) => {
    try {
      const response = await getAllTasksApi(queryParams);
      return response;
    } catch (error) {
      let errorMessage = 'Internal Server Error';
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      dispatch(openAlert({message: errorMessage, severity: 'error'}));
      return rejectWithValue(errorMessage);
    }
  },
);

const initialState: TaskSliceState = {
  error: '',
  successMessage: '',
  tasks: [] as TaskBody[],
  loading: LoadingStatus.idle,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: {
    [`${addTask.fulfilled}`]: (
      state,
      action: PayloadAction<TaskCreationResponse>,
    ) => {
      const {message, data} = action.payload;
      state.successMessage = message;
      state.tasks.push(data);
      state.loading = LoadingStatus.resolved;
    },
    [`${addTask.rejected}`]: (
      state,
      action: PayloadAction<string, string, unknown, string>,
    ) => {
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
      state.loading = LoadingStatus.rejected;
    },
    [`${getAllTasks.pending}`]: (state) => {
      state.loading = LoadingStatus.pending;
      state.error = '';
    },
    [`${getAllTasks.fulfilled}`]: (
      state,
      action: PayloadAction<TaskFetchResponse>,
    ) => {
      const {message, data} = action.payload;
      state.successMessage = message;
      state.tasks = data;
      state.loading = LoadingStatus.resolved;
    },
    [`${getAllTasks.rejected}`]: (
      state,
      action: PayloadAction<string, string, unknown, string>,
    ) => {
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
      state.loading = LoadingStatus.rejected;
    },
  },
});

export default taskSlice.reducer;
