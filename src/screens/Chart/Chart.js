import React, {useRef, useState} from 'react';
import {View, Dimensions, Animated, Text} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';

const Chart = () => {
  const [scale, setScale] = useState(1);
  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const lastScale = useRef(1);
  const onPinchGestureEvent = Animated.event(
    [{nativeEvent: {scale: pinchScale}}],
    {useNativeDriver: true},
  );

  const screenWidth = Dimensions.get('window').width;

  const onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale.current *= event.nativeEvent.scale;
      setScale(lastScale.current);
      baseScale.setValue(lastScale.current);
      pinchScale.setValue(1);
    }
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View>
        <PinchGestureHandler
          onGestureEvent={onPinchGestureEvent}
          onHandlerStateChange={onPinchHandlerStateChange}>
          <Animated.View
            style={{
              transform: [{scale: Animated.multiply(baseScale, pinchScale)}],
            }}>
            <LineChart
              data={data}
              width={screenWidth}
              height={520}
              yAxisSuffix="k"
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </Animated.View>
        </PinchGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

export default Chart;
