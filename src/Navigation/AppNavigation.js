import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import Details from '../Component/Details';
import Fibonacci from '../screens/Home/TechnicalAnalysis/Fibonacci';
import Splash from '../Component/Splash';
import StockDetails from '../screens/Home/StockDetails';
const AppNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="Fibonacci"
          component={Fibonacci}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StockDetails"
          component={StockDetails}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
