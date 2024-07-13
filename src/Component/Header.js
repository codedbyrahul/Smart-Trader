import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const Header = props => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {props.LeftIcon && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.LeftIcon}>
          <FastImage
            style={{height: '40%', width: '100%'}}
            resizeMode="contain"
            source={require('../Assets/Icons/back.png')}
          />
        </TouchableOpacity>
      )}
      {props.Title && (
        <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>
          {props.Title}
        </Text>
      )}
      <>
        {props.RightComp && (
          <TouchableOpacity
            onPress={props.RightButton}
            style={styles.notification}>
            {props.Text && (
              <View>
                <Text style={{fontSize: 30}}>{props.Text}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    alignItems: 'center',
    height: Platform.OS === 'android' ? '7%' : '12%',
  },
  LeftIcon: {
    height: '70%',
    width: '12%',
    backgroundColor: 'skyblue',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  notification: {
    backgroundColor: 'rgb(255, 243, 166)',
    borderRadius: 30,
    height: '57%',
    width: '12%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
