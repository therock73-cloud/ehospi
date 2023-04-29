import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
  FlatList,
  Image,
  TextInput,
  ScrollView,
  BackHandler,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseurl} from '../../Config/baseurl';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ButtonConfirm from '../../ReusableComponent/ButtonConfirm';
const {width, height} = Dimensions.get('window');
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import BackButtonHeader from '../../ReusableComponent/BackButtonHeader';
import {Getgenderdata, Getrelationdata} from '../../Services/auth';

const LabtestBook = ({navigation, route}) => {
  const [cartdata, setcartdata] = useState();

  //patients
  const [patientsmodal, setpatientsmodal] = useState(false);
  const [patientsdata, setpatientsdata] = useState([]);
  const [patientsselect, setpatientsselect] = useState();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [relation, setRelation] = useState('');
  const [addnewpatients, setaddnewpatients] = useState(false);

  //timeslot
  const [timeslotmodal, settimeslotmodal] = useState(false);
  const [selecteddate, setselecteddate] = useState();
  const [selectedtimeslot, setselectedtimeslot] = useState();
  const [labtest_timeslot_id, setlabtest_timeslot_id] = useState();
  //address
  const [addressmodal, setaddressmodal] = useState(false);
  const [addressdata, setaddressdata] = useState([]);
  const [addressselect, setaddressselect] = useState();

  // location
  const [locationmodal, setlocationmodal] = useState(false);
  const [locationCheck, setlocationCheck] = useState();
  const [testlocationselected, settestlocationselected] = useState();
  const [timeslotdata, settimeslotdata] = useState([]);
  const [datedata, setdatedata] = useState([]);
  const [datenumber, setdatenumber] = useState();

  const [isLoding, setisLoading] = useState(true);

  // const [cartdata, setcartdata] = useState(route.params.dataCart);
  const [bookingmodal, setbookingmodal] = useState(false);
  const [bookingdetaildata, setbookingdetaildata] = useState();
  const [genderModal, setgenderModal] = useState(false);
  const [relationModal, setrelationModal] = useState(false);
  const [relationdata, setrelationdata] = useState([]);
  const [genderdata, setgenderdata] = useState([]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Booking',
    });
  }, [navigation]);

  // useEffect(() => {
  //   viewcartHandler();
  //   GetAddressHandler();
  //   GetfamilyHandler();
  // }, []);
  const getgender = async () => {
    try {
      let res = await Getgenderdata();
      setgenderdata(res.data);
      console.log(res);
    } catch (e) {}
  };
  const getrelation = async () => {
    try {
      let res = await Getrelationdata();
      setrelationdata(res.data);
      console.log(res);
    } catch (e) {}
  };

  useFocusEffect(
    React.useCallback(() => {
      getgender();
      getrelation();
      viewcartHandler();
      GetAddressHandler();
      GetfamilyHandler();
      const backAction = () => {
        console.log('You can not go Back');
        navigation.goBack();
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, []),
  );
  // console.log(locationCheck, testlocationselected);
  const viewcartHandler = async () => {
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('tokenId');
    console.log(token, id);
    var myHeaders = new Headers();
    myHeaders.append('authorization', `Basic ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      appuser_id: id,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.ehospi.in/labtest/lab_viewcart', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.length > 0) {
          setcartdata(result[0].patient_details[0]);
          // if (
          //   result[0].patient_details[0].testLocation[0].testLocStatus ==
          //   'active'
          // ) {
          //   settestlocationselected(
          //     result[0].patient_details[0].testLocation[0],
          //   );
          //   setlocationCheck('Home');
          // }
          // if (
          //   result[0].patient_details[0].testLocation[1].testLocStatus ==
          //   'active'
          // ) {
          //   settestlocationselected(
          //     result[0].patient_details[0].testLocation[1],
          //   );
          //   setlocationCheck('Lab');
          // }
          setselecteddate(
            today.getFullYear() +
              '-' +
              (today.getMonth() + 1) +
              '-' +
              today.getDate(),
          );
          TimeSlotHandler(
            result[0].patient_details[0].hospital_id,
            GettodayDate,
          );
        } else {
          setcartdata();
        }
      })
      .catch(error => console.log('error', error));
  };
  const deletecartHandler = async () => {
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('tokenId');
    console.log(token);
    var myHeaders = new Headers();
    myHeaders.append('authorization', `Basic ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      appuser_id: id,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.ehospi.in/labtest/lab_deletecart', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('view_result', result);
        viewcartHandler();
      })
      .catch(error => console.log('error', error));
  };
  const GetAddressHandler = async () => {
    const token = await AsyncStorage.getItem('tokenId');
    const userid = await AsyncStorage.getItem('user_id');

    var myHeaders = new Headers();
    myHeaders.append('authorization', `Basic ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      user_id: userid,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.ehospi.in/labtest/view_address', requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        if (result.length > 0) {
          setaddressdata(result);
        }
      })
      .catch(error => console.log('error', error));
  };
  const GetfamilyHandler = async () => {
    const userid = await AsyncStorage.getItem('user_id');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      user_id: userid,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.ehospi.in/user/family-list', requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setpatientsdata(result.response);
        setisLoading(false);
      })
      .catch(error => console.log('error', error));
  };
  const deleteBookingAppoinment = delid => {
    console.log('id>>>><<<', delList);
    axios
      .post(baseurl + 'user/family-delete', {
        id: delid,
      })
      .then(res => {
        // console.log('delete sucessfully', res?.data);
        GetfamilyHandler();
        //Alert.alert(res?.data?.message)
      });
  };
  const addDetails = async () => {
    const userid = await AsyncStorage.getItem('user_id');

    axios
      .post('https://api.ehospi.in/user/family-create', {
        user_id: userid,
        name: name,
        age: age,
        gender: gender,
        relation: relation,
      })
      .then(res => {
        setaddnewpatients(false);
        GetfamilyHandler();
        //console.log("FAMILY_LIST"+JSON.stringify(res));
      });

    setConfVisible(false);

    setVisible(false);
  };
  const getdateHandler = async () => {
    const token = await AsyncStorage.getItem('tokenId');
    var myHeaders = new Headers();
    myHeaders.append('authorization', `Basic ${token}`);

    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      hospital_id: '639cc8778e0f5535a68c8bcf',
      startDate: '2022-12-18',
      endDate: '2022-12-18',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.ehospi.in/labtest/lab_timeslot_date', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.response[0].date);
        setdatedata(result.response[0].date);
      })
      .catch(error => console.log('error', error));
  };
  const TimeSlotHandler = async (id, timedate) => {
    var myHeaders = new Headers();
    const token = await AsyncStorage.getItem('tokenId');
    console.log(token);
    myHeaders.append('authorization', `Basic ${token}`);
    // myHeaders.append(
    //   'authorization',
    //   'Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJwaDcwMTc0NTY3NDQiLCJpYXQiOjE2NzE1NTM1MzUsImV4cCI6MTY3MTcyNjMzNX0.mW2wPX77hLFFSGoo_CuH4SyPCk49OsRO63RhmqJIFPQ',
    // );
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      // hospital_id: route.params.dataCart.hospital_id,
      // selectedDate: GettodayDate,
      hospital_id: id,
      selectedDate: timedate,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.ehospi.in/labtest/lab_timeslot_time', requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        settimeslotdata(result.response);
      })
      .catch(error => console.log('error', error));
  };
  const checkoutHandler = async () => {
    if (
      selectedtimeslot != undefined &&
      addressselect != undefined &&
      patientsselect != undefined
    ) {
      const id = await AsyncStorage.getItem('user_id');
      const token = await AsyncStorage.getItem('tokenId');
      console.log(token);
      var myHeaders = new Headers();
      myHeaders.append('authorization', `Basic ${token}`);
      myHeaders.append('Content-Type', 'application/json');
      const subTotal =
        Number(selectedtimeslot.extraPrice) == undefined
          ? 0
          : selectedtimeslot.extraPrice;
      const ExtraAmount =
        locationCheck == 'Home Collection'
          ? Number(cartdata.homeloc_extra_amt)
          : 0;
      const totalAmount =
        Number(cartdata.total_amount) + subTotal + ExtraAmount;

      console.log(totalAmount);

      var raw = JSON.stringify({
        appuser_id: id,
        patient_details: [
          {
            labtest_timeslot_id: selectedtimeslot.labtest_timeslot_id,
            patient_name: patientsselect.name,
            patient_age: patientsselect.age,
            patient_gender: patientsselect.gender,
            patient_relation: patientsselect.relation,
            // bookingDate: selecteddate,
            // bookingTime: selectedtimeslot,
            bookingDate: selectedtimeslot.date,
            bookingTime: selectedtimeslot.timeslot,
            labtest: [
              {
                package_id: cartdata._id,
                hospital_id: cartdata.hospital_id,
                test_for: cartdata.test_for,
                subtotalAmount: cartdata.subtotal_amount,
                totalAmount: totalAmount,
                discountPercentage: cartdata.discount_percentage,
                status: cartdata.status,
                testLocation: [
                  {
                    testLocId: testlocationselected.testLocId,
                    testLocName: testlocationselected.testLocName,
                    testLocStatus: testlocationselected.testLocStatus,
                  },
                ],
                address_details: {
                  name: addressselect.name,
                  flat_building_name: addressselect.flat_building_name,
                  pincode: addressselect.pincode,
                  locality: addressselect.locality,
                  city: addressselect.city,
                  state: addressselect.state,
                  mobile_number: addressselect.mobile_number,
                  home_office_other: addressselect.home_office_other,
                },
              },
            ],
          },
        ],
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      console.log(raw);
      fetch('https://api.ehospi.in/labtest/checkout', requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);

          if (result.message === 'Booking Created Successfully.') {
            deletecartHandler();
            getBookinDetails();
            setbookingmodal(true);
          }
        })
        .catch(error => console.log('error', error));
    } else {
      alert('Select patients, time slot, location, and addredss');
    }
  };
  const Sectionlist = props => {
    return (
      <View
        style={{
          width: width * 0.9,
          alignSelf: 'center',
          backgroundColor: '#ffffff',
          ...styles.shadowProp,
          marginTop: '5%',
          padding: '5%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: '#000', fontSize: 14}}>
            {cartdata.labOrTestStatus == 'test' ? 'Test' : 'Package'}
          </Text>
          <TouchableOpacity onPress={props.Press}>
            <AntDesign name="close" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={{marginVertical: '3%', color: '#2580D3', fontSize: 14}}>
          {props.Title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: '#000', fontSize: 14}}>
            {testlocationselected != undefined &&
              testlocationselected.testLocName}
          </Text>
          <Text style={{color: '#000', fontSize: 14}}>₹{props.fee}</Text>
        </View>
      </View>
    );
  };
  const getBookinDetails = async () => {
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
        console.log('result', userid);
        const p = result.length - 1;
        console.log('sdfghj', result[p]);
        console.log(result[p].booking_id);
        setbookingdetaildata(result[p]);
      })
      .catch(error => console.log('error', error));
    // axios
    //   .get(baseurl + 'user/findBookings/', {
    //     headers: {Authorization: `Bearer ${token}`},
    //   })
    //   .then(response => {
    //     const p = response.data.length - 1;
    //     console.log('sdfghj', response.data[p]);
    //     console.log(response.data[p].bookingId);
    //     setjkhjkdhsjks(response.data[p]);
    //   });
  };
  const today = new Date();
  var GettodayDate =
    today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
  var Get7dayagoDate =
    today.getFullYear() +
    '/' +
    (today.getMonth() + 1) +
    '/' +
    (today.getDate() + 7);
  // today.setTime(today.getTime() + 1000 * 60 * 60 * 24);

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const Dateset = newDate => {
    const date = newDate || new Date();
    const DateFinal =
      date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    setselecteddate(
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
    );
    TimeSlotHandler(cartdata.hospital_id, DateFinal);
  };
  const getPreviousDate = () => {
    const currentDayInMilli = new Date(selecteddate).getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const previousDayInMilli = currentDayInMilli - oneDay;
    const previousDate = new Date(previousDayInMilli);

    Dateset(previousDate);
  };

  const getNextDate = () => {
    const currentDayInMilli = new Date(selecteddate).getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const nextDayInMilli = currentDayInMilli + oneDay;
    const nextDate = new Date(nextDayInMilli);
    console.log(nextDate);
    Dateset(nextDate);
  };
  console.log(selecteddate);
  return isLoding ? null : (
    <SafeAreaView style={{flex: 1}}>
      {cartdata != undefined ? (
        <View style={{flex: 1}}>
          <BackButtonHeader Title={'Lab Booking'} />

          <ScrollView>
            <Sectionlist
              Title={cartdata != undefined && cartdata.package_name}
              fee={
                locationCheck == 'Home Collection'
                  ? cartdata == undefined
                    ? null
                    : Number(cartdata.total_amount) +
                      Number(cartdata.homeloc_extra_amt)
                  : cartdata == undefined
                  ? null
                  : cartdata.total_amount
              }
              Press={() => deletecartHandler()}
            />

            <TouchableOpacity
              onPress={() => setpatientsmodal(!patientsmodal)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: width * 0.9,
                marginTop: '5%',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: '700',
                  marginRight: '8%',
                }}>
                Select Patients
              </Text>
              <AntDesign name="down" size={20} color="#000" />
            </TouchableOpacity>
            {patientsselect != undefined ? (
              <View
                style={{
                  width: width * 0.9,
                  alignSelf: 'center',
                  backgroundColor: '#ffffff',
                  ...styles.shadowProp,
                  marginTop: '5%',
                  paddingHorizontal: '5%',
                  paddingVertical: '4%',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: width * 0.7,

                    marginLeft: '4%',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: '500',
                      fontSize: 16,
                    }}>
                    {patientsselect.name}
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: '300',
                      fontSize: 14,
                    }}>
                    {patientsselect.relation}
                  </Text>

                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '500',
                        color: '#B0B2B5',
                      }}>
                      {age}{' '}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '500',
                        color: '#B0B2B5',
                      }}>
                      {patientsselect.gender}
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}
            <TouchableOpacity
              onPress={() => setaddressmodal(!addressmodal)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: width * 0.9,
                marginTop: '5%',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: '700',
                  marginRight: '8%',
                }}>
                Select Address
              </Text>
              <AntDesign name="down" size={20} color="#000" />
            </TouchableOpacity>
            {addressselect != undefined ? (
              <View
                // onPress={() => setaddressselect(item)}
                style={{
                  width: width * 0.9,
                  alignSelf: 'center',
                  backgroundColor: '#ffffff',
                  ...styles.shadowProp,
                  marginTop: '5%',
                  paddingHorizontal: '5%',
                  paddingVertical: '4%',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 16,
                      marginVertical: '2%',
                    }}>
                    {addressselect.home_office_other}
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 14,
                      marginVertical: '2%',
                    }}>
                    {addressselect.flat_building_name +
                      ', ' +
                      addressselect.locality +
                      ', ' +
                      addressselect.city +
                      ', ' +
                      addressselect.state +
                      ', ' +
                      addressselect.pincode}
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 16,
                      marginVertical: '2%',
                    }}>
                    {addressselect.mobile_number}
                  </Text>
                </View>
              </View>
            ) : null}

            <TouchableOpacity
              onPress={() => setlocationmodal(!locationmodal)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: width * 0.9,
                marginTop: '5%',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: '700',
                  marginRight: '8%',
                }}>
                Test Location
              </Text>
              <AntDesign name="down" size={20} color="#000" />
            </TouchableOpacity>

            {selectedtimeslot != undefined ? (
              <View
                style={{
                  width: width * 0.9,
                  alignSelf: 'center',
                  backgroundColor: '#ffffff',
                  ...styles.shadowProp,
                  marginTop: '5%',
                  paddingHorizontal: '5%',
                  paddingVertical: '4%',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '500',
                    fontSize: 16,
                  }}>
                  {selectedtimeslot.timeslot}
                </Text>
                {selectedtimeslot.extraPrice > 0 ? (
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: '400',
                      fontSize: 14,
                    }}>
                    +Rs.{selectedtimeslot.extraPrice} Extra
                  </Text>
                ) : null}
              </View>
            ) : null}
          </ScrollView>
          <TouchableOpacity
            onPress={() => checkoutHandler()}
            style={{
              width: width * 0.9,
              alignSelf: 'center',
              backgroundColor: '#7083DE',
              height: height * 0.06,
              borderRadius: 10,
              justifyContent: 'center',
              position: 'absolute',
              bottom: height * 0.05,
            }}>
            <Text style={{textAlign: 'center', color: '#fff'}}>Book</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              color: '#737373',
              fontSize: 20,
              fontWeight: '700',
            }}>
            Cart Empty
          </Text>
        </View>
      )}
      <Modal
        animationType="slide"
        visible={addressmodal}
        transparent={true}
        onRequestClose={() => setaddressmodal(!addressmodal)}>
        <View style={{position: 'absolute', bottom: 0}}>
          <View
            style={{
              width: width,
              height:
                Platform.OS === 'ios'
                  ? height * 0.95
                  : height - StatusBar.currentHeight,
              // borderTopLeftRadius: width * 0.1,
              // borderTopRightRadius: width * 0.1,
              backgroundColor: '#ffffff',
              elevation: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: '5%',
                marginVertical: '2%',
              }}>
              <Text style={{color: '#000', fontSize: 20}}>Address details</Text>
              <TouchableOpacity onPress={() => setaddressmodal(!addressmodal)}>
                <AntDesign name="close" size={25} color="#000000" />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: '#000000',
                paddingHorizontal: '5%',
                fontSize: 16,
                marginTop: '3%',
              }}>
              Selet Address
            </Text>
            <Text
              style={{
                color: '#010204',
                fontSize: 14,
                paddingHorizontal: '5%',
                marginVertical: '2%',
              }}>
              A phlebotomist will visit you to collect samples
            </Text>
            <FlatList
              data={addressdata}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => setaddressselect(item)}
                    style={{
                      width: width * 0.95,
                      paddingHorizontal: '3%',
                      alignSelf: 'center',
                      marginTop: index == 0 ? '4%' : 0,
                      marginBottom: '4%',
                      borderBottomWidth: 1,
                      paddingBottom: '4%',
                      borderColor: 'lightgrey',
                      backgroundColor:
                        addressselect != undefined &&
                        addressselect._id == item._id
                          ? '#2580D3'
                          : '#fff',
                    }}>
                    <View>
                      <Text
                        style={{
                          color:
                            addressselect != undefined &&
                            addressselect._id == item._id
                              ? '#fff'
                              : '#000',
                          fontSize: 16,
                          marginVertical: '2%',
                        }}>
                        {item.home_office_other}
                      </Text>
                      <Text
                        style={{
                          color:
                            addressselect != undefined &&
                            addressselect._id == item._id
                              ? '#fff'
                              : '#000',
                          fontSize: 14,
                          marginVertical: '2%',
                          width: '60%',
                        }}>
                        {item.flat_building_name +
                          ', ' +
                          item.locality +
                          ', ' +
                          item.city +
                          ', ' +
                          item.state +
                          ', ' +
                          item.pincode}
                      </Text>
                      <Text
                        style={{
                          color:
                            addressselect != undefined &&
                            addressselect._id == item._id
                              ? '#fff'
                              : '#000',
                          fontSize: 16,
                          marginVertical: '2%',
                        }}>
                        {item.mobile_number}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              ListFooterComponent={() => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setaddressmodal(false);

                      navigation.navigate('AddAddress');
                    }}
                    style={{
                      alignSelf: 'flex-end',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                      marginRight: 20,
                    }}>
                    <AntDesign name="plus" size={20} color="#2580D3" />

                    <Text
                      style={{
                        color: '#2580D3',
                        fontSize: 15,
                        marginLeft: width * 0.02,
                      }}>
                      ADD NEW ADDRESS
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
            <ButtonConfirm
              Title={'Select Address'}
              Press={() => setaddressmodal(false)}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={patientsmodal}
        transparent={true}
        onRequestClose={() => setpatientsmodal(!patientsmodal)}>
        <View style={{position: 'absolute', bottom: 0}}>
          <View
            style={{
              // flex: 1,
              width: width,
              height:
                Platform.OS === 'ios'
                  ? height * 0.95
                  : height - StatusBar.currentHeight,
              // borderTopLeftRadius: width * 0.1,
              // borderTopRightRadius: width * 0.1,
              backgroundColor: '#ffffff',
              elevation: 10,
              // paddingHorizontal: '5%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: '5%',
                marginVertical: '2%',
              }}>
              <Text style={{color: '#000', fontSize: 20}}>Patient details</Text>
              <TouchableOpacity
                onPress={() => setpatientsmodal(!patientsmodal)}>
                <AntDesign name="close" size={25} color="#000000" />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: '#000000',
                paddingHorizontal: '5%',
                fontSize: 16,
                marginTop: '3%',
              }}>
              {addnewpatients == false ? 'Selet Patient' : 'Enter Details'}
            </Text>
            {addnewpatients == false ? (
              <>
                <FlatList
                  data={patientsdata}
                  renderItem={({item, index}) => {
                    const fullyear = new Date().getFullYear();
                    const age = fullyear - Number(item.age.split('-')[2]);
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          if (
                            patientsselect != undefined &&
                            patientsselect.id == item.id
                          ) {
                            setpatientsselect();
                          } else {
                            setpatientsselect(item);
                          }
                        }}
                        style={{
                          width: width * 0.95,
                          paddingHorizontal: '3%',
                          alignSelf: 'center',
                          marginTop: index == 0 ? '4%' : 0,
                          marginBottom: '4%',
                          borderBottomWidth: 1,
                          paddingBottom: '4%',
                          borderColor: 'lightgrey',
                          backgroundColor:
                            patientsselect != undefined &&
                            patientsselect.id == item.id
                              ? '#2580D3'
                              : '#fff',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: width * 0.7,

                            marginLeft: '4%',
                          }}>
                          <Text
                            style={{
                              color: '#000',
                              fontWeight: '500',
                              fontSize: 16,
                            }}>
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              color: '#000',
                              fontWeight: '300',
                              fontSize: 14,
                            }}>
                            {item.relation}
                          </Text>

                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: '500',
                                color: '#B0B2B5',
                              }}>
                              {age}{' '}
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: '500',
                                color: '#B0B2B5',
                              }}>
                              {item.gender}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  ListFooterComponent={() => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setpatientsmodal(false);

                          navigation.navigate('AddFamilyMember', {
                            add: true,
                          });
                        }}
                        style={{
                          alignSelf: 'flex-end',
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 10,
                          marginRight: 20,
                        }}>
                        <AntDesign name="plus" size={20} color="#2580D3" />

                        <Text
                          style={{
                            color: '#2580D3',
                            fontSize: 15,
                            marginLeft: width * 0.02,
                          }}>
                          ADD NEW PATIENT
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
                <ButtonConfirm
                  Title={'Select Patients'}
                  Press={() => setpatientsmodal(false)}
                />
              </>
            ) : (
              <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
                <TextInput
                  style={{
                    width: '100%',
                    paddingLeft: 10,
                    marginTop: wp('3%'),
                    height: hp('7%'),
                    outline: 'none',

                    backgroundColor: '#d3d3d3',
                    color: '#000',
                  }}
                  value={name}
                  onChangeText={name => setName(name)}
                  placeholder="Enter name*"
                />
                <View style={{}}>
                  <DatePicker
                    style={{
                      width: wp('90%'),
                      height: hp('7%'),
                      backgroundColor: '#d3d3d3',

                      marginTop: wp('3%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: wp('4%'),
                    }}
                    // style={{ marginTop: 10, marginLeft: 10, marginBottom: 10, borderRadius: 15, borderWidth: 1 ,padding:10}}
                    date={age} // Initial date from state
                    mode="date" // The enum of date,
                    placeholder="DOB"
                    iconComponent={
                      <FontAwesome5
                        name="calendar-alt"
                        color="#a9a9a9"
                        size={hp('3%')}
                      />
                    }
                    format="MM-DD-YYYY"
                    minDate="01-01-1900"
                    maxDate="01-19-2050"
                    // display='spinner'
                    customStyles={{
                      dateInput: {
                        borderWidth: 0,
                        alignItems: 'flex-start',
                        paddingLeft: wp('1%'),
                        fontSize: hp('1.5%'),
                      },
                      dateText: {fontSize: hp('1.8%'), color: 'black'},
                      placeholderText: {
                        color: 'black',
                        fontSize: hp('1.5%'),
                      },
                    }}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    // display='scroll'
                    onDateChange={age => {
                      setAge(age);
                    }}
                    androidMode={'spinner'}
                  />
                  {Platform.OS === 'ios' ? (
                    <>
                      <TouchableOpacity
                        onPress={() => setgenderModal(true)}
                        style={{
                          width: wp('90%'),
                          height: hp('7%'),
                          backgroundColor: '#d3d3d3',

                          marginTop: wp('3%'),

                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <Text style={{fontSize: 16, color: '#000'}}>
                          {gender == '' ? 'Select Gender' : gender}
                        </Text>
                        <FontAwesome5
                          name="caret-down"
                          color="#a9a9a9"
                          size={hp('3%')}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setrelationModal(true)}
                        style={{
                          width: wp('90%'),
                          height: hp('7%'),
                          backgroundColor: '#d3d3d3',

                          marginTop: wp('3%'),

                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <Text style={{fontSize: 16, color: '#000'}}>
                          {relation == '' ? 'Select relation' : relation}
                        </Text>
                        <FontAwesome5
                          name="caret-down"
                          color="#a9a9a9"
                          size={hp('3%')}
                        />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Picker
                        style={{
                          width: wp('90%'),
                          height: hp('7%'),
                          backgroundColor: '#d3d3d3',
                          borderRadius: hp('2%'),
                          marginTop: wp('3%'),
                          marginRight: wp('2.8%'),
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: wp('4%'),
                        }}
                        // style={{ marginTop: 10, marginLeft: 10, marginBottom: 10, borderRadius: 15, borderWidth: 1 }}
                        selectedValue={gender}
                        onValueChange={(itemValue, itemIndex) =>
                          setGender(itemValue)
                        }>
                        <Picker.Item
                          label="Gender"
                          value="Gender"
                          style={{fontSize: hp('1.8%')}}
                        />
                        {genderdata.length > 0 &&
                          genderdata.map(item => {
                            return (
                              <Picker.Item
                                label={item.name}
                                value={item.name}
                                style={{fontSize: hp('1.8%')}}
                              />
                            );
                          })}
                      </Picker>
                      <Picker
                        style={{
                          width: wp('90%'),
                          height: hp('7%'),
                          backgroundColor: '#d3d3d3',
                          borderRadius: hp('2%'),
                          marginTop: wp('3%'),
                          marginRight: wp('2.8%'),
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: wp('4%'),
                        }}
                        // style={{ marginTop: 10, marginLeft: 10, marginBottom: 10, borderRadius: 15, borderWidth: 1 }}
                        selectedValue={relation}
                        onValueChange={(itemValue, itemIndex) =>
                          setRelation(itemValue)
                        }>
                        <Picker.Item
                          label="Select Relation"
                          value=""
                          style={{fontSize: hp('1.8%')}}
                        />
                        {relationdata.length > 0 &&
                          relationdata.map(item => {
                            return (
                              <Picker.Item
                                label={item.name}
                                value={item.name}
                                style={{fontSize: hp('1.8%')}}
                              />
                            );
                          })}
                      </Picker>
                    </>
                  )}
                </View>
                <ButtonConfirm
                  Title={'Add Member'}
                  Press={() => addDetails()}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={locationmodal}
        transparent={true}
        onRequestClose={() => setlocationmodal(!locationmodal)}>
        <View style={{position: 'absolute', bottom: 0}}>
          <View
            style={{
              width: width,
              height:
                Platform.OS === 'ios'
                  ? height * 0.95
                  : height - StatusBar.currentHeight,
              // borderTopLeftRadius: width * 0.1,
              // borderTopRightRadius: width * 0.1,
              backgroundColor: '#ffffff',
              elevation: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: '5%',
                marginVertical: '2%',
              }}>
              <Text style={{color: '#000', fontSize: 20}}>
                Select Test Location
              </Text>
              <TouchableOpacity
                onPress={() => setlocationmodal(!locationmodal)}>
                <AntDesign name="close" size={25} color="#000000" />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: '#000000',
                paddingHorizontal: '5%',
                fontSize: 16,
                marginTop: '3%',
              }}>
              Select Test Location
            </Text>

            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                alignSelf: 'center',
                marginTop: 10,
              }}>
              {cartdata != undefined &&
                cartdata.testLocation.map(item => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        alignItems: 'center',
                        marginRight: width * 0.06,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setlocationCheck(item.testLocName);
                          settestlocationselected(item);
                        }}>
                        {testlocationselected != undefined &&
                        testlocationselected.id == item.id ? (
                          <FontAwesome
                            name="check-square"
                            size={24}
                            color="#2580D3"
                          />
                        ) : (
                          <FontAwesome
                            name="square"
                            size={24}
                            color="#979797"
                          />
                        )}
                      </TouchableOpacity>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 14,
                          fontFamily: 'Roboto-Regular',
                          marginLeft: 15,
                        }}>
                        {item.testLocName}
                      </Text>
                    </View>
                  );
                })}
              {/* 
              {cartdata != undefined &&
              cartdata.testLocation[0].testLocStatus == 'active' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    alignItems: 'center',
                    marginRight: width * 0.06,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (
                        cartdata.testLocation[1].testLocStatus != 'inactive'
                      ) {
                        if (
                          locationCheck == 'Lab' ||
                          locationCheck == undefined
                        ) {
                          setlocationCheck('Home');
                          settestlocationselected(cartdata.testLocation[0]);
                        } else {
                          setlocationCheck();
                          settestlocationselected();
                        }
                      }
                    }}>
                    {locationCheck == 'Home' ? (
                      <FontAwesome
                        name="check-square"
                        size={24}
                        color="#2580D3"
                      />
                    ) : (
                      <FontAwesome name="square" size={24} color="#979797" />
                    )}
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 14,
                      fontFamily: 'Roboto-Regular',
                      marginLeft: 15,
                    }}>
                    Home Collection
                  </Text>
                </View>
              ) : null}
              {cartdata != undefined &&
              cartdata.testLocation[1].testLocStatus == 'active' ? (
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      if (
                        cartdata.testLocation[0].testLocStatus != 'inactive'
                      ) {
                        if (
                          locationCheck == 'Home' ||
                          locationCheck == undefined
                        ) {
                          setlocationCheck('Lab');
                          settestlocationselected(cartdata.testLocation[1]);
                        } else {
                          setlocationCheck();
                          settestlocationselected();
                        }
                      }
                    }}>
                    {locationCheck == 'Lab' ? (
                      <FontAwesome
                        name="check-square"
                        size={24}
                        color="#2580D3"
                      />
                    ) : (
                      <FontAwesome name="square" size={24} color="#979797" />
                    )}
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 14,
                      fontFamily: 'Roboto-Regular',
                      marginLeft: 15,
                    }}>
                    Lab Visit
                  </Text>
                </View>
              ) : null} */}
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: '#DDDDDD',
                height: height * 0.65,
                width: '90%',
                alignSelf: 'center',
                marginTop: '5%',
              }}>
              {selecteddate != undefined ? (
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#DDDDDD',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: '2%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (selecteddate.split('-')[2] != today.getDate()) {
                        getPreviousDate();
                      }
                    }}>
                    <AntDesign name="left" size={24} color="#000000" />
                  </TouchableOpacity>

                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {selecteddate.split('-')[2] == today.getDate() ||
                    selecteddate.split('-')[2] == today.getDate() + 1 ? (
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 14,
                          fontFamily: 'Roboto-Regular',
                          marginLeft: 15,
                        }}>
                        {selecteddate.split('-')[2] == today.getDate()
                          ? 'Today'
                          : 'Tommorrow'}
                      </Text>
                    ) : null}
                    <Text
                      style={{
                        color: '#707070',
                        fontSize: 14,
                        fontFamily: 'Roboto-Regular',
                        marginLeft: 15,
                      }}>
                      {selecteddate.split('-')[2] +
                        ' ' +
                        monthNames[selecteddate.split('-')[1] - 1]}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => getNextDate()}>
                    <AntDesign name="right" size={24} color="#000000" />
                  </TouchableOpacity>
                </View>
              ) : null}
              <View style={{flex: 1}}>
                <FlatList
                  data={timeslotdata}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    // const fullyear = new Date().getFullYear();
                    // const age = fullyear - Number(item.age.split('/')[2]);

                    return (
                      <>
                        <View
                          style={{
                            width: width * 0.87,
                            paddingHorizontal: '3%',
                            alignSelf: 'center',
                            // backgroundColor:
                            //   patientsselect != undefined &&
                            //   patientsselect.id == item.id
                            //     ? '#2580D3'
                            //     : '#fff',
                            // marginTop: index == 0 ? '4%' : 0,
                            // marginBottom: '4%',
                            // paddingBottom: '4%',
                          }}>
                          {/* <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            {item.name === 'Morning' ? (
                              <Image
                                source={require('../../Assets/Images/morning.png')}
                                style={{width: 40, height: 40}}
                                resizeMode="contain"
                              />
                            ) : (
                              <Image
                                source={require('../../Assets/Images/afternoon.png')}
                                style={{width: 40, height: 40}}
                                resizeMode="contain"
                              />
                            )}
                            <Text
                              style={{
                                fontSize: 20,
                                fontWeight: '700',
                                color: '#000',
                                marginLeft: width * 0.04,
                              }}>
                              {'Slots ' + item.no_of_slot}
                            </Text>
                          </View> */}

                          {item.category_slot.map((itemtime, index) => {
                            // console.log(itemtime);
                            return (
                              <TouchableOpacity
                                onPress={() => {
                                  if (
                                    selectedtimeslot != undefined &&
                                    selectedtimeslot.timeslot ==
                                      itemtime.timeslot
                                  ) {
                                    setselectedtimeslot();
                                  } else {
                                    setselectedtimeslot(itemtime);
                                  }
                                }}
                                style={{
                                  width: '100%',
                                  // paddingHorizontal: '3%',
                                  // alignSelf: 'center',
                                  // marginTop: index == 0 ? '4%' : 0,
                                  paddingVertical: '7%',
                                  // paddingBottom: '4%',

                                  backgroundColor:
                                    selectedtimeslot != undefined &&
                                    selectedtimeslot.timeslot ==
                                      itemtime.timeslot
                                      ? '#2580D3'
                                      : '#fff',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                }}>
                                <Text
                                  style={{
                                    color:
                                      selectedtimeslot != undefined &&
                                      selectedtimeslot.timeslot ==
                                        itemtime.timeslot
                                        ? '#fff'
                                        : '#000',
                                    fontWeight: '500',
                                    fontSize: 16,
                                  }}>
                                  {itemtime.timeslot}
                                </Text>
                                {itemtime.extraPrice > 0 ? (
                                  <Text
                                    style={{
                                      color:
                                        selectedtimeslot != undefined &&
                                        selectedtimeslot.timeslot ==
                                          itemtime.timeslot
                                          ? '#fff'
                                          : '#2DCC34',
                                      fontWeight: '400',
                                      fontSize: 14,
                                    }}>
                                    +Rs.{itemtime.extraPrice} Extra
                                  </Text>
                                ) : null}
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </>
                    );
                  }}
                />
              </View>
            </View>

            <ButtonConfirm
              Title={'Select Time Slot'}
              Press={() => setlocationmodal(false)}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={bookingmodal}
        transparent={true}
        // onRequestClose={() => setbookingmodal(false)}
      >
        <TouchableOpacity
          // onPressOut={() => setbookingmodal(false)}
          style={{
            width: '100%',
            // flex: 1,
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}>
          <TouchableWithoutFeedback>
            <View style={{position: 'absolute'}}>
              <View
                style={{
                  width: width * 0.9,
                  height: height * 0.6,
                  backgroundColor: '#ffffff',
                  borderRadius: 10,
                  // justifyContent: 'space-between',
                  paddingVertical: '20%',
                }}>
                <View style={{alignItems: 'center'}}>
                  <AntDesign name="checkcircle" size={50} color="#37C837" />
                  <Text
                    style={{
                      color: '#000',
                      textAlign: 'center',
                      fontSize: 20,
                      fontWeight: '600',
                      marginTop: '10%',
                    }}>
                    Lab Booked!
                  </Text>
                </View>

                <View
                  style={{
                    width: width * 0.74,
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginVertical: 20,
                  }}>
                  <Text
                    style={{
                      color: '#2580D3',
                      textAlign: 'center',
                      fontSize: 16,
                    }}>
                    Hi{' '}
                    {patientsselect != undefined ? patientsselect.name : null}{' '}
                    your lab is booked!
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 14,
                      marginVertical: 20,
                      fontWeight: 'bold',
                      color: '#000',
                    }}>
                    Booking ID:
                    {bookingdetaildata != undefined &&
                      bookingdetaildata.booking_id}
                  </Text>
                  {/* <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 12,
                        marginBottom: 5,
                      }}>
                      You booked a bed in {drProfile?.doctor_name} Hospital on
                    </Text> */}

                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 12,
                      marginBottom: 5,
                    }}>
                    Booking Date:{' '}
                    {bookingdetaildata != undefined &&
                      bookingdetaildata.booking_date.split('/')[2] +
                        '-' +
                        bookingdetaildata.booking_date.split('/')[1] +
                        '-' +
                        bookingdetaildata.booking_date.split('/')[0]}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 12,
                      marginBottom: 5,
                    }}>
                    Booking Time:{' '}
                    {bookingdetaildata != undefined &&
                      bookingdetaildata.booking_time}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      setbookingmodal(false);
                      navigation.navigate('BookingHistory');
                    }}
                    style={{
                      height: 40,
                      width: width * 0.4,
                      backgroundColor: '#7083DE',
                      borderRadius: 10,
                      marginTop: '10%',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        padding: '6%',
                        color: '#FFFFFF',
                      }}>
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default LabtestBook;

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 7,
  },
});
