import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {fetchIndexData} from '../Redux/Slices/IndexSlices';

const data = [
  {key: '1', title: 'NIFTY', symbol: '^NSEI'},
  {key: '2', title: 'NIFTY BANK', symbol: '^NSEBANK'},
  {key: '3', title: 'SENSEX', symbol: '^BSESN'},
  {key: '4', title: 'NIFTY BANK', symbol: '^NSEBANK'},
  {key: '5', title: 'SENSEX', symbol: '^BSESN'},
];

const {width} = Dimensions.get('window');
const numberOfData = data.length;
const MovingIndexes = () => {
  const dispatch = useDispatch();
  const [prices, setPrices] = useState({});

  const smoothScrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const fetchAllIndicesData = async () => {
      let pricesObj = {};
      for (const item of data) {
        try {
          const response = await dispatch(fetchIndexData(item.symbol));
          const price =
            response.payload?.chart?.result[0]?.meta?.regularMarketPrice ||
            'N/A';
          pricesObj[item.symbol] = price;
        } catch (error) {
          console.error(`Failed to fetch data for ${item.title}:`, error);
          pricesObj[item.symbol] = 'N/A';
        }
      }
      setPrices(pricesObj);
    };
    fetchAllIndicesData();
  }, [dispatch]);

  useEffect(() => {
    const animateScroll = () => {
      smoothScrollX.setValue(0);
      Animated.timing(smoothScrollX, {
        toValue: width * numberOfData,
        duration: numberOfData * 8000,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start(({finished}) => {
        if (finished) {
          animateScroll();
        }
      });
    };

    const listener = smoothScrollX.addListener(({value}) => {
      if (scrollViewRef.current) {
        const scrollValue = value % (width * numberOfData);
        scrollViewRef.current.scrollTo({x: scrollValue, animated: false});
      }
    });

    animateScroll();

    return () => {
      smoothScrollX.removeListener(listener);
    };
  }, [smoothScrollX, width, numberOfData]);

  return (
    <View style={{marginVertical: '4%'}}>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        ref={scrollViewRef}
        contentContainerStyle={{flexDirection: 'row'}}>
        {data.map(item => (
          <View key={item.key} style={styles.item}>
            <Text style={styles.title}>
              {item.title} - {prices[item.symbol]}
            </Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 4,
    borderRadius: 20,
    width: width - 200,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    color: 'red',
  },
});

export default MovingIndexes;
