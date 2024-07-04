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
import MovingIndexes from '../../Component/MovingIndexes';

const Home = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const chartData = useSelector(state => state.chart);
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
    <View style={{width: '100%', borderRadius: 20, backgroundColor: 'red'}}>
      <Text
        style={focused ? styles.selectTabBarLabel : styles.unSelectTabBarLabel}>
        {route.title}
      </Text>
    </View>
  );

  const header = () => {
    return <Header Title={'Smart Trader'} Text="🔔" />;
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {header()}
      <MovingIndexes />
      <View style={styles.tabContainer}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={styles.indicater}
              renderLabel={renderLabel}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
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
    height: '7%',
    borderWidth: 2,
    marginHorizontal: 20,
    borderRadius: 15,
  },
});
