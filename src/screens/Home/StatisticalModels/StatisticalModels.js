import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const StatisticalModels = () => {
  return (
    <View>
      <Text style={styles.homeContainer}>{'StatisticalModels'}</Text>
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
