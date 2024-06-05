import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {getBaseUrl} from '../apiUtils';

const initialState = {
  stockData: [],
  status: 'idle',
  error: null,
};

export const fetchStockData = createAsyncThunk(
  'stockInfo/fetchStockData',
  async query => {
    console.log(query, 'queryquery');
    const baseUrl = await getBaseUrl();
    // const response = await axios.get(
    //   `${baseUrl}quote-equity?symbol=${query?.symbol}`,
    // );
    const response = await axios.get(`${baseUrl}${query?.url}`);

    // const response = await axios.get(`${baseUrl}${query?.url}`);
    console.log(baseUrl, 'response');
    //  `${baseUrl}quote-equity?symbol=${query?.symbol}`,
    return response?.data;
  },
);

const stockInfoSlices = createSlice({
  name: 'stockInfo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStockData.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchData = action.payload;
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default stockInfoSlices.reducer;
