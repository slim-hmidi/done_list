import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {getAllTagsApi} from './tag.apis';
import {TagSliceState, Tag, LoadingStatus} from 'types/index';

export const getTags = createAsyncThunk(
  'tag/getAll',
  async (params, {rejectWithValue}) => {
    try {
      const response = await getAllTagsApi();
      return response.data;
    } catch (error) {
      let errorMessage = 'Internal Server Error';
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      return rejectWithValue(errorMessage);
    }
  },
);

const initialState: TagSliceState = {
  tags: [] as Tag[],
  error: '',
  loading: LoadingStatus.idle,
};

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {},
  extraReducers: {
    [`${getTags.pending}`]: (state) => {
      state.error = '';
      state.loading = LoadingStatus.pending;
    },
    [`${getTags.fulfilled}`]: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
      state.loading = LoadingStatus.resolved;
    },
    [`${getTags.rejected}`]: (
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

export default tagSlice.reducer;
