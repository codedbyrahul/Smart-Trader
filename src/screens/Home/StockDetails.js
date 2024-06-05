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
  // console.log(symbolInfo?.url, 'symbolInfo');

  useEffect(() => {
    if (symbolInfo && symbolInfo?.url) {
      dispatch(fetchStockData({url: symbolInfo}));
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

  return <>{header()}</>;
};

export default StockDetails;

const styles = StyleSheet.create({});
