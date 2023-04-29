import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {WebView} from 'react-native-webview';

const RefundPloicy = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Refunds And Cancellation Policy',
    });
  }, [navigation]);
  return (
    <WebView
      source={{uri: 'https://easywellness.in/refunds-and-cancellation'}}
    />
  );
};

export default RefundPloicy;

const styles = StyleSheet.create({});
