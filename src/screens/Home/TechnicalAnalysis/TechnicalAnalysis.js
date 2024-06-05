import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const TechnicalAnalysis = () => {
  const navigation = useNavigation();

  const Data = [
    {
      id: 1,
      title: 'Bollinger Bands',
      desc: 'Bollinger Bands are a popular technical analysis tool used to measure market volatility and identify potential overbought or oversold conditions. They consist of three lines: a middle band (a 20-period simple moving average), an upper band (set two standard deviations above the middle band), and a lower band (set two standard deviations below the middle band). The bands expand during high volatility and contract during low volatility. Traders use Bollinger Bands to spot potential price reversals and confirm trends, making them a versatile tool for various trading strategies.',
      image: require('../../../Assets/Images/bollinger_bands.jpeg'),
    },
    {
      id: 2,
      title: 'Fibonacci',
      desc: 'Fibonacci Retracement is a popular technical analysis tool used to identify potential support and resistance levels in a market. Based on the Fibonacci sequence, key retracement levels are 23.6%, 38.2%, 50%, 61.8%, and 78.6%. Traders apply these levels to a price chart by identifying a significant peak and trough, then dividing the vertical distance by the key Fibonacci ratios. This helps in predicting potential reversal points where the price may experience a pullback or continue its trend, making Fibonacci Retracement a valuable tool for timing market entries and exits.',
      image: require('../../../Assets/Images/fibonacci.jpeg'),
      navigate: 'Fibonacci',
    },
    {
      id: 3,
      title: 'Moving Average',
      desc: 'A Moving Average (MA) is a widely used technical analysis tool that smooths out price data to identify trends over a specific period. It calculates the average price of an asset over a set number of periods, such as 10, 50, or 200 days. There are different types of moving averages, including Simple Moving Average (SMA) and Exponential Moving Average (EMA). MAs help traders identify trend directions, potential support and resistance levels, and can signal buying or selling opportunities when different MAs cross each other.',
      image: require('../../../Assets/Images/Moving_Average.jpeg'),
    },
    {
      id: 4,
      title: 'RSI',
      desc: 'The Relative Strength Index (RSI) is a momentum oscillator used in technical analysis to measure the speed and change of price movements. It ranges from 0 to 100, with readings above 70 indicating overbought conditions and readings below 30 indicating oversold conditions. Traders use RSI to identify potential reversal points and to confirm trends. By analyzing RSI, traders can make informed decisions about buying or selling assets, making it a valuable tool for timing market entries and exits.',
      image: require('../../../Assets/Images/RSI.jpeg'),
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Details', {item})}
        key={index}
        style={styles.container}>
        <FastImage
          style={{
            width: '100%',
            height: '79%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          resizeMode="cover"
          source={item?.image}
        />
        <Text
          style={{
            fontSize: 24,
            color: 'black',
            top: '4%',
            alignSelf: 'center',
            fontWeight: 'bold',
          }}>
          {item?.title}
        </Text>
      </TouchableOpacity>
    );
  };
  const Technical_Analysis = () => {
    return (
      <FlatList
        data={Data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  };

  return <View style={{flex: 1}}>{Technical_Analysis()}</View>;
};

export default TechnicalAnalysis;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    width: '100%',
  },
  container: {
    height: '84%',
    marginHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    marginVertical: '5%',
    borderColor: 'grey',
    backgroundColor: 'white',
  },

  tabContainer: {
    flex: 1,
  },
});
