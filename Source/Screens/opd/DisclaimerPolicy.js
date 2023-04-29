import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';

const DisclaimerPolicy = () => {
  return (
    <WebView source={{ uri: 'https://easywellness.in/disclaimer-policy' }} />

  )
}

export default DisclaimerPolicy

const styles = StyleSheet.create({})