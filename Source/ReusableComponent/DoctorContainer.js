import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
  FlatList,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';
const DoctorContainer = props => {
  // console.log('props',props)
  const navigation = useNavigation();
  return (
    <View style={{width: width}}>
      <View
        style={{
          flexDirection: 'row',

          width: width,
          alignSelf: 'center',
          marginTop: '5%',
        }}>
        <View
          style={{
            width: width * 0.28,
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: props.image,
            }}
            style={{
              width: width * 0.25,
              height: width * 0.25,
              borderRadius: (width * 0.25) / 2,
              backgroundColor: '#d6d6d6',
            }}
          />
          {/* <TouchableOpacity
            style={{marginTop: '15%'}}
            onPress={() =>
              navigation.navigate('ProfileDetails', {
                drId: props.DrId,
              })
            }>
            <Text
              style={{
                color: '#7083DE',

                textAlign: 'center',
                fontWeight: '500',
              }}>
              View Profile
            </Text>
          </TouchableOpacity> */}
        </View>

        <View style={{flex: 1, marginLeft: 10}}>
          <Text
            style={{
              color: '#000',
              fontWeight: '500',
              fontSize: 16,
              textTransform: 'capitalize',
            }}>
            {props.drName}
          </Text>
          <Text
            style={{
              color: '#999a9c',
              fontWeight: '400',
              fontSize: 14,
            }}>
            {props.specalist}
          </Text>
          <Text
            style={{
              color: '#999a9c',
              fontWeight: '500',
              fontSize: 15,
            }}>
            {props.department_name}
          </Text>
          <Text
            style={{
              color: '#999a9c',
              fontWeight: '500',
              fontSize: 15,
            }}>
            {props.degree}
          </Text>
          <Text
            style={{
              color: '#999a9c',
              fontWeight: '400',
              fontSize: 14,
            }}>
            {props.experiance} year experiance
          </Text>
          <Text
            style={{
              color: '#999a9c',
              fontWeight: '400',
              fontSize: 14,
            }}>
            {props.hospital_name}
          </Text>
          <Text
            style={{
              color: '#2580D3',
              fontWeight: '400',
              fontSize: 14,
            }}>
            ₹ {props.fee}
          </Text>
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // justifyContent: 'space-between',
              marginVertical: '4%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <AntDesign name="star" size={14} color="#DCBB0B" />
              <Text
                style={{
                  color: '#000',
                  fontWeight: '400',
                  fontSize: 14,
                  marginLeft: width * 0.02,
                }}>
                {props.total_star}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: width * 0.05,
              }}>
              <AntDesign name="edit" size={20} color="#000" />
              <Text
                style={{
                  color: '#000',
                  fontWeight: '400',
                  fontSize: 14,
                  marginLeft: width * 0.02,
                }}>
                {props.total_review} Reviews
              </Text>
            </View>
          </View> */}

<TouchableOpacity
  // disabled={props.enableDisable === '0'}
  style={{
    borderRadius: 5,
    width: '75%',
    marginTop: '5%',
    paddingVertical: '5%',
    backgroundColor:'#7083DE',
    // backgroundColor: props.enableDisable === '0' ? '#C5C5C5' : '#7083DE',
  }}
  onPress={() =>
    navigation.navigate('BookAppoinment', {
      drId: props.DrId,
      enableDisable:props.enableDisable
    })
  }>
  <Text
    style={{textAlign: 'center', color: '#fff', fontWeight: '400'}}>
    Book Appointment
  </Text>
</TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: '#0000001C',
          paddingVertical: 10,
        }}
      />
    </View>
  );
};

export default DoctorContainer;

const styles = StyleSheet.create({});
