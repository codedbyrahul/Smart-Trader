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

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   ScrollView,
//   StyleSheet,
// } from 'react-native';
// import * as tf from '@tensorflow/tfjs';
// import {bundleResourceIO} from '@tensorflow/tfjs-react-native';
// import * as yahooFinance from 'yahoo-finance';
// import Plotly from 'plotly-react-native';

// const App = () => {
//   const [stockName, setStockName] = useState('');
//   const [historicalData, setHistoricalData] = useState([]);
//   const [predictions, setPredictions] = useState([]);

//   const fetchData = async symbol => {
//     try {
//       const data = await yahooFinance.historical({
//         symbol,
//         from: '2024-01-01',
//         to: '2024-07-30',
//         period: 'd',
//       });
//       const formattedData = data
//         .map(d => ({date: new Date(d.date), close: d.close}))
//         .reverse();
//       return formattedData;
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       return [];
//     }
//   };

//   const preprocessData = data => {
//     const closePrices = data.map(d => d.close);
//     const min = Math.min(...closePrices);
//     const max = Math.max(...closePrices);
//     const scaledData = closePrices.map(price => (price - min) / (max - min));
//     return {scaledData, min, max};
//   };

//   const createDataset = (data, timeStep = 1) => {
//     const X = [];
//     const y = [];
//     for (let i = 0; i < data.length - timeStep; i++) {
//       X.push(data.slice(i, i + timeStep));
//       y.push(data[i + timeStep]);
//     }
//     return {X, y};
//   };

//   const trainAndPredict = async () => {
//     const rawData = await fetchData(stockName);
//     if (rawData.length === 0) {
//       alert('Error fetching data. Please try again.');
//       return;
//     }

//     const {scaledData, min, max} = preprocessData(rawData);
//     const timeStep = 60;
//     const {X, y} = createDataset(scaledData, timeStep);
//     const tensorX = tf.tensor3d(
//       X.map(item => [item]),
//       [X.length, timeStep, 1],
//     );
//     const tensorY = tf.tensor2d(y, [y.length, 1]);

//     const model = tf.sequential();
//     model.add(
//       tf.layers.lstm({
//         units: 50,
//         returnSequences: true,
//         inputShape: [timeStep, 1],
//       }),
//     );
//     model.add(tf.layers.lstm({units: 50, returnSequences: false}));
//     model.add(tf.layers.dense({units: 25}));
//     model.add(tf.layers.dense({units: 1}));

//     model.compile({optimizer: 'adam', loss: 'meanSquaredError'});
//     await model.fit(tensorX, tensorY, {batchSize: 1, epochs: 1});

//     const startDate = new Date('2024-06-01');
//     const endDate = new Date('2024-06-30');
//     const predictedValues = [];

//     for (
//       let date = startDate;
//       date <= endDate;
//       date.setDate(date.getDate() + 1)
//     ) {
//       const input = tf.tensor3d(
//         [scaledData.slice(-timeStep)],
//         [1, timeStep, 1],
//       );
//       const prediction = await model.predict(input).dataSync();
//       scaledData.push(prediction[0]);
//       const predictedValue = prediction[0] * (max - min) + min;
//       predictedValues.push({date: new Date(date), value: predictedValue});
//     }

//     setHistoricalData(rawData);
//     setPredictions(predictedValues);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Stock Prediction</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Stock Symbol"
//         value={stockName}
//         onChangeText={setStockName}
//       />
//       <Button title="Predict" onPress={trainAndPredict} />
//       {historicalData.length > 0 && predictions.length > 0 && (
//         <Plotly
//           data={[
//             {
//               x: historicalData.map(d => d.date),
//               y: historicalData.map(d => d.close),
//               type: 'scatter',
//               mode: 'lines',
//               name: 'Historical Data',
//             },
//             {
//               x: predictions.map(d => d.date),
//               y: predictions.map(d => d.value),
//               type: 'scatter',
//               mode: 'lines',
//               name: 'Predicted Data',
//             },
//           ]}
//           layout={{
//             title: 'Bank Nifty Index Prediction for June 2024',
//             xaxis: {title: 'Date'},
//             yaxis: {title: 'Bank Nifty Index'},
//           }}
//         />
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
// });

// export default App;
