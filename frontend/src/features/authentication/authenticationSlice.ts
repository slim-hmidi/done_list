import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  signInApi,
  signUpApi,
} from 'features/authentication/authentication.apis';
import {
  AuthenticatedUser,
  AuthenticationResponse,
  HandleUserResponse,
  LoadingStatus,
  NewUser,
  UserPayload,
  UserSliceState,
} from 'types/index';
import {setToken} from 'utils/token';
import {openAlert} from '../alert/alertSlice';
import history from 'history/index';

const handleUserResponse = ({
  data,
  message,
}: AuthenticationResponse): HandleUserResponse => {
  const {token, username, userId} = data;
  setToken(token);
  return {message, username, userId};
};

export const signIn = createAsyncThunk(
  'authentication/signIn',
  async (user: AuthenticatedUser, {dispatch, rejectWithValue}) => {
    try {
      const response = await signInApi(user);
      history.push('/');
      return handleUserResponse(response);
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

export const signUp = createAsyncThunk(
  'authentication/signUp',
  async (user: NewUser, {dispatch, rejectWithValue}) => {
    try {
      const response = await signUpApi(user);
      history.push('/');
      return handleUserResponse(response);
    } catch (error) {
      let errorMessage = 'Internal Server Error';
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      console.log(error);
      dispatch(openAlert({message: errorMessage, severity: 'error'}));
      return rejectWithValue(errorMessage);
    }
  },
);

const initialState: UserSliceState = {
  error: '',
  successMessage: '',
  loading: LoadingStatus.idle,
  user: {
    username: '',
    userId: -1,
  },
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = {
        username: '',
        userId: -1,
      };
      state.successMessage = '';
      state.error = '';
      window.localStorage.removeItem(process.env.REACT_APP_TOKEN as string);
      history.push('/signIn');
    },
  },
  extraReducers: {
    [`${signIn.pending}`]: (state) => {
      state.loading = LoadingStatus.pending;
      state.error = '';
    },
    [`${signIn.fulfilled}`]: (state, action: PayloadAction<UserPayload>) => {
      const {message, username, userId} = action.payload;
      state.user = {
        username,
        userId,
      };
      state.successMessage = message;
      state.loading = LoadingStatus.resolved;
    },
    [`${signIn.rejected}`]: (
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
    [`${signUp.pending}`]: (state) => {
      state.loading = LoadingStatus.pending;
      state.error = '';
    },
    [`${signUp.fulfilled}`]: (state, action: PayloadAction<UserPayload>) => {
      const {message, username, userId} = action.payload;
      state.user = {
        username,
        userId,
      };
      state.successMessage = message;
      state.loading = LoadingStatus.resolved;
    },
    [`${signUp.rejected}`]: (
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

export default authenticationSlice.reducer;

export const {signOut} = authenticationSlice.actions;
