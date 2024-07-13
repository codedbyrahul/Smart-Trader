import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {getyahoofinanceBaseUrl} from '../apiUtils';

const initialState = {
  indexData: [],
  status: 'idle',
  error: null,
};

export const fetchIndexData = createAsyncThunk(
  'nse/fetchIndexData',
  async (symbol, thunkAPI) => {
    try {
      const baseUrl = await getyahoofinanceBaseUrl();
      const response = await axios.get(`${baseUrl}${symbol}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const nseSlice = createSlice({
  name: 'index',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchIndexData.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchIndexData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.indexData = action.payload;
        state.error = null;
      })
      .addCase(fetchIndexData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {clearError} = nseSlice.actions;

export default nseSlice.reducer;
