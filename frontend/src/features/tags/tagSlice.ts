import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTagsApi, Tag } from "../../api/tags";

export const getTags = createAsyncThunk(
  "tags/getAll",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getAllTagsApi();
      return response.data;
    } catch (error) {
      let errorMessage = "Internal Server Error";
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      return rejectWithValue(errorMessage);
    }
  },
);

interface InitialState {
  tags: Tag[];
  error: string;
}

const initialState = {
  tags: [] as Tag[],
  error: "",
};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: {
    [`${getTags.fulfilled}`]: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
    },
    [`${getTags.rejected}`]: (
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

export default tagSlice.reducer;
