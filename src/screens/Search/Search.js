import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchStockData} from '../../Redux/Slices/stockInfoSlices';
import {fetchSearchData} from '../../Redux/Slices/nseSlices';
import {useNavigation} from '@react-navigation/native';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {searchData, loading, error} = useSelector(state => state.nse);
  const navigation = useNavigation();
  const handleSearch = useCallback(() => {
    if (searchQuery.trim() !== '') {
      dispatch(fetchSearchData({searchQuery}));
    }
  }, [dispatch, searchQuery]);
  useEffect(() => {
    handleSearch();
  }, [handleSearch]);
  const dispatch = useDispatch();

  const renderSearchResults = () => {
    if (loading) {
      return (
        <ActivityIndicator size="large" color="#0000ff" style={{top: '20%'}} />
      );
    }

    if (error) {
      return (
        <Text
          style={{
            fontSize: 22,
            top: '20%',
            color: 'black',
          }}>
          Error: {error}
        </Text>
      );
    }

    if (!searchData || searchData.length === 0) {
      return (
        <View style={{flex: 1, fontSize: 22, top: '20%', color: 'black'}}>
          <Text>{'No Results Found !!'}</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={searchData?.symbols}
        keyExtractor={index => index.toString()}
        style={{top: '4%'}}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                navigation.navigate('StockDetails', {symbolInfo: item})
              }>
              <Text style={{color: 'black', fontSize: 22}}>
                {item?.symbol_info}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.SearchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Stock"
          placeholderTextColor={'black'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>
      {renderSearchResults()}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  SearchContainer: {
    width: '90%',
    height: '7%',
    borderWidth: 2,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  searchInput: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    fontSize: 18,
    color: 'black',
  },
  item: {
    padding: 20,
    top: '42%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flex: 1,
  },
});
