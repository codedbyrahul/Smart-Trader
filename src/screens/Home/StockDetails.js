import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from '../../Component/Header';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fetchStockData} from '../../Redux/Slices/stockInfoSlices';
import WebView from 'react-native-webview';

const StockDetails = ({route}) => {
  const {symbolInfo} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const stockInfo = useSelector(state => state.stockInfo?.stockData);
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (symbolInfo) {
      dispatch(fetchStockData({url: symbolInfo}));
    }
  }, [dispatch, symbolInfo]);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (symbolInfo) {
  //       dispatch(fetchStockData({url: symbolInfo}));
  //     }
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [dispatch, symbolInfo]);

  const header = () => {
    return <Header Title={'Stock Details'} LeftIcon />;
  };
  console.log(stockInfo, 'stockInfo');
  // useEffect(() => {
  //   if (stockInfo.status === 'failed') {
  //     setError('Failed to fetch stock data');
  //   }
  //   if (stockInfo.status === 'succeeded') {
  //     setPrice(stockInfo);
  //   }
  // }, [stockInfo]);

  const mainComponent = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          marginTop: '10%',
        }}>
        <Text>Stock Name: {stockInfo?.stockData?.info?.companyName}</Text>
        <Text>Last Price: {stockInfo?.stockData?.priceInfo?.lastPrice}</Text>
        <Text>Open Price: {stockInfo?.stockData?.priceInfo?.open}</Text>
        <Text>Face Value: {stockInfo?.stockData?.securityInfo?.faceValue}</Text>
        <Text>Closing Price: {stockInfo?.stockData?.priceInfo?.close}</Text>
        <Text>Stock Price: {price !== null ? price : 'Loading...'}</Text>
        {error && <Text>Error: {error}</Text>}
        {/* <SafeAreaView style={styles.container}> */}
        <WebView
          source={{
            uri: 'https://trendlyne.com/equity/139596/RVNL/rail-vikas-nigam-ltd/',
          }}
          style={{flex: 1}}
        />
        {/* </SafeAreaView> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {header()}
      {mainComponent()}
    </SafeAreaView>
  );
};

export default StockDetails;

const styles = StyleSheet.create({});

// import {StyleSheet, Text, View} from 'react-native';
// import React, {useEffect} from 'react';
// import Header from '../../Component/Header';
// import {useDispatch, useSelector} from 'react-redux';
// import {useNavigation} from '@react-navigation/native';
// import {fetchStockData} from '../../Redux/Slices/stockInfoSlices';

// const StockDetails = ({route}) => {
//   const {symbolInfo} = route.params;
//   const stockInfo = useSelector(state => state.stockInfo);
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (symbolInfo && symbolInfo?.url) {
//       dispatch(fetchStockData({url: symbolInfo.url}));
//     }
//   }, [dispatch, symbolInfo]);

//   const header = () => {
//     return (
//       <Header
//         Title={'Stock Details'}
//         LeftStyle={{width: 20, height: 20, top: '20%'}}
//         LeftIcon={require('../../Assets/Icons/back.png')}
//         LeftButton={() => navigation.navigate('BottomTab')}
//       />
//     );
//   };

//   const mainComponent = () => {
//     const {status, stockData, error} = stockInfo;

//     if (status === 'loading') {
//       return <Text>Loading...</Text>;
//     }

//     if (status === 'failed') {
//       return <Text>Error: {error}</Text>;
//     }

//     if (status === 'succeeded' && stockData) {
//       return (
//         <View style={styles.mainComponent}>
//           <Text>Stock Name: {stockData?.info?.companyName}</Text>
//           <Text>Last Price: {stockData?.priceInfo?.lastPrice}</Text>
//           <Text>Open Price: {stockData?.priceInfo?.open}</Text>
//           <Text>Face Value: {stockData?.securityInfo?.faceValue}</Text>
//           <Text>Closing Price: {stockData?.priceInfo?.close}</Text>
//         </View>
//       );
//     }

//     return null;
//   };

//   return (
//     <>
//       {header()}
//       {mainComponent()}
//     </>
//   );
// };

// export default StockDetails;

// const styles = StyleSheet.create({
//   mainComponent: {
//     flex: 1,
//     justifyContent: 'center',
//     top: '10%',
//   },
// });
