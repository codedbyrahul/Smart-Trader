import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      checkInLogin();
    }, 2000);
  });
  const checkInLogin = () => {
    // const id = await AsyncStorage.getItem('USERID');
    // if (id !== null) {
    navigation.navigate('BottomTab');
    // } else {
    //   navigation.navigate('Login');
    // }
  };
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 32, color: 'black'}}>Chat App</Text>
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
