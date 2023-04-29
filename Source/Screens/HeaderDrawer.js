import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
//import { DrawerActions } from '@react-navigation/routers';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Colors from '../Assets/Constants/Colors';

const HeaderDrawer = props => {
  //console.log('Header Drawer', props)
  return (
    <View
      style={{
        width: wp('100%'),
        height: hp('50%'),
        // backgroundColor: Colors.white,
        paddingHorizontal: wp('3%'),
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={props.onPress}>
        <FontAwesome5 name="bars" size={hp('4%')} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          padding: wp('1%'),
          marginLeft: wp('3%'),
          borderRadius: 3,
        }}
        onPress={() => props.navigation.navigate('Location')}>
        {/* <FontAwesome5 name='map-marker-alt'  size={hp('2%')} /> */}
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: hp('2%'),
            marginLeft: wp('1%'),
          }}>
          Sec 62 Noida
        </Text>
      </TouchableOpacity>
      <Image
        source={require('../Assets/Images/doctor.jpg')}
        style={{
          width: wp('18%'),
          height: wp('18%'),
          borderRadius: hp('5%'),
          marginLeft: wp('40%'),
          marginTop: hp('3%'),
        }}
      />
    </View>
  );
};

export default HeaderDrawer;
