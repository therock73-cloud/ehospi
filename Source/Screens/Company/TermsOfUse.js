import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';


const TermsOfUse = () => {
  return (
    <WebView source={{ uri: 'https://easywellness.in/about-ehospi' }} />

  )
}

export default TermsOfUse

const styles = StyleSheet.create({})