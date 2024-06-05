import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Header from '../../Component/Header';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import TechnicalAnalysis from './TechnicalAnalysis/TechnicalAnalysis';
import StatisticalModels from './StatisticalModels/StatisticalModels';
import Algorithms from './Algorithms/Algorithms';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSearchData} from '../../Redux/Slices/nseSlices';
import {useNavigation} from '@react-navigation/native';
import {fetchStockData} from '../../Redux/Slices/stockInfoSlices';

const Home = () => {
  const dispatch = useDispatch();
  const {searchData, loading, error} = useSelector(state => state.nse);
  const [searchQuery, setSearchQuery] = useState('');
  const chartData = useSelector(state => state.chart);
  const navigation = useNavigation();
  const handleSearch = useCallback(() => {
    if (searchQuery.trim() !== '') {
      dispatch(fetchSearchData({searchQuery}));
      dispatch(fetchStockData({searchQuery}));
    }
  }, [dispatch, searchQuery]);
  console.log(searchData, 'searchDatasearchDatasearchData');
  useEffect(() => {
    handleSearch();
  }, [handleSearch]);
  const header = () => {
    return (
      <Header Title={'Smart Trader'} LeftStyle={{width: 50, height: 55}} />
    );
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'TechnicalAnalysis', title: 'Technical\nAnalysis'},
    {key: 'StatisticalModels', title: 'Statistical\nModels'},
    {key: 'Algorithms', title: 'Algorithms'},
  ]);

  const renderScene = SceneMap({
    TechnicalAnalysis: TechnicalAnalysis,
    StatisticalModels: StatisticalModels,
    Algorithms: Algorithms,
  });

  const renderLabel = ({route, focused}) => (
    <View style={{width: '100%'}}>
      <Text
        style={focused ? styles.selectTabBarLabel : styles.unSelectTabBarLabel}>
        {route.title}
      </Text>
    </View>
  );

  const searchBar = () => {
    return (
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
    );
  };

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
      {header()}
      {searchBar()}
      {searchQuery?.length > 0 ? (
        renderSearchResults()
      ) : (
        <View style={styles.tabContainer}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={props => (
              <TabBar
                {...props}
                style={{backgroundColor: 'white'}}
                indicatorStyle={styles.indicater}
                renderLabel={renderLabel}
              />
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    marginTop: 27,
  },
  indicater: {
    backgroundColor: 'rgb(13,76,171)',
  },
  selectTabBarLabel: {
    color: 'rgb(13,76,171)',
    fontSize: 10,
    fontWeight: '800',
  },
  unSelectTabBarLabel: {
    color: 'rgb(46, 46, 46)',
    fontSize: 10,
    fontWeight: '800',
  },
  SearchContainer: {
    width: '90%',
    height: '16%',
    borderWidth: 2,
    marginHorizontal: 20,
    borderRadius: 15,
    top: '2%',
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
