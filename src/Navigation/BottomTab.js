import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Indicators from '../screens/Indicators/Indicators';
import Chart from '../screens/Chart/Chart';
import Profile from '../screens/Profile/Profile';

const Tab = createBottomTabNavigator();

const tabs = [
  {icon: require('../Assets/Icons/HomeIcon.png'), index: 0, title: 'Home'},
  {
    icon: require('../Assets/Icons/IndicatorIcon.png'),
    index: 1,
    title: 'Indicators',
  },
  {icon: require('../Assets/Icons/ChartIcon.png'), index: 2, title: 'Chart'},
  {
    icon: require('../Assets/Icons/ProfileIcon.png'),
    index: 3,
    title: 'Profile',
  },
];

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          const tab = tabs.find(item => item.title === route.name);
          return (
            <Image
              source={tab?.icon}
              style={[styles.icon, focused && styles.activeIcon]}
            />
          );
        },
        tabBarLabel: route?.name,
      })}
      tabBarIcon={{
        activeTintColor: 'blue',
        inactiveTintColor: ' black',
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Indicators" component={Indicators} />
      <Tab.Screen name="Chart" component={Chart} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: 'black',
  },
  activeIcon: {
    tintColor: 'blue',
  },
});
