import React, {useState, useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  BackHandler,
  Image,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Platform,
  Linking,
  SafeAreaView
} from 'react-native';
import Colors from '../Assets/Constants/Colors';
import {Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {refreshTokenService} from '../Services/auth';
import {updateToken} from '../Redux/actions';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getDirections from 'react-native-google-maps-directions';
import MapView, {Callout, Circle, Marker} from 'react-native-maps';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {baseurl} from '../Config/baseurl';
import {getHospitalImagesService} from '../Services/Image';
import {List} from 'react-native-paper';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_API} from '../Config/constant';

const HospitalDetailScreen = ({route, navigation}) => {
  const [index, setIndex] = React.useState(0);
  const _isMounted = useRef(true);
  const [getLocation, setGetLocation] = useState('');
  const [theArray, setTheArray] = useState([]);
  const [getServices, setServices] = useState([]);
  const [getTokenId, setTokenId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [hospitalImages, setHospitalImages] = useState([]);
  const [refreshToken, setRefreshToken] = useState('');
  const [uid, setUid] = useState('');

  const [selectedButton, setselectedButton] = useState('About');
  const [getDepartmentValue, setDepartmentValue] = useState([]);
  const [getBookBedValue, setBookBedValue] = useState([]);

  const [getValue, setGetValue] = useState('');
  const [getHospitalcode, setHospitalCode] = useState();
  const [getHospitalid, setHospitalid] = useState();
  const [getHospitalAddress, setHospitalAddress] = useState('');
  const [selfPay, setselfPay] = useState('');
  const [currentlat, setcurrentlat] = useState();
  const [currentlng, setcurrentlng] = useState();
  const[enabledisable,setenabledisable] = useState();
  const [usercurrentlat, setusercurrentlat] = useState();
  const [usercurrentlng, setusercurrentlng] = useState();
  const [loding, setloding] = useState(true);
  const [hospitaldata, sethospitaldata] = useState('');

  // const hospitalDetails = route.params;
  const HLat = 28.621309;
  const HLong = 77.365471;
  //    console.log(HLat,HLong)
  const HandleGetDirections = () => {
    const data = {
      source: {
        latitude: usercurrentlat,
        longitude: usercurrentlng,
      },
      destination: {
        latitude: currentlat,
        longitude: usercurrentlat,
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving', // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: 'dir_action',
          value: 'navigate', // this instantly initializes navigation using the given travel mode
        },
      ],
      waypoints: [
        {
          latitude: usercurrentlat,
          longitude: usercurrentlng,
        },
        {
          latitude: usercurrentlat,
          longitude: usercurrentlng,
        },
        {
          latitude: usercurrentlat,
          longitude: usercurrentlng,
        },
      ],
    };
    // getDirections(data);
  };
  const [pin, setPin] = React.useState({
    // latitude: 37.78825,
    // longitude: -122.4324
    latitude: HLat,
    longitude: HLong,
  });
  const [region, setRegion] = React.useState({
    latitude: HLat,
    longitude: HLong,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [coordinates, setcoordinates] = React.useState([]);

  useEffect(() => {
    console.log('====================');
    console.log(route.params.enabledisable);
    console.log('====================');
    setcurrentlat(Number(route.params.cordinates.hos_lat));
    setcurrentlng(Number(route.params.cordinates.hos_lng));
    setusercurrentlat(Number(route.params.cordinates.currentlat));
    setusercurrentlng(Number(route.params.cordinates.currentlng));
    setcoordinates([
      {
        latitude: Number(route.params.cordinates.currentlat),
        longitude: Number(route.params.cordinates.currentlng),
      },
      {
        latitude: Number(route.params.cordinates.hos_lat),
        longitude: Number(route.params.cordinates.hos_lng),
      },
    ]);

    setGetValue(route.params.hospitalName);
    setHospitalCode(route.params.hospitalCode);
    setenabledisable(route.params.enabledisable);
    setHospitalAddress(route.params.hospitalAddress); // userServicesData();
    setHospitalid(route.params.hospital_id);
    setselfPay(route.params.selfPay);

    HospitalDataServices(route.params.hospitalCode);
    getHospitalImages(route.params.hospitalCode);
    HospitalDepartment(route.params.hospitalCode);
    HospitalbookBed(route.params.hospitalCode);
    setloding(false);
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const HospitalDataServices = async hcode => {
    const token = await AsyncStorage.getItem('tokenId');
    // console.log(token);
    setIsLoading(true);
    axios
      .get(baseurl + 'user/findServices/' + hcode, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        console.log(response.data);
        setServices(response.data[0].details);
        sethospitaldata(response.data[0].hospitalDetail[0]);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  };
  const getHospitalImages = hCode => {
    getHospitalImagesService(hCode).then(res => {
      console.log('unahshdvd', res.data.data);
      setHospitalImages(res.data.data);
    });
  };

  const HospitalDepartment = async hCode => {
    const token = await AsyncStorage.getItem('tokenId');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', `Bearer ${token}`);
    var raw = JSON.stringify({hospitalCode: hCode});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(baseurl + 'user/getDoctorDepartmentByHospitalCode', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setDepartmentValue(result);
      })
      .catch(error => console.log('error', error));

    // axios
    //   .get(baseurl + 'user/findDepartment/' + hCode, {
    //     headers: {Authorization: `Bearer ${token}`},
    //   })
    //   .then(response => {
    //     setDepartmentValue(response.data[0].details);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  };
  const HospitalbookBed = async hCode => {
    const token = await AsyncStorage.getItem('tokenId');
    console.log(baseurl + 'user/findBeds/' + hCode, token);
    setIsLoading(true);
    console.log('code wise Hospital Book bed');
    axios
      .get(baseurl + 'user/findBeds/' + hCode, {
        headers: {Authorization: `Bearer ${token}`},
      })

      .then(response => {
        console.log('------------response.data--------');
        // console.log(response.data[0].beds[0].bedName)
        setBookBedValue(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const ButtonHeader = props => {
    return (
      <TouchableOpacity
        onPress={() => {
          setselectedButton(props.Title);
        }}
        style={{
          width: wp('33.33%'),
          height: hp('7%'),
          backgroundColor:
            props.Title === selectedButton ? '#00abf6' : '#abdcfb',
          alignItems: 'center',
          justifyContent: 'center',
          borderRightWidth: 1,
          borderRightColor: '#00abf6',
        }}>
        <Text>{props.Title}</Text>
      </TouchableOpacity>
    );
  };

  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = React.useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    console.log('bjkbkjbk', e.nativeEvent);
  }, []);

  return loding ? null : (
    <SafeAreaView style={styles.contr}>
    <ScrollView style={styles.contr}>
      <View style={styles.imgSlider}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {!hospitalImages && (
            <ImageBackground
              key={index}
              source={require('../Assets/Images/hospi3.jpg')}
              style={{width: wp('100%'), height: hp('30%')}}>
              <View
                style={{
                  width: wp('30%'),
                  height: hp('8%'),
                  marginTop: hp('1%'),
                }}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    width: wp('10%'),
                    height: hp('8%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginTop: '5%',
                  }}>
                  <Ionicons
                    name="md-chevron-back"
                    size={hp('6%')}
                    color="#000"
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          )}
          {hospitalImages &&
            hospitalImages.map((image, index) => (
              <ImageBackground
                key={index}
                source={{
                  uri: image,
                }}
                style={{width: wp('100%'), height: hp('30%')}}>
                <View
                  style={{
                    width: wp('30%'),
                    height: hp('8%'),
                    marginTop: hp('1%'),
                    // backgroundColor: 'pink',
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                      width: wp('15%'),
                      height: hp('8%'),
                      justifyContent: 'center',
                      alignItems: 'center',

                      marginTop: hp('3%'),
                    }}>
                    <Ionicons
                      name="md-chevron-back"
                      size={hp('6%')}
                      color="#000"
                    />
                    {/* <Text style={{ fontFamily: "Roboto-Regular", fontSize: hp('2%'), color: Colors.primaryColor8 }}>Back</Text> */}
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            ))}
        </ScrollView>
      </View>
      <View
        style={{
          padding: wp('1%'),
          flexDirection: 'row',
          justifyContent: 'space-between',
          width:'100%'
        }}>
        <View style={{width:'90%'}}>
          <Text
            style={{
              fontSize: hp('2.5%'),
              color: Colors.black,
              fontWeight: 'bold',
              numberOfLines:'2',
             padding: wp('1%'),

            }}>
            {getValue}
          </Text>
          <Text style={{fontSize: hp('1.8%'), color: Colors.black,padding:wp('0.5%'),}}>
            {getHospitalAddress}
          </Text>
        </View>
        <TouchableOpacity
          style={{alignSelf: 'center',width:'10%'}}
          onPress={() => {
            const browser_url = `https://www.google.com/maps/dir/?api=1&destination=${currentlat},${currentlng}&dir_action=navigate`;
            // const browser_url = `https://www.google.de/maps/@${currentlat},${currentlng}`;
            return Linking.openURL(browser_url);
          }}>
          <Ionicons
            name="md-location-sharp"
            size={hp('4%')}
            style={{color: Colors.black}}
          />
        </TouchableOpacity>
      </View>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : 2}
        style={{
          color: Colors.black,
          fontSize: hp('2%'),
          padding:wp('1%'),
          left:4
        }}>
        {hospitaldata != undefined && hospitaldata.about_us}
      </Text>
      {/* {lengthMore ? ( */}
      <Text
        onPress={toggleNumberOfLines}
        style={{marginBottom: 10, marginRight: 10, alignSelf: 'flex-end'}}>
        {textShown ? 'Read less...' : 'Read more...'}
      </Text>
      {/* ) : null} */}

      <View style={{width: wp('100%'), height: hp('7%'), flexDirection: 'row'}}>
        <ButtonHeader Title={'About'} />
        <ButtonHeader Title={'Department'} />
        <ButtonHeader Title={'Bed Booking'} />
      </View>

      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <ActivityIndicator
              color="#bc2b78"
              size="large"
              style={{flex: 1, alignSelf: 'center', marginTop: 25}}
            />
          ) : selectedButton == 'About' ? (
            <>
              <View style={{width: wp('100%')}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: hp('2.4%'),
                    color: Colors.darkGray,
                    marginLeft: wp('1%'),
                  }}>
                  Services
                </Text>
                <View
                  style={{
                    width: wp('100%'),
                    // height: hp('10%'),
                    marginTop: hp('1%'),
                    // flexWrap: 'wrap',
                  }}>
                  {getServices.length !== 0 &&
                    getServices.map(val => {
                      return (
                        <Text
                          style={{
                            color: Colors.black,
                            fontSize: hp('1.6%'),
                            marginLeft: 10,
                            marginBottom: 10,
                          }}>
                          {val.services}
                        </Text>
                      );
                    })}
                </View>
              </View>
            </>
          ) : selectedButton == 'Department' ? (
            <>
              {getDepartmentValue.length !== 0 &&
                getDepartmentValue.map(val => {
                  return (
                    <List.Accordion title={val.department_name}>
                      {val.doctorList.length > 0 &&
                        val.doctorList.map(itm => {
                          // console.log(_id);
                          return (
                            <List.Item
                              title={itm.doctor_name}
                              onPress={() => {
                                navigation.navigate('BookAppoinment', {
                                  drId: itm._id,
                                  enableDisable:itm.enableDisable
                                });
                              }}
                            />
                          );
                        })}
                    </List.Accordion>
                  );
                })}
            </>
          ) : selectedButton === 'Bed Booking' ? (
            <>
              {getBookBedValue.length !== 0 &&
                getBookBedValue.map(val => {
                  console.log(val);
                  const asdasdasd = val.charges.amenitiesCharges;

                  return (
                    <View
                      style={{
                        width: wp('98%'),

                        backgroundColor: '#fff',
                        marginTop: hp('2%'),
                        borderTopLeftRadius: hp('2%'),
                        borderTopRightRadius: hp('2%'),
                        borderBottomLeftRadius: hp('2%'),
                        borderBottomRightRadius: hp('2%'),
                        alignSelf: 'center',
                      }}>
                      <View
                        style={{
                          width: wp('98%'),
                          // height: hp('5.5%'),
                          justifyContent: 'center',
                          paddingLeft: wp('1%'),
                          paddingVertical: 10,
                          backgroundColor: '#ece6e6',
                          borderTopLeftRadius: hp('2%'),
                          borderTopRightRadius: hp('2%'),
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: hp('2.2%'),
                            color: Colors.black,
                          }}>
                          {val.bedName}
                        </Text>
                        <Text
                          style={{
                            fontWeight: '500',
                            fontSize: hp('2%'),
                            color: Colors.black,
                          }}>
                          {val.amenities}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('98%'),
                          height: hp('19%'),
                          flexDirection: 'row',
                          backgroundColor: '#ffffff',
                          borderBottomLeftRadius: hp('2%'),
                          borderBottomRightRadius: hp('2%'),
                          alignSelf: 'center',
                        }}>
                        <View
                          style={{
                            width: wp('77%'),
                            height: hp('19%'),
                            backgroundColor: '#ffffff',
                            borderBottomLeftRadius: hp('2%'),
                          }}>
                          <View
                            style={{
                              width: wp('70%'),
                              height: hp('4%'),
                              flexDirection: 'row',
                              backgroundColor: '#ffffff',
                            }}>
                            <View
                              style={{
                                width: wp('35%'),
                                height: hp('5%'),
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  marginLeft: wp('1%'),
                                  fontSize: hp('2.2%'),
                                  fontWeight: 'bold',
                                  color: Colors.black,
                                }}>
                                Charges
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              width: wp('76.9%'),
                              height: hp('15.7%'),
                              flexDirection: 'row',
                              backgroundColor: '#fff',
                              borderBottomLeftRadius: hp('2%'),
                            }}>
                            <View
                              style={{
                                width: wp('65%'),
                                height: hp('15%'),
                                padding: wp('1.4%'),
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  marginTop: hp('1%'),
                                }}>
                                <Text style={{fontSize: hp('1.8%')}}>Bed</Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <Text style={{fontSize: hp('1.8%')}}>
                                    {val.charges.bedCharges}
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  marginTop: hp('1%'),
                                }}>
                                <Text style={{fontSize: hp('1.8%')}}>
                                  Facility{' '}
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <Text style={{fontSize: hp('1.8%')}}>
                                    {val.charges.facilitiesCharges}
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  marginTop: hp('1%'),
                                }}>
                                <Text
                                  style={{
                                    fontSize: hp('1.7%'),
                                    fontWeight: 'bold',
                                    color: Colors.black,
                                  }}>
                                  Total Amount
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: hp('1.6%'),
                                      fontWeight: 'bold',
                                      color: Colors.black,
                                    }}>
                                    {val.charges.totalCharges}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            width: wp('21%'),
                            height: hp('19.7%'),
                            justifyContent: 'center',
                            backgroundColor: '#ffffff',
                            borderBottomRightRadius: hp('2%'),
                          }}>
                          {enabledisable == '1' ? (
                          <TouchableOpacity
                            style={{
                              width: wp('18%'),
                              height: hp('4%'),
                              borderRadius: hp('1%'),
                              backgroundColor: Colors.skyblue,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            onPress={() => {
                              navigation.navigate('BookingSlot', {
                                data: val,
                                hospitalName: getValue,
                                hospitalCode: getHospitalcode,
                                hospitalAddress: getHospitalAddress,
                                hospital_id: getHospitalid,
                                selfPay: selfPay,
                              });
                            }}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: hp('1.6%'),
                                color: Colors.black,
                              }}>
                              Book Now
                            </Text>
                          </TouchableOpacity>
                          ):null}
                        </View>
                      </View>
                    </View>
                  );
                })}
            </>
          ) : null}

          {/* <View
              style={{
                width: wp('100%'),
                // height: hp('32%'),
                alignSelf: 'center',
                borderRadius: hp('1%'),
              }}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: currentlat,
                  longitude: currentlng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                provider="google">
                {coordinates.length > 0 &&
                  coordinates.map((coordinate, index) => (
                    <MapView.Marker
                      key={`coordinate_${index}`}
                      coordinate={coordinate}
                    />
                  ))}

                {coordinates.length == 2 && (
                  <MapViewDirections
                    origin={coordinates[0]}
                    waypoints={
                      coordinates.length > 2
                        ? coordinates.slice(1, -1)
                        : undefined
                    }
                    destination={coordinates[1]}
                    apikey={GOOGLE_API}
                    strokeWidth={3}
                    strokeColor="hotpink"
                    optimizeWaypoints={true}
                    onStart={params => {
                      console.log(
                        `Started routing between "${params.origin}" and "${params.destination}"`,
                      );
                    }}
                    onReady={result => {
                      console.log(`Distance: ${result.distance} km`);
                      console.log(`Duration: ${result.duration} min.`);
                    }}
                    onError={errorMessage => {
                      // console.log('GOT AN ERROR');
                    }}
                  />
                )}
              </MapView>
            </View> */}

          {/* <TouchableOpacity
              style={{
                width: wp('100%'),
                height: hp('7%'),
                backgroundColor: Colors.skyblue,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                // marginBottom: hp('3%'),
              }}
              onPress={() => {
                // const label = bookingdata.user_destinatio_location;

                // const browser_url = Platform.select({
                //   ios: 'maps:' + '?q=' + label,
                //   android: 'geo:' + '?q=' + label,
                // });
                // const location = `${26.25849},${72.970367}`;
                // const browser_url = Platform.select({
                //   ios: `maps:${location}`,
                //   android: `geo:${location}?center=${location}&q=${location}&z=16`,
                // });
                // Linking.openURL(url);
                // var lat = 26.25849;
                // var lng = 72.970367;
                // var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
                // var browser_url = scheme + `${lat},${lng}`;
                //const browser_url = `https://www.google.com/maps/dir/?api=1&destination=${currentlat},${currentlng}&dir_action=navigate`;
                // const browser_url = `https://www.google.de/maps/@${currentlat},${currentlng}`;
                return Linking.openURL(browser_url);
              }}
              // onPress={HandleGetDirections}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  color: Colors.white,
                  fontSize: hp('2.5%'),
                }}>
                Get Directions
              </Text>
            </TouchableOpacity> */}
        </ScrollView>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default HospitalDetailScreen;
const styles = StyleSheet.create({
  contr: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imgSlider: {
    width: wp('100%'),
    height: hp('30%'),
  },
  lowerContnr: {
    width: wp('100%'),
    height: hp('55%'),
  },
  map: {
    width: wp('100%'),
    height: hp('32%'),
    alignSelf: 'center',
    borderRadius: hp('1%'),
  },
});
