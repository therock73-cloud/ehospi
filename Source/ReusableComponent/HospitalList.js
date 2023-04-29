import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import Colors from '../Assets/Constants/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HospitalList = ({item, type, currentlat, currentlng}) => {
  const navigation = useNavigation();
  // console.log('snckdvckds', item);

  return (
    <View>
      <View
        style={{
          width: wp('100%'),

          marginTop: hp('1.5%'),
          backgroundColor: Colors.white,
        }}>
        <View
          style={{
            height: hp('9%'),
            padding: wp('2%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: wp('65%'),
            }}>
            <Text
              style={{
                fontSize: hp('2.5%'),
                color: Colors.black,
                fontWeight: 'bold',
              }}>
              {type == 'Self Pay'
                ? item.hospitalName
                : item.data &&
                  item.data.length > 0 &&
                  item.data[0].hospitalName}
            </Text>
            <Text style={{fontSize: hp('1.6%'), color: Colors.black}}>
              {type == 'Self Pay'
                ? item.city
                : item.data && item.data.length > 0 && item.data[0].city}
            </Text>
          </View>
          <TouchableOpacity
            //disabled={item.enableDisable != '1'}
            style={{
              width: wp('22.5%'),
              height: hp('4%'),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#7BC0EF',
              borderRadius: hp('1%'),
              marginRight: hp('1%'),
              backgroundColor:'#7083DE',
              // backgroundColor: item.enableDisable === '0' ? '#C5C5C5' : '#7083DE',
              // disabled: item.enableDisable !== 1,
            }}
            // onPress={() => getItem(item)}
            onPress={() => {
              // if (item.TotalBed > 0) {
              if (type == 'Self Pay') {
                navigation.navigate('HospitalDetailScreen', {
                  hospitalName: item.hospitalName,
                  hospitalCode: item.hospitalCode,
                  hospitalAddress: item.hospitalAddress,
                  enabledisable:item.enableDisable,
                  hospital_id: item._id,
                  selfPay: true,
                  cordinates: {
                    currentlat: currentlat,
                    currentlng: currentlng,
                    hos_lat: item.lat,
                    hos_lng: item.long,
                  },
                });
              } else {
                navigation.navigate('HospitalDetailScreen', {
                  hospitalName: item.data[0].hospitalName,
                  hospitalCode: item.data[0].hospitalCode,
                  hospitalAddress: item.data[0].hospitalAddress,
                  enabledisable:item.data[0].enableDisable,
                  hospital_id: item.data[0]._id,
                  selfPay: false,
                  cordinates: {
                    currentlat: currentlat,
                    currentlng: currentlng,
                    hos_lat: item.data[0].lat,
                    hos_lng: item.data[0].long,
                  },
                });
              }
              // } else {
              //   alert('Bed not avilable');
              // }

              // alert(val.data[0].hospitalCode);
            }}>
            <Text
              style={{
                color: Colors.white,
                fontWeight: '800',
                fontSize: hp('1.5%'),
              }}>
              View & Book 
            </Text>
          </TouchableOpacity>

          {/* {item.enableDisable === "1" ? (
                            <TouchableOpacity
                              style={{
                                width: wp('22.5%'),
                                height: hp('4%'),
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#7BC0EF',
                                borderRadius: hp('1%'),
                                marginRight: hp('1%'),
                              }}
                              onPress={() => {
                                // if (item.TotalBed > 0) {
                                if (type == 'Self Pay') {
                                  navigation.navigate('HospitalDetailScreen', {
                                    hospitalName: item.hospitalName,
                                    hospitalCode: item.hospitalCode,
                                    hospitalAddress: item.hospitalAddress,
                                    hospital_id: item._id,
                                    selfPay: true,
                                    cordinates: {
                                      currentlat: currentlat,
                                      currentlng: currentlng,
                                      hos_lat: item.lat,
                                      hos_lng: item.long,
                                    },
                                  });
                                } else {
                                  navigation.navigate('HospitalDetailScreen', {
                                    hospitalName: item.data[0].hospitalName,
                                    hospitalCode: item.data[0].hospitalCode,
                                    hospitalAddress: item.data[0].hospitalAddress,
                                    hospital_id: item.data[0]._id,
                                    selfPay: false,
                                    cordinates: {
                                      currentlat: currentlat,
                                      currentlng: currentlng,
                                      hos_lat: item.data[0].lat,
                                      hos_lng: item.data[0].long,
                                    },
                                  });
                                }
                                // } else {
                                //   alert('Bed not avilable');
                                // }

                                // alert(val.data[0].hospitalCode);
                              }}
                            >
                              <Text
                                style={{
                                  color: Colors.white,
                                  fontWeight: '800',
                                  fontSize: hp('1.5%'),
                                }}
                              >
                                View & Book {item.enableDisable}
                              </Text>
                            </TouchableOpacity>
                          ) : null} */}
        </View>

        <View
          style={{height: hp('6%'), width: wp('100%'), flexDirection: 'row'}}>
          <View
            style={{
              height: hp('6%'),
              width: wp('50%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: wp('2%'),
            }}>
            <Text
              style={{
                fontSize: hp('1.5%'),
                fontWeight: '600',
                marginLeft: wp('1%'),
              }}>
              Number of Beds:
            </Text>

            <TouchableOpacity
              style={{
                width: wp('16%'),
                height: hp('3.2%'),
                backgroundColor: Colors.lightGreen,
                borderRadius: hp('0.5%'),
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: wp('0.7%'),
              }}>
              <Text style={{color: Colors.white, fontSize: hp('1.5%')}}>
                {item.TotalBed}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: hp('6%'),
              width: wp('35%'),
              padding: wp('1%'),
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: hp('1.3%'),
                marginLeft: wp('1%'),
                color: Colors.black,
              }}>
              {/* {props.t3} */}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HospitalList;

const styles = StyleSheet.create({
  button: {
    width: wp('22.5%'),
    height: hp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7BC0EF',
    borderRadius: hp('1%'),
    marginRight: hp('1%'),
  },
});

{
  /* {item.enableDisable === "0" &&
            <TouchableOpacity
            
              style={[styles.button, item.enableDisable === "1" && styles.disabledButton]}
              onPress={() => {
                if (type == 'Self Pay') {
                  navigation.navigate('HospitalDetailScreen', {
                    hospitalName: item.hospitalName,
                    hospitalCode: item.hospitalCode,
                    hospitalAddress: item.hospitalAddress,
                    hospital_id: item._id,
                    selfPay: true,
                    cordinates: {
                      currentlat: currentlat,
                      currentlng: currentlng,
                      hos_lat: item.lat,
                      hos_lng: item.long,
                    },
                  });
                } else {
                  navigation.navigate('HospitalDetailScreen', {
                    hospitalName: item.data[0].hospitalName,
                    hospitalCode: item.data[0].hospitalCode,
                    hospitalAddress: item.data[0].hospitalAddress,
                    hospital_id: item.data[0]._id,
                    selfPay: false,
                    cordinates: {
                      currentlat: currentlat,
                      currentlng: currentlng,
                      hos_lat: item.data[0].lat,
                      hos_lng: item.data[0].long,
                    },
                  });
                }
              }}
            >
              <Text
                style={{
                  color: Colors.white,
                  fontWeight: '800',
                  fontSize: hp('1.5%'),
                }}>
                View & Book
              </Text>
            </TouchableOpacity>
          } */
}
