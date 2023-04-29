import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  View,
} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');

const ButtonConfirm = props => {
  return (
    <TouchableOpacity
      onPress={props.Press}
      style={{
        width: width * 0.9,
        alignSelf: 'center',
        backgroundColor: '#7083DE',
        height: height * 0.06,
        borderRadius: 10,
        justifyContent: 'center',
        position: 'absolute',
        bottom: height * 0.05,
      }}>
      <Text style={{textAlign: 'center', color: '#fff'}}>{props.Title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonConfirm;

const styles = StyleSheet.create({});
