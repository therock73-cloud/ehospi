import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { WebView } from 'react-native-webview';

const RefundPloicy = () => {
  return (
    <WebView source={{ uri: 'https://easywellness.in/refunds-and-cancellation' }} />

  )
}

export default RefundPloicy

const styles = StyleSheet.create({})