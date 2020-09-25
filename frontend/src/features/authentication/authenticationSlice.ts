import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInApi, AuthenticatedUser } from "../../api/authentication/index";

const signIn = createAsyncThunk(
  "authentication/signIn",
  async (user: AuthenticatedUser, thunkAPI) => {
    const response = await signInApi(user);
    return response.data;
  },
);

interface InitialState {
  error: string;
  successMessage: string;
  loading: string;
  user: object | null;
}
const initialState: InitialState = {
  error: "",
  successMessage: "",
  loading: "idle",
  user: null,
};
const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, { payload: {data, message} }) => {
      state.user = data;
      state.successMessage = message;
      state.loading = "resolved";
    });
    // builder.addCase(
    //   signIn.rejected,
    //   (state, action) => {
    //     if (action.payload) {
    //       state.error = action.payload;
    //     } else {
    //       state.error = action.error;
    //     }

    //     state.loading = "failed";
    //   },
    // );
  },
});

export default authenticationSlice.reducer;
