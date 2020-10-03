import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { openAlert } from "../alert/alertSlice";
import {
  AddTask,
  addTaskApi,
  ReturnedTask,
  PostTaskResponse,
  GetTasksResponse,
  getAllTasksApi,
} from "../../api/tasks/index";
import history from "../../history/index";

interface InitialState {
  error: string;
  successMessage: string;
  tasks: ReturnedTask[];
  loading: string;
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
      dispatch(openAlert({ message: errorMessage, severity: "error" }));
      return rejectWithValue(errorMessage);
    }
  },
);

export const getAllTasks = createAsyncThunk(
  "task/getAll",
  async (userId: number, { dispatch, rejectWithValue }) => {
    try {
      const response = await getAllTasksApi(userId);
      return response;
    } catch (error) {
      let errorMessage = "Internal Server Error";
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      dispatch(openAlert({ message: errorMessage, severity: "error" }));
      return rejectWithValue(errorMessage);
    }
  },
);

const initialState: InitialState = {
  error: "",
  successMessage: "",
  tasks: [] as ReturnedTask[],
  loading: "idle",
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: {
    [`${addTask.fulfilled}`]: (
      state,
      action: PayloadAction<PostTaskResponse>,
    ) => {
      const { message, data } = action.payload;
      state.successMessage = message;
      state.tasks.push(data);
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
    [`${getAllTasks.pending}`]: (
      state,
    ) => {
      state.loading = "pending";
    },
    [`${getAllTasks.fulfilled}`]: (
      state,
      action: PayloadAction<GetTasksResponse>,
    ) => {
      const { message, data } = action.payload;
      state.successMessage = message;
      state.tasks = data;
      state.loading = "resolved";
    },
    [`${getAllTasks.rejected}`]: (
      state,
      action: PayloadAction<string, any, any, string>,
    ) => {
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
      state.loading = "failed";
    },
  },
});

export default taskSlice.reducer;
