import React from 'react';
import AppNavigation from './src/Navigation/AppNavigation';
import {Provider} from 'react-redux';
import store from './src/Redux/Store';

const App = () => (
  <Provider store={store}>
    <AppNavigation />
  </Provider>
);

export default App;

// import React, {useEffect, useState} from 'react';
// import {View, Text} from 'react-native';
// import axios from 'axios';

// const StockPrice = () => {
//   const [price, setPrice] = useState(null);
//   const [error, setError] = useState(null);

//   const fetchPrice = async () => {
//     const url = 'https://www.nseindia.com/api/quote-equity?symbol=IRFC';
//     const headers = {
//       'User-Agent':
//         'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
//       Referer: 'https://www.nseindia.com/get-quotes/equity?symbol=IRFC',
//       Accept: 'application/json',
//       'Accept-Language': 'en-US,en;q=0.9',
//       Connection: 'keep-alive',
//     };

//     try {
//       const response = await axios.get(url, {headers});

//       // Logging status and headers to debug
//       console.log('Response status:', response.status);
//       console.log('Response headers:', response.headers);
//       console.log(
//         response.headers['content-type'].includes('application/json'),
//         'dfgh',
//       );
//       const contentType = response.headers['content-type'];
//       console.log('Content-Type:', contentType);
//       // Check if the response is JSON
//       if (response.headers['content-type'].includes('application/json')) {
//         const data = response.data;
//         setPrice(data.priceInfo.lastPrice);
//         console.log(data);
//       } else {
//         throw new Error('Response is not JSON');
//       }
//     } catch (error) {
//       console.error('Fetch error:', error);
//       setError('Failed to fetch stock price');
//     }
//   };
//   useEffect(() => {
//     fetchPrice();
//     const interval = setInterval(fetchPrice, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <View>
//       <Text>Stock Price: {price !== null ? price : 'Loading...'}</Text>
//       {error && <Text>Error: {error}</Text>}
//     </View>
//   );
// };

// export default StockPrice;
