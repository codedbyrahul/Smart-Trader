import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const YAHOO_FINANCE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart/';

const getStockData = async symbol => {
  try {
    const response = await fetch(
      `${YAHOO_FINANCE_URL}${symbol}?range=1y&interval=1d`,
    );
    const data = await response.json();

    if (response.status === 200 && data.chart.result) {
      const prices = data.chart.result[0].indicators.quote[0].close;
      const price_high = Math.max(...prices);
      const price_low = Math.min(...prices);
      const price_swing = price_high - price_low;

      const fib_levels = [0.236, 0.382, 0.5, 0.618, 0.786];
      const fib_retracement_levels = fib_levels.map(
        level => price_high - level * price_swing,
      );

      return {
        prices,
        price_high,
        price_low,
        price_swing,
        fib_retracement_levels,
      };
    } else {
      console.log('Failed to retrieve historical data.');
      return null;
    }
  } catch (e) {
    console.log(`Error: ${e}`);
    return null;
  }
};

const getCurrentPrice = async symbol => {
  try {
    const response = await fetch(
      `${YAHOO_FINANCE_URL}${symbol}?range=1d&interval=1d`,
    );
    const data = await response.json();

    if (response.status === 200 && data.chart.result) {
      const currentPrice = data.chart.result[0].meta.regularMarketPrice;
      return currentPrice;
    } else {
      console.log('Failed to retrieve current price.');
      return null;
    }
  } catch (e) {
    console.log(`Error: ${e}`);
    return null;
  }
};

const StockApp = () => {
  const [symbol, setSymbol] = useState('');
  const [currentPrice, setCurrentPrice] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  const handleGetStockData = async () => {
    const currentPrice = await getCurrentPrice(symbol);
    if (currentPrice !== null) {
      setCurrentPrice(currentPrice);

      const data = await getStockData(symbol);
      if (data) {
        const stop_loss_pct = 0.02;
        const target_pct = 0.05;
        const stop_loss = currentPrice * (1 - stop_loss_pct);
        const target = currentPrice * (1 + target_pct);

        let recommendationText = `Recommendation: Consider buying\nStop Loss: ${stop_loss.toFixed(
          2,
        )}\nTarget: ${target.toFixed(2)}`;

        const price_swing = data.price_swing;
        const fib_levels = [0.236, 0.382, 0.5, 0.618, 0.786];
        for (let i = 0; i < data.fib_retracement_levels.length; i++) {
          const retracement_level = data.fib_retracement_levels[i];
          if (Math.abs(currentPrice - retracement_level) < 0.05 * price_swing) {
            recommendationText += `\nCurrent price is near ${
              fib_levels[i] * 100
            }% Fibonacci retracement level: ${retracement_level.toFixed(2)}`;
          }
        }

        setRecommendation(recommendationText);
        setStockData(data);
      } else {
        setRecommendation('No data available for the specified stock symbol.');
      }
    } else {
      setRecommendation('Failed to retrieve current price.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Stock App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter stock symbol"
        value={symbol}
        onChangeText={setSymbol}
      />
      <Button title="Get Stock Data" onPress={handleGetStockData} />
      {currentPrice && (
        <Text style={styles.currentPrice}>
          Current Price of {symbol}: {currentPrice}
        </Text>
      )}
      {recommendation && (
        <Text style={styles.recommendation}>{recommendation}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  currentPrice: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  recommendation: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default StockApp;
