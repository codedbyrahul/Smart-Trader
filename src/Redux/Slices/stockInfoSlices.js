import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  stockData: null,
  status: 'idle',
  error: null,
};

export const fetchStockData = createAsyncThunk(
  'stockInfo/fetchStockData',
  async query => {
    console.log(query.url.url);
    try {
      const response = await axios.get(
        `https://www.nseindia.com/api/quote-equity?symbol=${query.url.symbol}`,
        // `https://www.nseindia.com/api${query.url.url}`,
        {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
          Connection: 'keep-alive',
          Cookie:
            'nsit=fXzRg7WmU0BA0ntjgAYE75Uq; AKA_A2=A; defaultLang=en; _ga=GA1.1.265452739.1719595518; ak_bmsc=A49A2A685221DA8AC9B4143D202EF1D3~000000000000000000000000000000~YAAQP4ksMTtsiUyQAQAAQ0rhXxg0d8TyJpKqjjbIFaeUBdtgPNkrj6wMS80UygTGFFoScidNN5jEqq0QRdnsGlYQAZKfeM1499cVQvnNQ+INFjO93Jo7jYDf3oOed8sFuJHIBeyGeoBXs16NJrlYS9ImET66bmpdR+m45u3e55DNuq0fohA61pwRz9IPrIf80pHr/g3U8+ltGp8zzDOUgK64xvMP+5Tyu88CN1O9reWz0u4hLGwOKEzUKpkj9WkYgfrpcyJV3itKabl4LZUR7f6G0eOmFMXsxRlWUKo3QqocnfY4NcS2bsZmymu3IuCRHAuiMcSCm8owqw0GtEhhWgksebprwPZhWHDUikWBtsTwvWP6HkAL9lqCFEoiF8YCuSzWrfBSnPaYVReTCEYkyyQSKtaSGq3HtgUuuH59cmUvxB985qRs9eUMRgJAZHzg6g==; _abck=B1560FD8F123EDC4FB30344F1950165F~0~YAAQP4ksMZNviUyQAQAA/LPhXwy5ZcTDsoKHjkyKZJVWEg1qDecY3Hj2GEUpLE7YVZyIeCaChuN67GFqn8ezLGT5Y/J61HnG0foZCNk4CM68RSd7L7ijLVIFIAK4BNC/4Oz4nc56nk0rSren+hKDwdOv3gujbCMUCJ2usyPxxWZIXsbNKaTpMdgVvXoiS6PmhIyzLeZ/r1+snw9USUHCtoJw1itMdwYlZ7DenZZ8vN8b5vH4a77KGklWzzj0YmTvMP3Y2AezRRnBxWCHlTgtR2B+sJ/C3NQGf1GyPTB0+uE+beIr9/NNLkzDQ14ma+kgW3PtFn5/YyUWBkHJhPcsOi4m3R2RT5hjFpyfGHp2BnMWuREWdu1ziuM1fzEGDeB+pBDKQKao3c12ZACarb+kWyOPScgr40Lv2AY=~-1~-1~-1; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTcxOTU5NTU0OCwiZXhwIjoxNzE5NjAyNzQ4fQ.w4VcwcDro83w1E8xb3Ad_vxa74PukcOpFBdOooMG35M; bm_sv=05A9713DD76F51C139814184498B4D1A~YAAQP4ksMeJviUyQAQAARL/hXxjYoqju1a2gHK7ry0mUFaFLI54jsibwiTWnI5b9lm3Oo/JgVfAXrZBcLt7OQEIHzMWDsutmFuRAVCmeqhgPH0WZLR9wJosmNi2s54zdBzdEkRckmrCVreGq0/ikozIiBtk4p5TtZdY4qng0iVoE+gdNQLJibqpTcCXGxf93H8VnflHsykXxTw4bucwGMNLDWDCwTNlx/O4f/ZjaSZ0sofNiSouYnaYz9l6HsoT+6Gc=~1; bm_sz=5F03143E1CCE6EC6C0A2BA6EDFBF81F5~YAAQP4ksMeNviUyQAQAARL/hXxig4/0li2BA3ST0EQ9wfijqOYhiXIVpcz7xbAnQofKGvgYjtH1DPdY7mS1YvG2vFpzTsV/lBIwzgX+KgRoK/4i+CXUpAh6IiV2cUtCfR+YutX8ZByE06rzcI5Iskg42K+oWJ0zhf19VkX/kCbm/OCWtEgxbm9QTYpAaHA0BA8QGAvPpNsjkF/INkuUNq8WZZK3s2+aZQIOm8YiGIE1zF629fplXQCXDzkmnhUmtCFASjdSbWuqrhT/Jv4+S8WD+9//ZWL2U1cvUWgGszJFuPPFm/r0+S+T6MENvwQ21TEWclMYjdscI92GYeEPwdknjQdHsDu8bfkGiRyE1NwucO1oIw7GnXDyg2duiOxNmJ4Uf7xZioTMmO5tSLQ==~3490097~3486790; RT="z=1&dm=nseindia.com&si=fa5ab7c7-f217-4ba1-8018-3c0fcf981f7c&ss=lxyyrouk&sl=1&se=8c&tt=782&bcn=%2F%2F684d0d44.akstat.io%2F"; _ga_87M7PJ3R97=GS1.1.1719595518.1.1.1719595550.28.0.0',
          Host: 'www.nseindia.com',
          Referer: `https://www.nseindia.com/api/quote-equity?symbol=${query.url.symbol}`,
        },
      );

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      const contentType = response.headers['content-type'];
      console.log('Content-Type:', contentType);

      if (contentType && contentType.includes('application/json')) {
        const data = response.data;
        console.log('Response Data:', data);

        return response; // Return data as the payload
      } else {
        throw new Error(
          'Response is not JSON or does not have expected content type',
        );
      }
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; // Throw the error to be handled by Redux toolkit
    }
  },
);

// Create the slice for stock information
const stockInfoSlice = createSlice({
  name: 'stockInfo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStockData.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stockData = action.payload; // Update stockData with fetched data
        // console.log('action', action.payload);
        state.error = null;
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default stockInfoSlice.reducer;
