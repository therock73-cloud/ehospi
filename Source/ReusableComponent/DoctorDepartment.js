import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
const DoctorDepartment = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Consultation', {
          data: props.t1,
          type: 'Department',
        })
      }
      style={{}}>
      <View
        style={{
          width: wp('24%'),
          height: wp('24%'),
          borderRadius: hp('1%'),
          marginTop: hp('2%'),
          marginRight: wp('1%'),
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: wp('3.5%'),
          backgroundColor: props.BGColor,
        }}>
        <Image
          source={props.source}
          style={{width: '60%', height: '30%', resizeMode: 'contain'}}
        />
        <Text
          numberOfLines={2}
          style={{
            color: '#000',
            fontSize: hp('1.5%'),
            marginTop: hp('1%'),
            textAlign: 'center',
          }}>
          {props.t1}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorDepartment;
//tooth  Dentist
