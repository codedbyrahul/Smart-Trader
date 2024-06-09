import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../Component/Header';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fetchStockData} from '../../Redux/Slices/stockInfoSlices';

const StockDetails = ({route}) => {
  const {symbolInfo} = route.params;
  const stockInfo = useSelector(state => state.stockInfo);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  console.log(stockInfo, 'stockInfostockInfo');
  // console.log(symbolInfo, 'symbolInfo');

  useEffect(() => {
    if (symbolInfo && symbolInfo?.url) {
      dispatch(fetchStockData({url: symbolInfo?.symbol}));
    }
  }, [dispatch, symbolInfo]);

  const header = () => {
    return (
      <Header
        Title={'Stock Details'}
        LeftStyle={{width: 20, height: 20, top: '20%'}}
        LeftIcon={require('../../Assets/Icons/back.png')}
        LeftButton={() => navigation.navigate('BottomTab')}
      />
    );
  };
  const mainComponent = () => {
    return (
      <View style={{fles: 1, justifyContent: 'center', top: '10%'}}>
        <Text>{stockInfo?.searchData?.info?.companyName}</Text>
      </View>
    );
  };
  console.log(
    stockInfo?.searchData?.info?.companyName,
    'stockInfo?.info?.companyName',
  );
  return (
    <>
      {header()}
      {mainComponent()}
    </>
  );
};

export default StockDetails;

const styles = StyleSheet.create({});
