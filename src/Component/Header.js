import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const Header = ({
  Title,
  LeftIcon,
  RightIcon,
  LeftButton,
  RightButton,
  LeftStyle,
}) => {
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        top: '5%',
      }}>
      <TouchableOpacity onPress={LeftButton}>
        <Image style={LeftStyle} source={LeftIcon} />
      </TouchableOpacity>
      {Title && (
        <Text style={{fontSize: 25, color: 'black', fontWeight: '700'}}>
          {Title}
        </Text>
      )}
      <TouchableOpacity onPress={RightButton}>
        <Image
          style={{width: 30, height: 30, tintColor: 'black'}}
          source={RightIcon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({});
