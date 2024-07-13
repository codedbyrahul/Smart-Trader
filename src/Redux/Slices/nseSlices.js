import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {getBaseUrl} from '../apiUtils';

const initialState = {
  searchData: [],
  status: 'idle',
  error: null,
};

export const fetchSearchData = createAsyncThunk(
  'nse/fetchSearchData',
  async query => {
    const baseUrl = await getBaseUrl();
    const response = await axios.get(
      `${baseUrl}search/autocomplete?q=${query?.searchQuery}`,
    );
    return response?.data;
  },
);

const nseSlice = createSlice({
  name: 'nse',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSearchData.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchSearchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchData = action.payload;
      })
      .addCase(fetchSearchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default nseSlice.reducer;
