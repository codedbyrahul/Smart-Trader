import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';

const data = [
  {key: '1', title: 'NIFTY'},
  {key: '2', title: 'NIFTY BANK'},
  {key: '3', title: 'SENSEX'},
  {key: '4', title: 'BENKEX'},
  {key: '5', title: 'FIN NIFTY'},
  {key: '6', title: 'MID CAP NIFTY'},
];

const {width} = Dimensions.get('window');
const numberOfData = data.length;

const MovingIndexes = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const smoothScrollX = useRef(new Animated.Value(0)).current; // For smooth scrolling
  const scrollViewRef = useRef(null);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    const animateScroll = () => {
      const toValue = reverse
        ? width * numberOfData
        : width * numberOfData * -1;

      Animated.timing(smoothScrollX, {
        toValue: toValue,
        duration: numberOfData * 6000, // Adjust duration for smoother flow
        useNativeDriver: true,
        easing: Easing.linear,
      }).start(({finished}) => {
        if (finished) {
          setReverse(!reverse); // Toggle reverse state
          animateScroll(); // Restart the animation loop
        }
      });
    };

    const listenerId = smoothScrollX.addListener(({value}) => {
      if (scrollViewRef.current) {
        const scrollValue = value % (width * numberOfData);
        scrollViewRef.current.scrollTo({x: scrollValue, animated: false});
      }
    });

    animateScroll(); // Start the initial animation loop

    return () => {
      smoothScrollX.removeListener(listenerId);
    };
  }, [reverse, smoothScrollX]);

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
            <Text style={styles.title}>{item.title}</Text>
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
    width: width - 290,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
  },
});

export default MovingIndexes;
