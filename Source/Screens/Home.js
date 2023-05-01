import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  PermissionsAndroid,
  Image,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
  Platform,
  Dimensions,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {baseurl} from '../Config/baseurl';
import {Searchbar} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {RadioButton} from 'react-native-paper';
import Promotion from '../ReusableComponent/Promotion';
import BedReact from '../ReusableComponent/BedReact';
import HospBed from '../Assets/Images/hospbed.png';
import Doctor2 from '../Assets/Images/doctor2.png';
import Medicine from '../Assets/Images/medicine.png';
import Ambulanceicon from '../Assets/Images/ambulanceicon.png';

import DoctorDepartment from '../ReusableComponent/DoctorDepartment';
import Flask from '../Assets/Images/flask.png';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import {useIsFocused} from '@react-navigation/native';
import {getImage} from '../Redux/actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {updateToken} from '../Redux/actions';

import {refreshTokenService} from '../Services/auth';
import {GOOGLE_API} from '../Config/constant';
import DoctorContainer from '../ReusableComponent/DoctorContainer';
const {width, height} = Dimensions.get('window');
import {logout} from '../Redux/actions';
import Icon, {Icons} from '../ReusableComponent/Icons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useFocusEffect} from '@react-navigation/native';

const Home = ({navigation}) => {
  Geocoder.init(GOOGLE_API, {language: 'en'}); // set the language
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [checked, setChecked] = React.useState('Insurance');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [getValue, setGetValue] = useState('');
  const [getLocation, setLocation] = useState('');
  const [visible, setVisible] = useState(false);
  const [isChecked, setIsChecked] = React.useState('Male');
  const [tokenId, setTokenId] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [uid, setUid] = useState('');
  const [currentlat, setcurrentlat] = useState('');
  const [currentlng, setcurrentlng] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hospitaldata, sethospitaldata] = useState();
  const [categorydata, setcategorydata] = useState([]);
  const [megadata, setmegadata] = useState([]);
  const [LocationVisible, setLocationVisible] = useState(false);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    updateProfilePictureService();
  }, [tokenId]);

  const updateProfilePictureService = () => {
    console.log(tokenId);
    getAsyncData();
    let URL = baseurl + 'user/profile';
    // console.log(URL);
    axios
      .get(URL, {
        headers: {Authorization: `Bearer ${tokenId}`},
      })
      .then(response => {
        console.log('nkk', response.data);
        dispatch(
          getImage({
            image: response.data.imageUrl,
            name: response.data.fullName,
          }),
        );
      })
      .catch(error => {
        // console.log('bjkkjbkllbljb', error);
      });
  };

  const getAsyncData = () => {
    AsyncStorage.getItem('refreshToken').then(value => {
      setRefreshToken(value);
    });
    AsyncStorage.getItem('tokenId').then(value => {
      setTokenId(value);
    });
    AsyncStorage.getItem('uid').then(value => {
      setUid(value);
    });
  };

  const updateRefreshToken = () => {
    getAsyncData();
    refreshTokenService({
      refreshToken,
      uid,
    }).then(res => {
      // console.log('Refresh Token =>>>>>> ' + res.data.refreshToken);
      // console.log('Token = >>>>>>>' + res.data.token);
      dispatch(
        updateToken({
          token: res.data.token,
          refreshToken: res.data.refreshToken,
        }),
      );
      AsyncStorage.setItem('tokenId', res.data.token);
      AsyncStorage.setItem('refreshToken', res.data.refreshToken);
    });
  };

  const getLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'eHospi',
            message: 'eHospi wants access to your location ',
          },
        );
        if (granted) {
          locationService();
        } else {
          // console.log('location permission denied');
          alert('Location permission denied');
        }
      } else {
        const locationPermissionStatus = await Geolocation.requestAuthorization(
          'whenInUse',
        );

        const locationGranted =
          locationPermissionStatus === 'granted' ||
          locationPermissionStatus === 'restricted';

        if (locationGranted) {
          locationService();
        }
      }
    } catch (err) {
      // console.warn(err);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // navigation.navigate('LoginScreen');
        // Return true to stop default back navigaton
        // Return false to keep default back navigaton
        //alert('Back Press handled and doing no action');
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        // Once the Screen gets blur Remove Event Listener
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );
  const locationService = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('position');

        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
            let addressComponent = json.results[0].address_components;
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            setcurrentlng(position.coords.longitude);
            setcurrentlat(position.coords.latitude);
            let displayAddress =
              addressComponent[1].long_name +
              ',' +
              addressComponent[2].long_name +
              ',' +
              addressComponent[3].long_name +
              ',' +
              addressComponent[4].long_name +
              ',' +
              addressComponent[5].short_name;
            setLocation(displayAddress);
            AsyncStorage.setItem('displayAddress', displayAddress);
            // console.log(addressComponent);
            nearByHospital(lat, lng);
          })
          .catch(error => {
            // console.warn(error)
          });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    // updateRefreshToken();
    getLocationPermission();
    updateProfilePictureService();
    doctorByCategory();
    // getValueFunction();
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(date + '/' + month + '/' + year);
    setCurrentTime(hours + ':' + min + ':' + sec);
  }, []);

  const getValueFunction = () => {
    AsyncStorage.getItem('any_key_here').then(value => setGetValue(value));
  };
  const nearByHospital = async (lat, lng) => {
    const token = await AsyncStorage.getItem('tokenId');

    var myHeaders = new Headers();
    myHeaders.append('authorization', `Basic ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      lat: lat,
      long: lng,
      // lat: '28.644800',
      // long: '77.216721',
    });
    console.log(raw);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${baseurl}/user/nearByHospital`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        sethospitaldata(result);
        setIsLoading(false);
      })
      .catch(error => {
        // console.log('bvjkbvjkbvjkblkblb', error);
      });
  };
  const doctorByCategory = async (lat, lng) => {
    const token = await AsyncStorage.getItem('tokenId');

    var myHeaders = new Headers();
    myHeaders.append('authorization', `Basic ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${baseurl}/user/doctorByCategory`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        if (result.message === 'Invalid Token') {
          // AsyncStorage.clear();
          // dispatch(logout());
          // navigation.navigate('Login');
          Alert.alert('Session Expired', '', [
            {
              text: 'Cancel',
              onPress: () => doctorByCategory(),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                AsyncStorage.clear();
                dispatch(logout());
                navigation.navigate('Login');
              },
            },
          ]);
        }
        setcategorydata(result);
      })
      .catch(error => {
        // console.log('bvjkbvjkbvjkblkblb', error);
      });
  };
  const megaSearch = async text => {
    const token = await AsyncStorage.getItem('tokenId');

    var myHeaders = new Headers();
    myHeaders.append('authorization', `Basic ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      srcValue: text,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${baseurl}/user/megaSearch`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setmegadata(result.data);
      })
      .catch(error => {
        // console.log('error', error)
      });
  };

  const ItemView = ({item}) => {
    return (
      <View>
        <View
          style={{
            width: wp('95%'),
            height: hp('15%'),
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
            <View>
              <Text
                style={{
                  fontSize: hp('2.5%'),
                  color: Colors.black,
                  fontWeight: 'bold',
                }}>
                {item.hospitalName}
              </Text>
              <Text style={{fontSize: hp('1.6%'), color: Colors.black}}>
                {item.hospitalAddress}
              </Text>
            </View>
            <TouchableOpacity
            //  disabled={item.enableDisable != '1'}
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
                navigation.navigate('HospitalDetailScreen', {
                  hospitalName: item.hospitalName,
                  hospitalCode: item.hospitalCode,
                  hospitalAddress: item.hospitalAddress,
                  // enableDisable:item.enableDisable,
                  hospital_id: item._id,
                  selfPay: true,
                  cordinates: {
                    currentlat: currentlat,
                    currentlng: currentlng,
                    hos_lat: item.lat,
                    hos_lng: item.long,
                  },
                });
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
                  {item.numberOfBeds}
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

  return isLoading ? (
    <ActivityIndicator
      color="#2580D3"
      size="large"
      style={{flex: 1, alignSelf: 'center', marginTop: 25}}
    />
  ) : (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.contnr}>
        <LinearGradient
          start={{x: 1, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#B2F3FF', '#0489D6']}
          style={{
            borderBottomLeftRadius: hp('3%'),
            borderBottomRightRadius: hp('3%'),
          }}>
          <View
            style={{
              width: wp('100%'),
              height: hp('15%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                width: wp('70%'),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons
                name="md-location-sharp"
                size={hp('2.8%')}
                style={{color: '#ffff'}}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: hp('1.7%'),
                  color: '#ffff',
                  width: '100%',
                }}>
                {getLocation}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setLocationVisible(true);
              }}>
              <Icon type={Icons.Feather} name={'edit'} color={'#fff'} />
            </TouchableOpacity>

            {/* <View style={{ flexDirection: 'row', alignItems: 'center', padding: wp('2%'), }}>
                        <FontAwesome5Icon name='bars' color={Colors.white} size={hp('4%')} />
                        <View style={{ marginLeft: hp('2%') }}>
                            <TouchableOpacity><Text style={{ fontWeight: 'bold', fontSize: hp('1.8%'), color: Colors.white }}>Your Location</Text></TouchableOpacity>
                            <Text style={{ fontWeight: 'bold', fontSize: hp('1.8%'), color: Colors.white }}>Sector 62 </Text>
                        </View>
                    </View> */}
            {/* <Image source={require('../Assets/Images/doctor.jpg')}
                        style={{ width: wp('18%'), height: wp('18%'), borderRadius: hp('5%') }} /> */}
          </View>
        </LinearGradient>
        <Searchbar
          style={{
            width: wp('85%'),
            alignSelf: 'center',
            marginTop: -hp('3.5%'),
            borderRadius: hp('5%'),
          }}
          placeholder="Search any Hospital, Doctor"
          onChangeText={text => {
            if (text == '') {
              setSearchQuery(text);
              setmegadata('');
            } else {
              setSearchQuery(text);
              megaSearch(text);
            }
          }}
          // value={searchQuery}
        />

        {searchQuery !== '' ? (
          <View style={{flex: 1}}>
            <FlatList
              data={megadata}
              renderItem={({item}) => {
                // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJwaDcwMTc0NTY3NDQiLCJpYXQiOjE2NzgxMTQ4OTgsImV4cCI6MTY3ODI4NzY5OH0.AqvfbpGc3HS1gdkqwdU2yDsQWzpeOBL1cG8iclhcf9A

                return (
                  <View style={{width: width * 0.95, alignSelf: 'center'}}>
                    {item.type == 'doctor' &&
                      item.doctor != undefined &&
                      item.doctor.length > 0 &&
                      item.doctor.map((itemDr, index) => {
                        return (
                          <View
                            style={{
                              // width: width * 0.95,

                              marginTop: index == 0 ? 5 : 0,
                              borderRadius: 7,
                              backgroundColor: '#fff',
                            }}>
                            <DoctorContainer
                              DrId={itemDr._id}
                              image={itemDr.image}
                              degree={itemDr.degree}
                              department_name={itemDr.department_name}
                              drName={itemDr.doctor_name}
                              specalist={itemDr.speciality}
                              experiance={itemDr.year_of_experience}
                              hospital_name={
                                itemDr.hospitalDetail[0].hospital_name
                              }
                              fee={itemDr.fee}
                              total_review={itemDr.total_review}
                              total_star={itemDr.total_star}
                              Button={true}
                              enableDisable={item.enableDisable}
                            />
                          </View>
                        );
                      })}
                    {item.type == 'hospital' &&
                      item.hospital != undefined &&
                      item.hospital.length > 0 &&
                      item.hospital.map(itemDr => {
                        console.log(itemDr);
                        return (
                          <View
                            style={{
                              // width: width * 0.95,
                              // height: height * 0.8,
                              // alignSelf: 'center',
                              // paddingLeft: wp('1%'),
                              // paddingRight: wp('1%'),
                              // paddingTop: hp('5%'),
                              // paddingBottom: hp('5%'),
                              backgroundColor: '#f7f7f7',
                              borderRadius: 7,
                            }}>
                            <ItemView item={itemDr} />
                          </View>
                        );
                      })}
                  </View>
                );
              }}
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              // width: wp('100%'),
              // height: hp('63%'),
              marginTop: hp('1.5%'),
              paddingTop: wp('2%'),
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <Promotion />
                <Promotion />
                <Promotion />
                <Promotion />
                <TouchableOpacity
                  style={{
                    width: wp('85%'),
                    height: hp('15%'),

                    alignSelf: 'center',
                    borderRadius: hp('2%'),
                    overflow: 'hidden',
                    marginHorizontal: wp('2%'),
                  }}
                  onPress={() =>
                    navigation.navigate('AmbulanceMapScreen', {
                      currentlat: currentlat,
                      currentlng: currentlng,
                    })
                  }>
                  <Image
                    source={require('../Assets/Images/Ambulance.jpg')}
                    style={{
                      width: '100%',
                      height: '100%',

                      alignSelf: 'center',
                      resizeMode: 'stretch',
                    }}
                  />
                </TouchableOpacity>
              </ScrollView>
              <View
                style={{
                  width: wp('95%'),
                  height: wp('34%'),
                  marginTop: hp('1%'),
                  alignSelf: 'center',
                }}>
                <Text style={{fontWeight: 'bold'}}>Browse by Category</Text>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <FlatList
                    data={categorydata}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => {
                      return (
                        <DoctorDepartment
                          t1={item.department}
                          source={{uri: item.departmentImage}}
                          BGColor={item.backgroundColor}
                        />
                      );
                    }}
                  />
                </View>
              </View>

              <View
                style={{
                  width: wp('95%'),
                  height: wp('34%'),
                  marginTop: hp('1%'),
                  alignSelf: 'center',
                  padding: wp('1%'),
                }}>
                <Text style={{fontWeight: 'bold', marginLeft: wp('2%')}}>
                  Our Offering
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <BedReact
                    title="Bed Booking"
                    image={HospBed}
                    onPress={() =>
                      navigation.navigate('GeneralBeds', {
                        currentlat: currentlat,
                        currentlng: currentlng,
                      })
                    }
                  />
                  <BedReact
                    title="Consultation"
                    image={Doctor2}
                    onPress={() =>
                      navigation.navigate('Consultation', {
                        type: 'All',
                      })
                    }
                  />
                  {/* <BedReact
                    title="Lab Tests"
                    image={Flask}
                    onPress={() =>
                      navigation.navigate('LabTest', {
                        currentlat: currentlat,
                        currentlng: currentlng,
                      })
                    }
                  />
                  <BedReact
                    title="Ambulance"
                    image={Ambulanceicon}
                    onPress={() => {
                      if (currentlat != '' && currentlng != '') {
                        navigation.navigate('AmbulanceMapScreen', {
                          currentlat: currentlat,
                          currentlng: currentlng,
                        });
                      }
                    }}
                  /> */}
                  {/* <BedReact
                  title="Medicines"
                  image={Medicine}
                  onPress={() => navigation.navigate('Medicines')}
                /> */}
                </View>
              </View>
              {/* <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AmbulanceMapScreen', {
                    currentlat: currentlat,
                    currentlng: currentlng,
                  })
                }>
                <Image
                  source={require('../Assets/Images/Ambulance.jpg')}
                  style={{
                    width: wp('90%'),
                    height: wp('23%'),
                    borderRadius: hp('1.5%'),
                    marginTop: hp('2%'),
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity> */}
              <View
                style={{
                  width: wp('100%'),
                  marginTop: hp('1%'),
                  alignSelf: 'center',
                  padding: wp('1%'),
                  marginBottom: hp('1%'),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: wp('4%'),
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: hp('2.5%'),
                      // marginTop: hp('1%'),
                    }}>
                    Near By Hospitals
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('GeneralBeds', {
                        currentlat: currentlat,
                        currentlng: currentlng,
                      })
                    }>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: Colors.greenSyan,
                        alignSelf: 'flex-end',
                      }}>
                      view all
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flex: 1,
                  }}>
                  <FlatList
                    data={hospitaldata}
                    horizontal
                    renderItem={({item}) => {
                      // console.log(item);
                      // var ggg = {
                      //   _id: '63dd597c37b25aacb73aa578',
                      //   about_us: 'test about us',
                      //   city: 'noida',
                      //   hospitalAddress: 'noida',
                      //   hospitalCode: 'IGFCL4',
                      //   hospitalName: 'test-03-feb',
                      //   hospitalType: 'Private',
                      //   img: 'https://api.ehospi.in/uploads/hospital/signupHospitalImg1675825388919.png',
                      //   lat: '28.644800',
                      //   long: '77.216721',
                      //   phone: '8076863026',
                      //   state: 'up',
                      // };
                      return (
                        <View
                          style={{
                            width: wp('25%'),
                            // height: hp('17%'),
                            alignItems: 'center',
                            // justifyContent: 'center',
                          }}>
                          <TouchableOpacity
                            // disabled={item.enableDisable != '1'}
                            onPress={() => {
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
                            }}>
                            <Image
                              source={{uri: item.img}}
                              style={{
                                width: wp('20%'),
                                height: wp('20%'),
                                borderRadius: hp('1.5%'),
                                marginTop: hp('2%'),
                              }}
                            />
                          </TouchableOpacity>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontWeight: 'bold',
                              fontSize: hp('1.5%'),
                              marginTop: hp('1%'),
                            }}>
                            {item.hospitalName}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        )}

        <Modal
          animationType="slide"
          visible={LocationVisible}
          transparent={true}
          onRequestClose={() => setLocationVisible(false)}>
          <TouchableOpacity
            onPressOut={() => setLocationVisible(false)}
            style={{
              width: '100%',
              // flex: 1,
              height: height,

              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}>
            <TouchableWithoutFeedback>
              <View style={{position: 'absolute', bottom: 0}}>
                <View
                  style={{
                    flex: 1,
                    width: width,
                    height: height * 0.6,

                    backgroundColor: '#ffffff',
                    paddingTop: Platform.OS === 'ios' ? '15%' : '5%',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#000',
                        paddingLeft: 20,
                      }}>
                      Change Location
                    </Text>
                    <ScrollView>
                      <GooglePlacesAutocomplete
                        // currentLocation={true}
                        // suppressDefaultStyles={true}
                        enablePoweredByContainer={false}
                        listViewDisplayed={false}
                        keepResultsAfterBlur={true}
                        currentLocationLabel="current location"
                        fetchDetails={true}
                        isRowScrollable={true}
                        textInputProps={{
                          placeholderTextColor: 'lightgrey',
                        }}
                        styles={{
                          textInputContainer: {
                            marginTop: 5,
                            width: width * 0.9,
                            alignSelf: 'center',
                            // borderWidth: 1,
                            borderRadius: 10,
                            // borderColor: '#ddd',
                            // borderBottomWidth: 0,
                            shadowColor: '#171717',
                            shadowOffset: {width: 0, height: 0},
                            shadowOpacity: 0.2,
                            shadowRadius: 7,
                            elevation: 7,
                          },

                          description: {color: '#000'},
                          textInput: {
                            fontSize: 16,
                            color: '#787878',
                            borderRadius: 10,
                            // backgroundColor: '#000',
                          },
                        }}
                        onPress={(data, details = null) => {
                          setLocationVisible(false);

                          setcurrentlng(details.geometry.location.lat);
                          setcurrentlat(details.geometry.location.lng);

                          setLocation(data.description);
                          AsyncStorage.setItem(
                            'displayAddress',
                            data.description,
                          );
                          // console.log(addressComponent);
                          nearByHospital(
                            details.geometry.location.lat,
                            details.geometry.location.lng,
                          );
                          // setLocation(data.description);
                          // setVisible(false);
                          // setcurrentlat(details.geometry.location.lat);
                          // setcurrentlng(details.geometry.location.lng);
                          // setcoordinates([
                          //   {
                          //     latitude: details.geometry.location.lat,
                          //     longitude: details.geometry.location.lng,
                          //   },
                          // ]);
                          // setRegion({
                          //   latitude: details.geometry.location.lat,
                          //   longitude: details.geometry.location.lng,
                          //   latitudeDelta: 0.0922,
                          //   longitudeDelta: 0.0421,
                          // });
                          // console.log(
                          //   'here i got pressed',
                          //   details.geometry.location.lat,
                          //   details.geometry.location.lng,
                          // );
                        }}
                        placeholder="Search for area"
                        query={{
                          key: GOOGLE_API,
                          language: 'en',
                          radius: 15000,
                        }}
                      />
                    </ScrollView>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      borderTopWidth: 1,
                      borderColor: '#DFDBDB',
                      width: width,
                      paddingTop: '5%',
                      paddingBottom: '5%',
                      // position: 'absolute',
                      // bottom: '1%',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        locationService();
                        setLocationVisible(false);
                      }}
                      style={{width: '45%', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '400',
                          color: '#737373',
                        }}>
                        Current location
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        borderLeftWidth: 1,
                        borderColor: '#DFDBDB',
                        height: height * 0.05,
                      }}
                    />
                    <TouchableOpacity
                      style={{width: '45%', alignItems: 'center'}}
                      onPress={() => setLocationVisible(false)}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '400',
                          color: '#737373',
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  contnr: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
  },
  view: {
    margin: 10,
  },
});
