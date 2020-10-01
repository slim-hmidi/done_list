import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  signInApi,
  signUpApi,
  AuthenticatedUser,
  AuthenticationResponse,
  NewUser,
} from "../../api/authentication/index";
import { setToken } from "../../api/utils";
import { openAlert } from "../alert/alertSlice";
import history from "../../history/index";

// interfaces

interface HandleUserResponse {
  message: string;
  username: string;
  userId: number;
}

interface User {
  username: string;
  userId: number;
}

interface InitialState {
  error: string;
  successMessage: string;
  loading: string;
  user: User;
}

interface UserPayload {
  username: string;
  userId: number;
  message: string;
}

const handleUserResponse = (
  { data, message }: AuthenticationResponse,
): HandleUserResponse => {
  const { token, username, userId } = data;
  setToken(token);
  return { message, username, userId };
};

export const signIn = createAsyncThunk(
  "authentication/signIn",
  async (user: AuthenticatedUser, { dispatch, rejectWithValue }) => {
    try {
      const response = await signInApi(user);
      dispatch(openAlert({ message: response.message, severity: "success" }));
      history.push("/");
      return handleUserResponse(response);
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

export const signUp = createAsyncThunk(
  "authentication/signUp",
  async (user: NewUser, { dispatch, rejectWithValue }) => {
    try {
      const response = await signUpApi(user);
      dispatch(openAlert({ message: response.message, severity: "success" }));
      history.push("/");
      return handleUserResponse(response);
    } catch (error) {
      let errorMessage = "Internal Server Error";
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      console.log(error);
      dispatch(openAlert({ message: errorMessage, severity: "error" }));
      return rejectWithValue(errorMessage);
    }
  },
);

const initialState: InitialState = {
  error: "",
  successMessage: "",
  loading: "idle",
  user: {} as User,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: {
    [`${signIn.pending}`]: (
      state,
    ) => {
      state.loading = "pending";
    },
    [`${signIn.fulfilled}`]: (
      state,
      action: PayloadAction<UserPayload>,
    ) => {
      const { message, username, userId } = action.payload;
      state.user = {
        username,
        userId,
      };
      state.successMessage = message;
      state.loading = "resolved";
    },
    [`${signIn.rejected}`]: (
      state,
      action: PayloadAction<string, string, any, string>,
    ) => {
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }

      state.loading = "failed";
    },
    [`${signUp.pending}`]: (
      state,
    ) => {
      state.loading = "pending";
    },
    [`${signUp.fulfilled}`]: (
      state,
      action: PayloadAction<UserPayload>,
    ) => {
      const { message, username, userId } = action.payload;
      state.user = {
        username,
        userId,
      };
      state.successMessage = message;
      state.loading = "resolved";
    },
    [`${signUp.rejected}`]: (
      state,
      action: PayloadAction<string, string, any, string>,
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

export default authenticationSlice.reducer;
