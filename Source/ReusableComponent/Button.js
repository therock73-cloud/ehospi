import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const CustomButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        {
          width: props.width,
          height: props.height,
          backgroundColor: props.bgColor,
          alignSelf: props.alignSelf,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: hp('1%'),
          marginTop: props.marginTop,
          borderRadius: props.borderRadius,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        props.style,
      ]}
      disabled={props.disabled}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: props.fontSize,
          color: props.color,
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
