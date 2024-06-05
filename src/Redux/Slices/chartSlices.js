import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {generateChartUrl} from '../apiUtils';
import axios from 'axios';

const initialState = {
  chartData: [],
  status: 'idle',
  error: null,
};
export const fetchChartData = createAsyncThunk(
  'chart/fetchChartData',
  async index => {
    const chartUrl = await generateChartUrl(index);
    const response = await axios.get(chartUrl);
    return response?.data;
  },
);

const chartSlices = createSlice({
  name: 'chart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchChartData.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chartData = action.payload;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default chartSlices.reducer;
