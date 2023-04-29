import {ImageBackground, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const Test = () => {
  return (
    <View
      style={{
        margin: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View>
          <Image
            style={{
              height: 50,
              width: 50,
              backgroundColor: 'pink',
              borderRadius: 50,
            }}
            source={require('./Source/Assets/Images/call.png')}
          />
          <Text>Basic</Text>
        </View>
        <View style={{marginLeft: '5%'}}>
          <Text>Ganpati Hospital</Text>
          <Text> Min charges</Text>
          <Text>Per Km charges </Text>
          <Text>Total charges </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'flex-end',
        }}>
        <View style={{padding: '2%', backgroundColor: 'pink'}}>
          <Text>Add Additional</Text>
        </View>
        <Text>220</Text>
        <Text>20</Text>
        <Text>220</Text>
      </View>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
