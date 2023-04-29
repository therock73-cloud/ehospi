import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {baseurl} from '../Config/baseurl';
import {SafeAreaView} from 'react-native-safe-area-context';

const BookingHistory = props => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [getTokenId, setTokenId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [getValue, setGetValue] = useState('');
  const [getWard, setWard] = useState('');
  const [getAge, setAge] = useState('');
  const [getHospitalAddress, setHospitalAddress] = useState('');

  const submitDetails = val => {
    props.navigation.navigate('BookingHistoryTwo', {
      alldata: val,
    });
  };

  // useEffect(() => {
  //   getprvData();
  // }, [getTokenId]);
  useEffect(() => {
    userBookinghistory();
  }, []);

  const userBookinghistory = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('tokenId');
    const userid = await AsyncStorage.getItem('user_id');

    var myHeaders = new Headers();
    myHeaders.append('authorization', `Basic ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      appuser_id: userid,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.ehospi.in/user/findBookings', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('result', userid, token);
        setBookingHistory(result.reverse());

      })
      .catch(error => console.log('error', error))
      .finally(() => setIsLoading(false));
    // console.log('code wise Hospital Book bed')
    // axios
    //   .get(baseurl + 'user/findBookings', {
    //     headers: {Authorization: `Bearer ${getTokenId}`},
    //   })
    //   .then(response => {
    //     console.log('response', response);
    //     if (Array.isArray(response.data)) {
    //       let reversedOutput = response.data.reverse();
    //       setBookingHistory(reversedOutput);
    //     }
    //   })
    //   .catch(e => {
    //     console.log(e.response.data);
    //   })
    //   .finally(() => setIsLoading(false));
  };
  // const getprvData = () => {
  //   AsyncStorage.getItem('tokenId').then(token => setTokenId(token));
  //   AsyncStorage.getItem('Ward').then(value => {
  //     setWard(value);
  //     console.log(value);
  //   });
  //   AsyncStorage.getItem('Hname').then(hname => setGetValue(hname));
  //   AsyncStorage.getItem('Haddress').then(Hadd => setHospitalAddress(Hadd));
  // };

  function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  const returnAge = dob => {
    let n = dob.split('-');
    const ag = calculate_age(new Date(n[2], n[0], n[1]));
    return ag;
  };
  // console.log("userid",userid)
console.log("bookingHistory",bookingHistory.bookbedDetail)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <View style={{width: wp('30%'), height: hp('4%')}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('HomePage')}
            style={{
              width: wp('8%'),
              height: hp('4%'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons name="md-chevron-back" size={hp('3.2%')} color="#fff" />
          </TouchableOpacity>
        </View>
        <View
          style={{width: wp('40%'), height: hp('4%'), alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: 'Roboto-Bold',
              fontSize: hp('2.5%'),
              color: '#fff',
              textAlignVertical: 'center',
            }}>
            Booking History
          </Text>
        </View>
        <View style={{width: wp('30%'), height: hp('4%')}}></View>
      </View>
      {isLoading ? (
        <ActivityIndicator
          color="#bc2b78"
          size="large"
          style={{flex: 1, alignSelf: 'center'}}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {bookingHistory.length !== 0 &&
            bookingHistory.map((val, index) => {
              console.log("Val",val);
              return (
                <>
                  {val.type == 'bookdoctor' ? (
                    val.doctorDetails.length > 0 ? (
                      <View
                        key={val.bookingId}
                        style={{
                          backgroundColor: '#fff',
                          // height: hp('14%'),
                          width: wp('88%'),
                          alignSelf: 'center',
                          marginTop: index == 0 ? hp('2%') : 0,
                          marginBottom: hp('2%'),
                          borderRadius: hp('1%'),
                          shadowColor: '#000000',
                          elevation: hp('2%'),
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            backgroundColor: '#CCEBFA',
                            height: hp('3%'),
                            width: wp('88%'),
                            borderTopLeftRadius: hp('1%'),
                            borderTopRightRadius: hp('1%'),
                            justifyContent: 'space-between',
                            paddingLeft: wp('1.5%'),
                            paddingRight: wp('1.5%'),
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Roboto-Medium',
                              fontSize: hp('1.5%'),
                              color: '#000',
                            }}>
                            {val.type == 'bookdoctor' || val.type == 'ambulance'
                              ? val.booking_date != '' &&
                                val.booking_date != undefined &&
                                val.booking_date.split('-')[2] +
                                  '-' +
                                  val.booking_date.split('-')[1] +
                                  '-' +
                                  val.booking_date.split('-')[0]
                              : val.booking_date != '' &&
                                val.booking_date != undefined &&
                                val.booking_date.split('/')[2] +
                                  '-' +
                                  val.booking_date.split('/')[1] +
                                  '-' +
                                  val.booking_date.split('/')[0]}
                            , {' ' + val.booking_time}
                          </Text>
                          <TouchableOpacity>
                            <Text
                              style={{
                                fontFamily: 'Roboto-Medium',
                                fontSize: hp('1.5%'),
                                marginRight: wp('1.5%'),
                                color: '#000',
                              }}>
                              {/* {`${
          val.bookingStatus.charAt(0).toUpperCase() +
          val.bookingStatus.slice(1)
        } ${val.bookingId}`} */}
                              {val.booking_id}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            height: hp('3.5%'),
                            width: wp('88%'),
                            paddingLeft: wp('1.5%'),
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Roboto-Medium',
                              fontSize: hp('1.5%'),
                              color: '#0B12E2',
                            }}>
                            {/* ambulance  bookbed */}
                            {val.type == 'labtest'
                              ? 'Labtest Booking'
                              : val.type == 'bookbed'
                              ? 'Bed Booking'
                              : val.type == 'ambulance'
                              ? 'Ambulance Booking'
                              : 'Doctor Consultation'}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            height: hp('7%'),
                            width: wp('88%'),
                            justifyContent: 'center',
                            borderBottomColor: '#D0D2D2',
                            borderBottomWidth: hp('0.1%'),
                          }}>
                          <View
                            style={{
                              height: hp('6.5%'),
                              width: wp('56.5%'),
                              justifyContent: 'center',
                              paddingLeft: wp('1%'),
                            }}>
                            {val.type == undefined ? (
                              <Text
                                style={{
                                  fontFamily: 'Roboto-Bold',
                                  fontSize: hp('1.5%'),
                                  color: '#000000',
                                }}>
                                {val.doctorDetails[0].doctor_name}
                              </Text>
                            ) : (
                              <Text
                                style={{
                                  fontFamily: 'Roboto-Bold',
                                  fontSize: hp('1.5%'),
                                  color: '#000000',
                                }}>
                                {val.hospitalDetails.length > 0
                                  ? val.hospitalDetails[0].hospitalName +
                                    ', ' +
                                    val.hospitalDetails[0].hospitalAddress
                                  : null}
                              </Text>
                            )}
                            <Text
                              style={{
                                fontFamily: 'Roboto-Medium',
                                fontSize: hp('1.5%'),
                                color: '#0B12E2',
                              }}>
                              {val.type == 'bookbed'
                                ? `₹${
                                    val.bookbedDetail.length > 0 &&
                                    val.bookbedDetail[0].bedPrice
                                  }`
                                : val.type == 'labtest'
                                ? `₹${
                                    val.labtest.length > 0 &&
                                    val.labtest[0].totalAmount
                                  }`
                                : val.type == 'ambulance'
                                ? `₹${
                                    val.ambulanceother.length > 0 &&
                                    val.ambulanceother[0].additionalAmount
                                  }`
                                : `₹${
                                    val.doctorDetails.length > 0 &&
                                    val.doctorDetails[0].fee
                                  }`}
                            </Text>
                          </View>

                          <View
                            style={{
                              height: hp('6.5%'),
                              width: wp('30%'),
                              justifyContent: 'center',
                            }}>
                            <TouchableOpacity
                              style={{
                                width: wp('20%'),
                                height: hp('3.5%'),
                                backgroundColor: '#CCEBFA',
                                borderRadius: hp('0.8%'),
                                alignSelf: 'center',
                                justifyContent: 'center',
                              }}
                              onPress={() => submitDetails(val)}>
                              <Text
                                style={{
                                  fontWeight: 'normal',
                                  fontSize: hp('1.3%'),
                                  color: '#000',
                                  textAlign: 'center',
                                }}>
                                VIEW DETAILS
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View
                          style={{
                            width: wp('88%'),
                            height: hp('3%'),
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Roboto-Bold',
                              fontSize: hp('1.5%'),
                              color: '#0B12E2',
                              marginLeft: wp('1.5%'),
                            }}>
                            Patient Name
                          </Text>
                          <Text
                            style={{
                              fontFamily: 'Roboto-Medium',
                              fontSize: hp('1.5%'),
                              color: '#000000',
                              marginLeft: wp('1.5%'),
                            }}>
                            {val.name}/
                            {val.age == undefined
                              ? null
                              : val.age.length > 4
                              ? returnAge(val.age)
                              : val.age}
                            /{val.gender}{' '}
                          </Text>
                        </View>
                      </View>
                    ) : null
                  ) : (
                    <View
                      key={val.bookingId}
                      style={{
                        backgroundColor: '#fff',
                        // height: hp('14%'),
                        width: wp('88%'),
                        alignSelf: 'center',
                        marginTop: index == 0 ? hp('2%') : 0,
                        marginBottom: hp('2%'),
                        borderRadius: hp('1%'),
                        shadowColor: '#000000',
                        elevation: hp('2%'),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: '#CCEBFA',
                          height: hp('3%'),
                          width: wp('88%'),
                          borderTopLeftRadius: hp('1%'),
                          borderTopRightRadius: hp('1%'),
                          justifyContent: 'space-between',
                          paddingLeft: wp('1.5%'),
                          paddingRight: wp('1.5%'),
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Roboto-Medium',
                            fontSize: hp('1.5%'),
                            color: '#000',
                          }}>
                          {val.type == 'bookdoctor' || val.type == 'ambulance'
                            ? val.booking_date != '' &&
                              val.booking_date != undefined &&
                              val.booking_date.split('-')[2] +
                                '-' +
                                val.booking_date.split('-')[1] +
                                '-' +
                                val.booking_date.split('-')[0]
                            : val.booking_date != '' &&
                              val.booking_date != undefined &&
                              val.booking_date.split('/')[2] +
                                '-' +
                                val.booking_date.split('/')[1] +
                                '-' +
                                val.booking_date.split('/')[0]}
                          , {' ' + val.booking_time}
                        </Text>
                        <TouchableOpacity>
                          <Text
                            style={{
                              fontFamily: 'Roboto-Medium',
                              fontSize: hp('1.5%'),
                              marginRight: wp('1.5%'),
                              color: '#000',
                            }}>
                            {/* {`${
    val.bookingStatus.charAt(0).toUpperCase() +
    val.bookingStatus.slice(1)
  } ${val.bookingId}`} */}
                            {val.booking_id}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          height: hp('3.5%'),
                          width: wp('88%'),
                          paddingLeft: wp('1.5%'),
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Roboto-Medium',
                            fontSize: hp('1.5%'),
                            color: '#0B12E2',
                          }}>
                          {/* ambulance  bookbed */}
                          {val.type == 'labtest'
                            ? 'Labtest Booking'
                            : val.type == 'bookbed'
                            ? 'Bed Booking'
                            : val.type == 'ambulance'
                            ? 'Ambulance Booking'
                            : 'Doctor Consultation'}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          height: hp('7%'),
                          width: wp('88%'),
                          justifyContent: 'center',
                          borderBottomColor: '#D0D2D2',
                          borderBottomWidth: hp('0.1%'),
                        }}>
                        <View
                          style={{
                            height: hp('6.5%'),
                            width: wp('56.5%'),
                            justifyContent: 'center',
                            paddingLeft: wp('1%'),
                          }}>
                          {val.type == undefined ? (
                            <Text
                              style={{
                                fontFamily: 'Roboto-Bold',
                                fontSize: hp('1.5%'),
                                color: '#000000',
                              }}>
                              {val.doctorDetails[0].doctor_name}
                            </Text>
                          ) : (
                            <Text
                              style={{
                                fontFamily: 'Roboto-Bold',
                                fontSize: hp('1.5%'),
                                color: '#000000',
                              }}>
                              {val.hospitalDetails.length > 0
                                ? val.hospitalDetails[0].hospitalName +
                                  ', ' +
                                  val.hospitalDetails[0].hospitalAddress
                                : null}
                            </Text>
                          )}
                          <Text
                            style={{
                              fontFamily: 'Roboto-Medium',
                              fontSize: hp('1.5%'),
                              color: '#0B12E2',
                            }}>
                            {val.type == 'bookbed'
                              ? `₹${
                                  val.bookbedDetail.length > 0 &&
                                  val.bookbedDetail[0].bedPrice
                                }`
                              : val.type == 'labtest'
                              ? `₹${
                                  val.labtest.length > 0 &&
                                  val.labtest[0].totalAmount
                                }`
                              : val.type == 'ambulance'
                              ? `₹${
                                  val.ambulanceother.length > 0 &&
                                  val.ambulanceother[0].additionalAmount
                                }`
                              : `₹${
                                  val.doctorDetails.length > 0 &&
                                  val.doctorDetails[0].fee
                                }`}
                          </Text>
                        </View>

                        <View
                          style={{
                            height: hp('6.5%'),
                            width: wp('30%'),
                            justifyContent: 'center',
                          }}>
                          <TouchableOpacity
                            style={{
                              width: wp('20%'),
                              height: hp('3.5%'),
                              backgroundColor: '#CCEBFA',
                              borderRadius: hp('0.8%'),
                              alignSelf: 'center',
                              justifyContent: 'center',
                            }}
                            onPress={() => submitDetails(val)}>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                fontSize: hp('1.3%'),
                                color: '#000',
                                textAlign: 'center',
                              }}>
                              VIEW DETAILS
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View
                        style={{
                          width: wp('88%'),
                          height: hp('3%'),
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Roboto-Bold',
                            fontSize: hp('1.5%'),
                            color: '#0B12E2',
                            marginLeft: wp('1.5%'),
                          }}>
                          Patient Name
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Roboto-Medium',
                            fontSize: hp('1.5%'),
                            color: '#000000',
                            marginLeft: wp('1.5%'),
                          }}>
                          {val.name}/
                          {val.age == undefined
                            ? null
                            : val.age.length > 4
                            ? returnAge(val.age)
                            : val.age}
                          /{val.gender}{' '}
                        </Text>
                      </View>
                    </View>
                  )}
                </>
              );
            })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
export default BookingHistory;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
  },

  bookingHistory: {
    flexDirection: 'row',
    width: wp('85%'),
    height: hp('7%'),
    marginBottom: hp('2%'),

    alignItems: 'center',
    padding: wp('2%'),
    backgroundColor: '#6495ed',
  },
  head: {
    width: wp('100%'),
    height: hp('7%'),
    backgroundColor: Colors.lightBlue,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  myIcon2: {
    marginLeft: hp('2%'),
  },
  txtContainer: {
    marginTop: hp('2.8%'),
    alignItems: 'center',
  },
  text1: {
    color: 'black',
    fontSize: hp('2%'),
    fontWeight: 'bold',
    fontFamily: 'DancingScript-Bold',
  },
  text2: {
    color: 'black',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },

  bookNow: {
    width: wp('25%'),
    height: hp('5%'),
    borderColor: '#2581d4',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: hp('4%'),
    borderRadius: wp('1.5%'),
  },

  bookNowText: {
    color: '#2581d4',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
});
