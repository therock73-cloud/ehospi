import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import Colors from '../Assets/Constants/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const Promotion = props => {
  return (
    <View
      style={{
        width: wp('85%'),
        height: hp('15%'),
        backgroundColor: '#7BC0EF',
        alignSelf: 'center',
        borderRadius: hp('2%'),
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        padding: wp('5%'),
        marginHorizontal: wp('2%'),
      }}>
      <View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: hp('2.5%'),
            color: Colors.white,
          }}>
          You are in safe hands
        </Text>
        <Text style={{fontSize: hp('1.5%'), color: Colors.white}}>
          Choose the experts in end to
        </Text>
        <Text style={{fontSize: hp('1.5%'), color: Colors.white}}>
          end surgical care
        </Text>
      </View>
      <Image
        source={require('../Assets/Images/doctor1.png')}
        style={{width: wp('40%'), height: hp('15%'), bottom: 0}}
        resizeMode="cover"
      />
    </View>
  );
};

export default Promotion;
