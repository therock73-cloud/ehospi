import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  Image,
  StyleSheet,
  BackHandler,
  Platform,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../Assets/Constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import getDirections from 'react-native-google-maps-directions';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BookingHistoryTwo = props => {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [fathersName, setFathersName] = useState('');
  const [gender, setGender] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [ward, setWard] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [location, setLocation] = useState('');
  const [hospName, setHospName] = useState('');
  const [totalcharges, setTotalCharghes] = useState('');
  const [BookingIdGet, setBookingId] = useState('');
  const [getBookingAddress, setBookingAddress] = useState('');
  const [getUserAge, setUserAge] = useState('');
  const [getHospitalAddress, setHospitalAddress] = useState('');
  const [time, setTime] = useState('');
  const [isSelfPay, setIsSelfPay] = useState(false);
  const [data, setdata] = useState();
  const [loding, setloding] = useState(true);
  const [patientsdata, setpatientsdata] = useState();

  useEffect(() => {
    setdata(props.route.params.alldata);
    GetfamilyHandler();

    // getBookingHistoryData();
  }, []);

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
  const GetfamilyHandler = async () => {
    const userid = await AsyncStorage.getItem('user_id');
    const tokenid = await AsyncStorage.getItem('tokenId');
    console.log(tokenid);

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
        const PatientDeatil = result.response.find(item => {
          return item.name === props.route.params.alldata.name;
        });
        setpatientsdata(PatientDeatil);
        setloding(false);
      })
      .catch(error => console.log('error', error));
  };
  console.log(data);
  var ggg = {
    __v: 0,
    _id: '641c95c0f2ce580f35e61005',
    age: '03-14-2015',
    ambulanceother: [],
    bookbedDetail: [],
    booking_date: '2023/3/24',
    booking_id: 'k2x3oase3rd',
    booking_time: '01:54',
    chemistOther: [],
    doctorDetails: [],
    gender: 'Male',
    hospitalDetails: [
      {
        __v: 0,
        _id: '640b5e6cbbd9beb7a2d9410f',
        about_us:
          'To better serve the wide-ranging needs of the community, the modern hospital has often developed outpatient facilities, as well as emergency, psychiatric, and rehabilitation services. In addition, “bedless hospitals” provide strictly ambulatory (outpatient) care and day surgery. Patients arrive at the facility for short appointments. They may also stay for treatment in surgical or medical units for part of a day or for a full day, after which they are discharged for follow-up by a primary care health provider',
        city: 'Ghaziabad',
        hospitalAddress: 'Modinagar ',
        hospitalCode: 'MWQQ03',
        hospitalName: 'JP hospital Demo',
        hospitalType: 'private',
        img: '',
        lat: '28.679872',
        latLong: [Array],
        long: '77.413336',
        phone: '+919458575556',
        review: '0',
        state: 'Uttarpradesh',
        totalreview: '5',
      },
    ],
    hospital_id: '640b5e6cbbd9beb7a2d9410f',
    labtest: [
      {
        address_details: [Object],
        discountPercentage: '250',
        hospital_id: '640b5e6cbbd9beb7a2d9410f',
        package_id: '640c087fbbd9beb7a2d9474e',
        status: '1',
        subtotalAmount: '1650',
        testLocation: [Array],
        totalAmount: 1400,
      },
    ],
    name: 'Demo Demo',
    relation: 'self',
    status: '1',
    type: 'labtest',
    user_id: '6410bbad6d33b5a5a5998b29',
  };
  return loding ? null : (
    <View style={{width: wp('100%'), height: hp('100%')}}>
      <View
        style={[
          styles.head,
          {paddingTop: Platform.OS === 'android' ? '5%' : '15%'},
        ]}>
        <View style={{width: wp('30%'), height: hp('4%')}}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack('BookingHistory')}
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
          style={{
            width: wp('40%'),
            height: hp('4%'),
            alignItems: 'center',
          }}>
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
        <View
          style={{
            width: wp('30%'),
            height: hp('4%'),

            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            // onPress={HandleGetDirections}
            style={{
              width: wp('8%'),
              height: hp('4%'),
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              paddingRight: wp('1.8%'),
            }}>
            <Entypo name="direction" size={hp('3%')} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {data.hospitalDetails.length > 0 && (
        <View
          style={{
            width: wp('100%'),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: wp('2%'),
            marginTop: 10,
          }}>
          {data.type == 'bookbed' ? (
            <Image
              // source={{uri: data.hospitalDetails[0].img}}
              source={require('../Assets/Images/hospbed.png')}
              style={{
                width: hp('10%'),
                height: hp('10%'),
                // borderRadius: hp('2.5%'),
                resizeMode: 'contain',
              }}
            />
          ) : data.type == 'labtest' ? (
            <Image
              // source={{uri: data.hospitalDetails[0].img}}
              source={require('../Assets/Images/flask.png')}
              style={{
                width: hp('10%'),
                height: hp('10%'),
                // borderRadius: hp('2.5%'),
                resizeMode: 'contain',
              }}
            />
          ) : data.type == 'ambulance' ? (
            <Image
              source={require('../Assets/Images/ambulanceicon.png')}
              style={{
                width: hp('10%'),
                height: hp('10%'),
                // borderRadius: hp('2.5%'),
                resizeMode: 'contain',
              }}
            />
          ) : (
            <Image
              // source={{uri: data.doctorDetails[0].image}}
              source={require('../Assets/Images/doctor2.png')}
              style={{
                width: hp('10%'),
                height: hp('10%'),
                // borderRadius: hp('2.5%'),
                resizeMode: 'contain',
              }}
            />
          )}
          <View>
            <Text
              style={{
                fontSize: hp('2%'),
                fontWeight: 'bold',
                color: Colors.darkGray,
              }}>
              {data.type == 'labtest'
                ? 'Labtest Booking'
                : data.type == 'bookbed'
                ? 'Bed Booking'
                : data.type == 'ambulance'
                ? 'Ambulance Booking'
                : 'Doctor Consultation'}
            </Text>
            {/* {data.type == 'bookbed' && (
              <Text
                style={{
                  fontSize: hp('2%'),
                  fontWeight: 'bold',
                  color: Colors.darkGray,
                }}>
                {data.bookbedDetail.length > 0 &&
                data.bookbedDetail[0].medicalInsurance != undefined
                  ? 'Insurance'
                  : 'Self Pay'}
              </Text>
            )} */}
          </View>
        </View>
      )}
      <View
        style={{
          width: wp('100%'),

          paddingHorizontal: wp('2%'),
          justifyContent: 'center',
        }}>
        <Text
          style={{fontSize: hp('2%'), fontWeight: 'bold', color: Colors.black}}>
          {data.type == undefined
            ? data.doctorDetails.lengtgh > 0 &&
              data.doctorDetails[0].doctor_name
            : null}
        </Text>
        {/* <Text
          style={{fontSize: hp('2%'), fontWeight: 'bold', color: Colors.black}}>
          Pay at Hospital
        </Text> */}
      </View>
      {data.type == 'bookbed' && (
        <View
          style={{
            width: wp('100%'),
            // height: hp('5%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: wp('2%'),
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: hp('2.2%'),
              color: Colors.black,
            }}>
            Bed Type
          </Text>
          <Text
            style={{
              fontSize: hp('1.8%'),
              color: Colors.black,
            }}>
            {data.bookbedDetail.length > 0 &&
            data.bookbedDetail[0].medicalInsurance != undefined
              ? 'Insurance'
              : 'Self Pay'}
          </Text>
        </View>
      )}
      <View style={{width: wp('100%')}}>
        <View
          style={{
            width: wp('100%'),

            justifyContent: 'center',
            paddingHorizontal: wp('2%'),
          }}>
          <Text
            style={{
              fontSize: hp('2%'),
              fontWeight: 'bold',
              color: '#2581d4',
              marginVertical: 10,
            }}>
            Details
          </Text>
        </View>
        <View
          style={{
            width: wp('100%'),
            // height: hp('10%'),
            justifyContent: 'center',
            padding: wp('2%'),
          }}>
          {/* <Text
            style={{
              fontWeight: 'bold',
              fontSize: hp('2.2%'),
              color: Colors.black,
            }}>
            {ward}
          </Text> */}
          <Text
            style={{
              fontWeight: '500',
              fontSize: hp('1.5%'),
              color: Colors.black,
            }}>
            {data.hospitalDetails.length == 0
              ? null
              : data.hospitalDetails[0].hospitalName}{' '}
          </Text>
          <Text
            style={{fontSize: hp('1.5%'), color: Colors.black, marginTop: 10}}>
            {data.hospitalDetails.length == 0
              ? null
              : data.hospitalDetails[0].hospitalAddress}
            {', '}
            {data.hospitalDetails.length == 0
              ? null
              : data.hospitalDetails[0].city}
            {/* {hospName}
            {getHospitalAddress} */}
          </Text>
        </View>
      </View>
      <View style={{width: wp('100%'), height: hp('45%')}}>
        <View
          style={{
            width: wp('100%'),
            // height: hp('5%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: wp('2%'),
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: hp('2.2%'),
              color: Colors.black,
            }}>
            Booking ID
          </Text>
          <Text
            style={{
              fontSize: hp('1.8%'),
              color: Colors.black,
            }}>
            {data.booking_id}
          </Text>
        </View>
        <View
          style={{
            width: wp('100%'),

            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: wp('2%'),
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: hp('2.2%'),
              color: Colors.black,
            }}>
            Booking Date & Time
          </Text>
          <Text style={{fontSize: hp('1.5%'), fontWeight: 'bold'}}>
            {data.type == 'bookdoctor' || data.type == 'ambulance'
              ? data.booking_date != '' &&
                data.booking_date != undefined &&
                data.booking_date.split('-')[2] +
                  '-' +
                  data.booking_date.split('-')[1] +
                  '-' +
                  data.booking_date.split('-')[0]
              : data.booking_date != '' &&
                data.booking_date != undefined &&
                data.booking_date.split('/')[2] +
                  '-' +
                  data.booking_date.split('/')[1] +
                  '-' +
                  data.booking_date.split('/')[0]}
            , {' ' + data.booking_time}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: hp('1%'),
          }}>
          <Text
            tyle={{
              fontWeight: 'bold',
              fontSize: hp('2.2%'),
              color: '#000',
            }}>
            Booking Status
          </Text>
          <Text
            style={{
              fontSize: hp('1.8%'),
              fontWeight: 'bold',
              color: Colors.black,
            }}>
            {data.status == '1'
              ? 'Pending'
              : data.status == '2'
              ? 'Accepted'
              : data.status == '3'
              ? 'Cancel'
              : data.status == '4'
              ? 'Rejected'
              : data.status == '5'
              ? 'Completed'
              : null}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: hp('1%'),
          }}>
          <Text
            tyle={{
              fontWeight: 'bold',
              fontSize: hp('2.2%'),
              color: Colors.black,
            }}>
            Total Amount
          </Text>
          <Text
            style={{
              fontSize: hp('1.8%'),
              fontWeight: 'bold',
              color: Colors.black,
            }}>
            {data.type == 'bookbed'
              ? `₹${
                  data.bookbedDetail.length > 0 &&
                  data.bookbedDetail[0].bedPrice
                }`
              : data.type == 'labtest'
              ? `₹${data.labtest.length > 0 && data.labtest[0].totalAmount}`
              : data.type == 'ambulance'
              ? `₹${
                  data.ambulanceother.length > 0 &&
                  data.ambulanceother[0].additionalAmount
                }`
              : `₹${
                  data.doctorDetails.length > 0 && data.doctorDetails[0].fee
                }`}
          </Text>
        </View>
        <View
          style={{
            width: wp('100%'),

            // marginTop: hp('2%'),
            justifyContent: 'center',
            paddingHorizontal: wp('2%'),
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: hp('2%'),
              color: '#2581d4',
              marginVertical: 10,
            }}>
            Patient Details
          </Text>
        </View>
        <View style={{width: wp('100%'), height: hp('30%')}}>
          <View
            style={{
              width: wp('100&'),
              height: hp('3%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: wp('2%'),
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: Colors.black,
                fontSize: hp('1.5%'),
              }}>
              Name
            </Text>
            <Text style={{color: Colors.black, fontSize: hp('1.5%')}}>
              {data.name}
            </Text>
          </View>
          <View
            style={{
              width: wp('100&'),
              height: hp('3%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: wp('2%'),
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: Colors.black,
                fontSize: hp('1.5%'),
              }}>
              Age
            </Text>
            <Text style={{color: Colors.black, fontSize: hp('1.5%')}}>
              {data.age != undefined && data.age.length > 4
                ? returnAge(data.age)
                : data.age}
            </Text>
          </View>
          <View
            style={{
              width: wp('100&'),
              height: hp('3%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: wp('2%'),
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: Colors.black,
                fontSize: hp('1.5%'),
              }}>
              Gender
            </Text>
            <Text style={{color: Colors.black, fontSize: hp('1.5%')}}>
              {data.gender}
            </Text>
          </View>
          {/* <View
            style={{
              width: wp('100&'),
              height: hp('3%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: wp('2%'),
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: Colors.black,
                fontSize: hp('1.5%'),
              }}>
              Father's Name
            </Text>
            <Text style={{color: Colors.black, fontSize: hp('1.5%')}}>
              {fathersName}
            </Text>
          </View> */}
          {/* <View
            style={{
              width: wp('100&'),
              height: hp('3%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: wp('2%'),
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: Colors.black,
                fontSize: hp('1.5%'),
              }}>
              Mobile Number
            </Text>
            <Text style={{color: Colors.black, fontSize: hp('1.5%')}}>
              {data.type == 'bookbed'
                ? data.bookbedDetail[0].phone
                : data.type == 'labtest'
                ? data.labtest[0].address_details.mobile_number
                : null}
            </Text>
          </View>
          <View
            style={{
              width: wp('100&'),
              height: hp('3%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: wp('2%'),
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: Colors.black,
                fontSize: hp('1.5%'),
              }}>
              Address
            </Text>
            <Text style={{color: Colors.black, fontSize: hp('1.5%')}}>
              {data.type == 'bookbed'
                ? data.bookbedDetail[0].address
                : data.type == 'labtest'
                ? data.labtest[0].address_details.flat_building_name +
                  ', ' +
                  data.labtest[0].address_details.locality +
                  ', ' +
                  data.labtest[0].address_details.city
                : null}
            </Text>
          </View> */}
          {/* <View
            style={{
              width: wp('100&'),
              height: hp('3%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: wp('2%'),
              alignItems: 'center',
            }}>
            {policyNumber !== 'Self Pay' && (
              <>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: Colors.black,
                    fontSize: hp('1.5%'),
                  }}>
                  Policy Number
                </Text>
                <Text style={{color: Colors.black, fontSize: hp('1.5%')}}>
                  {policyNumber}
                </Text>
              </>
            )}
          </View> */}
        </View>
      </View>
    </View>
  );
};
export default BookingHistoryTwo;
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
  },

  bookingHistory: {
    flexDirection: 'row',
    width: wp('85%'),
    height: hp('7%'),

    alignItems: 'center',
    padding: wp('2%'),
    backgroundColor: '#6495ed',
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
  head: {
    width: wp('100%'),
    height: hp('10%'),
    backgroundColor: Colors.lightBlue,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
