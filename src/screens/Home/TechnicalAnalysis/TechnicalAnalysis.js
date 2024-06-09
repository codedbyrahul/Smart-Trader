import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const TechnicalAnalysis = () => {
  const navigation = useNavigation();

  const Data = [
    {
      id: 1,
      title: 'Bollinger Bands',
      desc: 'Bollinger Bands are a popular technical analysis tool used to measure market volatility and identify potential overbought or oversold conditions...',
      image: require('../../../Assets/Images/bollinger_bands.jpeg'),
    },
    {
      id: 2,
      title: 'Fibonacci',
      desc: 'Fibonacci Retracement is a popular technical analysis tool used to identify potential support and resistance levels in a market...',
      image: require('../../../Assets/Images/fibonacci.jpeg'),
      navigate: 'Fibonacci',
    },
    {
      id: 3,
      title: 'Moving Average',
      desc: 'A Moving Average (MA) is a widely used technical analysis tool that smooths out price data to identify trends over a specific period...',
      image: require('../../../Assets/Images/Moving_Average.jpeg'),
    },
    {
      id: 4,
      title: 'RSI',
      desc: 'The Relative Strength Index (RSI) is a momentum oscillator used in technical analysis to measure the speed and change of price movements...',
      image: require('../../../Assets/Images/RSI.jpeg'),
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Details', {item})}
        style={styles.container}>
        <FastImage
          style={{
            width: '100%',
            height: 200,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          resizeMode="cover"
          source={item.image}
        />
        <Text
          style={{
            fontSize: 24,
            color: 'black',
            alignSelf: 'center',
            fontWeight: 'bold',
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={Data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{paddingBottom: 20}}
      style={{flex: 1}}
    />
  );
};

export default TechnicalAnalysis;

const styles = StyleSheet.create({
  container: {
    height: 250, // Adjust as needed
    marginHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    marginVertical: 10,
    borderColor: 'grey',
    backgroundColor: 'white',
  },
});
