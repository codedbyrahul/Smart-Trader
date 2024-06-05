import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

const Fibonacci = () => {
  const [symbol, setSymbol] = useState('AAPL'); // Default symbol
  const [potentialSupport, setPotentialSupport] = useState(null);
  const [potentialResistance, setPotentialResistance] = useState(null);
  const [trend, setTrend] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [stopLossPrice, setStopLossPrice] = useState(null);
  const [targetPrice, setTargetPrice] = useState(null);

  const apiKey = 'pk_32881e850d6541fb8041a8c605ed407d';

  const fetchHistoricalData = async () => {
    const fibLevels = [0.236, 0.382, 0.5, 0.618, 0.786];
    try {
      const response = await fetch(
        `https://cloud.iexapis.com/stable/stock/${symbol}/chart/1y?token=${apiKey}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch historical data');
      }
      const historicalData = await response.json();
      const prices = historicalData.map(quote => quote.close);
      const priceHigh = Math.max(...prices);
      const priceLow = Math.min(...prices);
      const priceSwing = priceHigh - priceLow;
      const fibRetracementLevels = fibLevels.map(
        level => priceHigh - level * priceSwing,
      );

      const potentialResistance = fibRetracementLevels.find(
        level => level > priceLow && level < priceHigh,
      );
      const potentialSupport = fibRetracementLevels.find(
        level => level < priceHigh && level > priceLow,
      );

      setPotentialSupport(potentialSupport);
      setPotentialResistance(potentialResistance);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  const fetchCurrentData = async () => {
    try {
      const response = await fetch(
        `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${apiKey}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch current data');
      }
      const currentData = await response.json();
      const currentPrice = currentData.latestPrice;
      const prevClose = currentData.previousClose;

      const stopLossPct = 0.02;
      const targetPct = 0.05;
      const stopLoss = prevClose * (1 - stopLossPct);
      const target = prevClose * (1 + targetPct);

      let trend, recommendation;
      if (currentPrice > prevClose) {
        trend = 'uptrend';
        recommendation = 'Consider buying';
      } else if (currentPrice < prevClose) {
        trend = 'downtrend';
        recommendation = 'Consider selling';
      } else {
        trend = 'sideways trend';
        recommendation = 'No clear trade recommendation';
      }

      setTrend(trend);
      setRecommendation(recommendation);
      setStopLossPrice(stopLoss);
      setTargetPrice(target);
    } catch (error) {
      console.error('Error fetching current data:', error);
    }
  };

  useEffect(() => {
    fetchHistoricalData();
    fetchCurrentData();
  }, [symbol]);

  const handleSymbolChange = value => {
    setSymbol(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={symbol}
        onChangeText={handleSymbolChange}
        placeholder="Enter symbol"
      />
      <Button
        title="Submit"
        onPress={() => {
          fetchHistoricalData();
          fetchCurrentData();
        }}
      />
      <Text style={styles.text}>
        Potential Support Level: {potentialSupport}
      </Text>
      <Text style={styles.text}>
        Potential Resistance Level: {potentialResistance}
      </Text>
      <Text style={styles.text}>Trend: {trend}</Text>
      <Text style={styles.text}>Recommendation: {recommendation}</Text>
      {stopLossPrice && (
        <Text style={styles.text}>Stop Loss: {stopLossPrice.toFixed(2)}</Text>
      )}
      {targetPrice && (
        <Text style={styles.text}>Target: {targetPrice.toFixed(2)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '80%',
  },
  text: {
    fontSize: 20,
    color: '#007bff',
    marginBottom: 10,
  },
});

export default Fibonacci;
