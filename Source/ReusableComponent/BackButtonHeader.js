import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
const BackButtonHeader = props => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="left" size={25} color={'#000'} />
      </TouchableOpacity>
      <Text style={{fontSize: 18, fontWeight: '600', marginLeft: 10}}>
        {props.Title}
      </Text>
    </View>
  );
};

export default BackButtonHeader;

const styles = StyleSheet.create({});
