import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const BedReact = props => {
  return (
    <TouchableOpacity
      style={{
        width: wp('21%'),
        height: wp('23%'),
        backgroundColor: 'white',
        borderRadius: hp('1.5%'),
        marginTop: hp('2%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: wp('3%'),
      }}
      onPress={props.onPress}>
      <Image
        source={props.image}
        style={{width: wp('15%'), height: wp('15%'), resizeMode: 'contain'}}
      />
      <Text style={{fontSize: hp('1.5%'), marginTop: hp('1%')}}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default BedReact;
