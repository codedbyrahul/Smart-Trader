import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from './Header';
import {useNavigation} from '@react-navigation/native';

const Details = props => {
  const navigation = useNavigation();
  const Data = props?.route?.params?.item;
  const header = () => {
    return (
      <Header
        LeftButton={() => navigation.navigate('BottomTab')}
        Title={Data?.title}
        LeftIcon={require('../Assets/Icons/back.png')}
        LeftStyle={{width: 20, height: 20}}
      />
    );
  };
  const SearchBar = () => {
    return (
      <TouchableOpacity
        style={styles.SearchContainer}
        onPress={() => navigation.navigate(Data?.navigate)}>
        <Text style={styles.search}>{'Search'}</Text>
      </TouchableOpacity>
    );
  };

  const content = () => {
    return (
      <View style={{padding: '5%', flex: 1, top: '6%'}}>
        <Image
          source={Data?.image}
          style={{height: '30%', width: '100%', borderRadius: 15}}
          resizeMode={'cover'}
        />
        <Text style={{color: 'black', fontSize: 20, top: '2%'}}>
          {Data?.desc}
        </Text>
      </View>
    );
  };
  return (
    <>
      {header()}
      {SearchBar()}
      {content()}
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  SearchContainer: {
    width: '90%',
    height: '5%',
    borderWidth: 2,
    marginHorizontal: 20,
    borderRadius: 15,
    top: '5%',
  },
  search: {
    textAlign: 'left',
    marginVertical: '2%',
    fontSize: 20,
    color: 'black',
    left: '2%',
  },
});
