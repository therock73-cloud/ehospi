import {View, ActivityIndicator, Text} from 'react-native';
import React from 'react';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

export default function AcitvityLoading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
      }}>
      <ActivityIndicator size="large" color="#2580D3" />
    </View>
  );
}
