import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const StatisticalModels = () => {
  return (
    <View>
      <Text style={styles.homeContainer}>{'StatisticalModels'}</Text>
      <Text style={styles.homeContainer}>{'Regression Analysis'}</Text>
      <Text style={styles.homeContainer}>{'Time series Analysis'}</Text>
    </View>
  );
};

export default StatisticalModels;

const styles = StyleSheet.create({
  homeContainer: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
});
