import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { openAlert } from "../alert/alertSlice";
import {
  AddTask,
  addTaskApi,
  Task,
  TaskResponse,
} from "../../api/tasks/index";
import history from "../../history/index";

interface InitialState {
  error: string;
  successMessage: string;
  task: Task;
}

export const addTask = createAsyncThunk(
  "task/add",
  async (task: AddTask, { dispatch, rejectWithValue }) => {
    try {
      const response = await addTaskApi(task);
      history.push("/home");
      return response;
    } catch (error) {
      let errorMessage = "Internal Server Error";
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      console.log(error.response);
      dispatch(openAlert({ message: errorMessage, severity: "error" }));
      return rejectWithValue(errorMessage);
    }
  },
);

const initialState: InitialState = {
  error: "",
  successMessage: "",
  task: {} as Task,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: {
    [`${addTask.fulfilled}`]: (state, action: PayloadAction<TaskResponse>) => {
      const { message, data } = action.payload;
      state.successMessage = message;
      state.task = data;
    },
    [`${addTask.rejected}`]: (
      state,
      action: PayloadAction<string, any, any, string>,
    ) => {
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
  },
});

export default taskSlice.reducer;
