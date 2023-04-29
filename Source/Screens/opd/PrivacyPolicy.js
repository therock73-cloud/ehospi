import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';

const PrivacyPolicy = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Privacy Policy',
    });
  }, [navigation]);

  return <WebView source={{uri: 'https://easywellness.in/privacy-policy'}} />;
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
