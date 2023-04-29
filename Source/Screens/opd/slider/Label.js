import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Label = ({text, ...restProps}) => {
  return (
    <View style={styles.root} {...restProps}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    position: 'absolute',
    bottom: -50,
    left: -10,
    // backgroundColor: '#fff',
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export default memo(Label);
