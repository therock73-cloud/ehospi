import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
  Platform,
} from 'react-native';
import React, {useState, useRef} from 'react';
import MapView, {
  Callout,
  Circle,
  PROVIDER_GOOGLE,
  Marker,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const {width, height} = Dimensions.get('window');
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {Picker} from '@react-native-picker/picker';
import {baseurl} from '../../Config/baseurl';
import {GOOGLE_API} from '../../Config/constant';
import AntDesign from 'react-native-vector-icons/AntDesign';

const GOOGLE_MAPS_APIKEY = GOOGLE_API;
const AmbulanceMapScreen = ({navigation, route}) => {
  Geocoder.init(GOOGLE_API, {language: 'en'}); // set the language
  const [patientsmodal, setpatientsmodal] = useState(false);

  const [getLocation, setLocation] = useState('');
  const [currentlat, setcurrentlat] = useState('');
  const [currentlng, setcurrentlng] = useState('');

  const [descLocation, setdescLocation] = useState('');
  const [desclat, setdesclat] = useState('');
  const [desclng, setdesclng] = useState('');

  const [data, setdata] = useState([]);
  const [selectedType, setselectedType] = useState();
  const [Visible, setVisible] = useState(false);
  const [DestinationVisible, setDestinationVisible] = useState(false);
  const [patientsdata, setpatientsdata] = useState([]);
  const [selectedpatient, setSelectedpatient] = useState();
  const [selectedpatientdata, setSelectedpatientdata] = useState();
  const [favouriteaddressdata, setfavouriteaddressdata] = useState([]);
  const [loding, setloding] = useState(true);
  const [direction, setdirection] = useState(false);

  const ASPECT_RATIO = width / height;

  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [region, setRegion] = React.useState({
    latitude: '',
    longitude: '',
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [coordinates, setcoordinates] = React.useState([]);
  const [pin, setPin] = React.useState({
    // latitude: 37.78825,
    // longitude: -122.4324
    latitude: '',
    longitude: '',
  });

  useFocusEffect(
    React.useCallback(() => {
      setcurrentlat(route.params.currentlat);
      setcurrentlng(route.params.currentlng);
      // setlat(HLat);
      // setlng(HLong);
      setcoordinates([
        {latitude: route.params.currentlat, longitude: route.params.currentlng},
      ]);
      setRegion({
        latitude: route.params.currentlat,
        longitude: route.params.currentlng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setPin({
        latitude: route.params.currentlat,
        longitude: route.params.currentlng,
      });
      setloding(false);
      handleAmbulanceType();
      GetfamilyHandler();
      GetFavouriteAddressHandler();
    }, []),
  );
  const handleAmbulanceType = async () => {
    const token = await AsyncStorage.getItem('tokenId');
    const userid = await AsyncStorage.getItem('user_id');

    var myHeaders = new Headers();
    myHeaders.append('authorization', `Basic ${token}`);
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://api.ehospi.in/ambulance/mobileApplication/getAmbulancetype',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log(token, userid);
        // if (result.data.length > 0) {
        setdata(result.data);
        // }
      })
      .catch(error => console.log('error', error));
  };
  const locationService = () => {
    Geolocation.getCurrentPosition(
      position => {
        // console.log(position);
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
            let addressComponent = json.results[0].address_components;
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
            setVisible(false);
          })
          .catch(error => console.warn(error));
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
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
        console.log('result', result);
        const PatientDeatil = result.response.find(item => {
          return item.relation === 'self';
        });
        setSelectedpatientdata(PatientDeatil);
        setpatientsdata(result.response);
      })
      .catch(error => console.log('error', error));
  };
  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }
  const AddFavouriteAddressHandler = async (lat, lng, fulladdress) => {
    const userid = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('tokenId');

    var myHeaders = new Headers();
    myHeaders.append('authorization', `Basic ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      name: fulladdress,
      user_id: userid,
      lat: lat,
      long: lng,
      status: '1',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    // console.log(raw);
    fetch(`${baseurl}/ambulance/mobileApplication/add_address`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        alert('Location added successfully!');
      })
      .catch(error => console.log('error', error));
  };
  const GetFavouriteAddressHandler = async () => {
    const userid = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('tokenId');

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

    fetch(`${baseurl}/ambulance/mobileApplication/view_address`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setfavouriteaddressdata(result);
      })
      .catch(error => console.log('error', error));
  };
  const mapRef = React.useRef();

  return loding == true ? null : (
    <View
      style={{
        width: width,
        height: height,
        alignSelf: 'center',
        borderRadius: hp('1%'),
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: height * 0.05,
          left: '3%',

          zIndex: 1,
        }}>
        <EvilIcons name="chevron-left" size={40} color="#fff" />
      </TouchableOpacity>
      <MapView
        ref={mapRef}
        customMapStyle={mapStyle}
        showsUserLocation={false}
        zoomEnabled={true}
        zoomControlEnabled={true}
        style={{flex: 1}}
        initialRegion={{
          latitude: currentlat,
          longitude: currentlng,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        region={{
          latitude: currentlat,
          longitude: currentlng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // provider="google"
        // loadingEnabled={true}
        // loadingIndicatorColor="#666666"
        // loadingBackgroundColor="#eeeeee"
        // moveOnMarkerPress={true}
        // showsCompass={true}
        // showsPointsOfInterest={true}
        // // provider="google"
        // minZoomLevel={2}
        // maxZoomLevel={20}
        // showsMyLocationButton={false}
        // followsUserLocation={true}
      >
        {coordinates.length >= 1 &&
          coordinates.map((coordinate, index) => (
            <MapView.Marker
              key={`coordinate_${index}`}
              coordinate={coordinate}
            />
          ))}

        {coordinates.length == 2 && (
          <MapViewDirections
            origin={{
              latitude: currentlat,
              longitude: currentlng,
            }}
            waypoints={
              coordinates.length > 2 ? coordinates.slice(1, -1) : undefined
            }
            destination={{
              latitude: desclat,
              longitude: desclng,
            }}
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

              // this.mapView.fitToCoordinates(result.coordinates, {
              //   edgePadding: {
              //     right: (width / 20),
              //     bottom: (height / 20),
              //     left: (width / 20),
              //     top: (height / 20),
              //   }
              // });
            }}
            onError={errorMessage => {
              // console.log('GOT AN ERROR');
            }}
          />
        )}
      </MapView>
      <View
        style={{
          position: 'absolute',
          top: height * 0.1,
          width: width * 0.8,
          alignSelf: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#ffffff',
            width: width * 0.8,
            height: height * 0.07,
            alignSelf: 'center',
            borderRadius: 5,
            borderBottomRightRadius: 7,
            borderBottomLeftRadius: 7,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: '5%',
          }}>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: '#2DCC34',
                width: width * 0.03,
                height: width * 0.03,
                alignSelf: 'center',
                borderRadius: width * 0.03,
              }}
            />
            <Text
              numberOfLines={1}
              style={{
                color: '#000',
                width: '85%',
                marginLeft: '4%',
              }}>
              {getLocation == '' ? 'Your Pick -up location' : getLocation}
            </Text>
            {/* <TextInput
            placeholder="Your Pick -up location"
            style={{
              backgroundColor: '#ffffff',
              width: '88%',
              marginLeft: '2%',
            }}
          /> */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (getLocation !== '') {
                AddFavouriteAddressHandler(currentlat, currentlng, getLocation);
              } else {
                alert('Select location');
              }
            }}>
            <EvilIcons name="heart" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#ffffff',
            width: width * 0.8,
            height: height * 0.07,
            alignSelf: 'center',
            borderRadius: 5,
            borderTopRightRadius: 7,
            borderTopLeftRadius: 7,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: '5%',
          }}>
          <TouchableOpacity
            onPress={() => setDestinationVisible(true)}
            style={{flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: '#2DCC34',
                width: width * 0.03,
                height: width * 0.03,
                alignSelf: 'center',
                borderRadius: width * 0.03,
              }}
            />
            <Text
              numberOfLines={1}
              style={{
                color: '#000',
                width: '85%',
                marginLeft: '4%',
              }}>
              {descLocation == '' ? 'Search Destination' : descLocation}
            </Text>
          </TouchableOpacity>
          {/* <TextInput
            placeholder="Search Destination"
            style={{
              width: '88%',
              marginLeft: '2%',
            }}
          /> */}
          <TouchableOpacity
            onPress={() => {
              if (getLocation !== '') {
                AddFavouriteAddressHandler(desclat, desclng, descLocation);
              } else {
                alert('Select location');
              }
            }}>
            <EvilIcons name="heart" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          minHeight: height * 0.2,
          width: width,
          alignSelf: 'center',
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            width: width * 0.9,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: '3%',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#000',
            }}>
            Ambulance Type
          </Text>

          {/* <TouchableOpacity
            onPress={() => navigation.navigate('AmbulanceTypeScreen')}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: '600', color: '#2580D3'}}>
              View all
            </Text>
          </TouchableOpacity> */}
        </View>
        <View style={{flex: 1}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.length > 0 &&
              data.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (getLocation != '' && descLocation != '') {
                        navigation.navigate('AmbulanceTypeScreen', {
                          id: item._id,
                          name: item.ambulance_type,
                          source: getLocation,
                          destination: descLocation,
                          currentlat: currentlat,
                          currentlng: currentlng,
                          desclat: desclat,
                          desclng: desclng,
                          selectedpatientdata: selectedpatientdata,
                        });
                        setselectedType(item._id);
                      } else {
                        alert('Select Pick -up location and destination');
                      }
                    }}
                    style={{
                      alignItems: 'center',
                      marginLeft: index == 0 ? width * 0.05 : 0,
                      marginRight: width * 0.05,
                    }}>
                    <Image
                      source={require('../../Assets/Images/ambulanceicon.png')}
                      style={{
                        width: width * 0.18,
                        resizeMode: 'contain',
                        height: height * 0.08,
                      }}
                    />

                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#000000',
                        borderBottomWidth: selectedType == item._id ? 2 : 0,
                        // paddingBottom: '2%',
                      }}>
                      {' ' + item.ambulance_type + ' '}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      </View>
      <Modal
        animationType="slide"
        visible={Visible}
        transparent={true}
        onRequestClose={() => setVisible(false)}>
        <TouchableOpacity
          onPressOut={() => setVisible(false)}
          style={{
            width: '100%',
            // flex: 1,
            height: height,

            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}>
          <TouchableWithoutFeedback>
            <View style={{position: 'absolute'}}>
              <View
                style={{
                  flex: 1,
                  width: width,
                  height: height,
                  backgroundColor: '#ffffff',
                  paddingTop: Platform.OS === 'ios' ? '15%' : '5%',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity onPress={() => setVisible(false)}>
                        <EvilIcons name="chevron-left" size={40} color="#000" />
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '700',
                          color: '#000',
                        }}>
                        Pick-up
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        if (Platform.OS === 'android') {
                          open();
                        } else {
                          setpatientsmodal(false);
                        }
                      }}
                      style={{
                        width: width * 0.35,
                        height: height * 0.04,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: '4%',
                        borderWidth: 1,
                        borderColor: '#BCBCBC',
                        borderRadius: width * 0.1,
                        marginRight: '5%',
                      }}>
                      <FontAwesome name="user" size={20} color="#3F3D3D" />
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '400',
                            color: '#3F3D3D',
                          }}>
                          {selectedpatientdata != undefined
                            ? selectedpatientdata.relation === 'self'
                              ? 'Myself'
                              : selectedpatientdata.name
                            : 'Myself'}
                        </Text>
                        <EvilIcons name="chevron-down" size={30} color="#000" />
                      </View>
                    </TouchableOpacity>
                    <Picker
                      ref={pickerRef}
                      style={{display: 'none'}}
                      selectedValue={selectedpatient}
                      onValueChange={(itemValue, itemIndex) => {
                        setSelectedpatient(itemValue);
                        setSelectedpatientdata(itemValue);
                      }}>
                      {patientsdata.length > 0 &&
                        patientsdata.map(item => {
                          return <Picker.Item label={item.name} value={item} />;
                        })}
                    </Picker>
                  </View>
                  <View>
                    <ScrollView
                    // contentContainerStyle={{
                    //   alignSelf: 'center',
                    //   shadowColor: '#171717',
                    //   shadowOffset: {width: 0, height: 0},
                    //   shadowOpacity: 0.2,
                    //   shadowRadius: 7,
                    //   elevation: 7,
                    // }}
                    >
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
                            marginTop: '5%',
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
                          setLocation(data.description);
                          setVisible(false);
                          setcurrentlat(details.geometry.location.lat);
                          setcurrentlng(details.geometry.location.lng);
                          setcoordinates([
                            {
                              latitude: details.geometry.location.lat,
                              longitude: details.geometry.location.lng,
                            },
                          ]);
                          setRegion({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                          });
                          console.log(
                            'here i got pressed',
                            details.geometry.location.lat,
                            details.geometry.location.lng,
                          );
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
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: '#000',
                      marginLeft: '5%',
                      marginTop: '5%',
                    }}>
                    Favourites
                  </Text>
                  {favouriteaddressdata.length > 0 &&
                    favouriteaddressdata.map(item => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setLocation(item.name);
                            setcurrentlat(Number(item.lat));
                            setcurrentlng(Number(item.long));
                            if (coordinates.length == 1) {
                              setcoordinates([
                                {
                                  latitude: Number(item.lat),
                                  longitude: Number(item.long),
                                },
                                {
                                  latitude: Number(desclat),
                                  longitude: Number(desclng),
                                },
                              ]);
                            } else {
                              setcoordinates([
                                {
                                  latitude: Number(item.lat),
                                  longitude: Number(item.long),
                                },
                              ]);
                            }
                            setVisible(false);
                          }}
                          style={{
                            width: width * 0.9,
                            alignSelf: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: '5%',
                          }}>
                          <Entypo name="heart" size={20} color="#000" />
                          <View style={{marginLeft: '5%'}}>
                            {/* <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '400',
                                color: '#3F3D3D',
                              }}>
                              Maliyana
                            </Text> */}
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: '400',
                                color: '#3F3D3D',
                              }}>
                              {item.name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
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
                    onPress={locationService}
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
                  <View style={{width: '45%', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '400',
                        color: '#737373',
                      }}>
                      Locate on Map
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="slide"
        visible={DestinationVisible}
        transparent={true}
        onRequestClose={() => setDestinationVisible(false)}>
        <TouchableOpacity
          onPressOut={() => setDestinationVisible(false)}
          style={{
            width: '100%',
            // flex: 1,
            height: height,

            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}>
          <TouchableWithoutFeedback>
            <View style={{position: 'absolute'}}>
              <View
                style={{
                  flex: 1,
                  width: width,
                  height: height,
                  backgroundColor: '#ffffff',
                  paddingTop: Platform.OS === 'ios' ? '15%' : '5%',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() => setDestinationVisible(false)}
                        style={{}}>
                        <EvilIcons name="chevron-left" size={40} color="#000" />
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '700',
                          color: '#000',
                        }}>
                        Destination
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        if (Platform.OS === 'android') {
                          open();
                        } else {
                          setpatientsmodal(false);
                        }
                      }}
                      style={{
                        width: width * 0.35,
                        height: height * 0.04,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: '4%',
                        borderWidth: 1,
                        borderColor: '#BCBCBC',
                        borderRadius: width * 0.1,
                        marginRight: '5%',
                      }}>
                      <FontAwesome name="user" size={20} color="#3F3D3D" />
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '400',
                            color: '#3F3D3D',
                          }}>
                          {selectedpatientdata != undefined
                            ? selectedpatientdata.relation === 'self'
                              ? 'Myself'
                              : selectedpatientdata.name
                            : 'Myself'}
                        </Text>
                        <EvilIcons name="chevron-down" size={30} color="#000" />
                      </View>
                    </TouchableOpacity>
                    <Picker
                      ref={pickerRef}
                      style={{display: 'none'}}
                      selectedValue={selectedpatient}
                      onValueChange={(itemValue, itemIndex) => {
                        setSelectedpatient(itemValue);
                        setSelectedpatientdata(itemValue);
                      }}>
                      {patientsdata.length > 0 &&
                        patientsdata.map(item => {
                          return <Picker.Item label={item.name} value={item} />;
                        })}
                    </Picker>
                  </View>
                  <View>
                    <ScrollView
                    // contentContainerStyle={{
                    //   alignSelf: 'center',
                    //   shadowColor: '#171717',
                    //   shadowOffset: {width: 0, height: 0},
                    //   shadowOpacity: 0.2,
                    //   shadowRadius: 7,
                    //   elevation: 7,
                    // }}
                    >
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
                            marginTop: '5%',
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
                          setdescLocation(data.description);
                          setDestinationVisible(false);
                          setdesclat(details.geometry.location.lat);
                          setdesclng(details.geometry.location.lng);
                          setcoordinates([
                            {
                              latitude: currentlat,
                              longitude: currentlng,
                            },
                            {
                              latitude: details.geometry.location.lat,
                              longitude: details.geometry.location.lng,
                            },
                          ]);
                          setdirection(true);
                          console.log(
                            'here i got pressed',
                            details.geometry.location.lat,
                            details.geometry.location.lng,
                          );
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
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: '#000',
                      marginLeft: '5%',
                      marginTop: '5%',
                    }}>
                    Favourites
                  </Text>
                  {favouriteaddressdata.length > 0 &&
                    favouriteaddressdata.map(item => {
                      console.log(item);
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setdescLocation(item.name);
                            setdesclat(item.lat);
                            setdesclng(item.long);
                            if (coordinates.length === 1) {
                              setcoordinates([
                                {
                                  latitude: currentlat,
                                  longitude: currentlng,
                                },
                                {
                                  latitude: Number(item.lat),
                                  longitude: Number(item.long),
                                },
                              ]);
                            } else {
                              setcoordinates([
                                {
                                  latitude: Number(item.lat),
                                  longitude: Number(item.long),
                                },
                              ]);
                            }

                            setDestinationVisible(false);
                          }}
                          style={{
                            width: width * 0.9,
                            alignSelf: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: '5%',
                          }}>
                          <Entypo name="heart" size={20} color="#000" />
                          <View style={{marginLeft: '5%'}}>
                            {/* <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '400',
                                color: '#3F3D3D',
                              }}>
                              Maliyana
                            </Text> */}
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: '400',
                                color: '#3F3D3D',
                              }}>
                              {item.name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderTopWidth: 1,
                    borderColor: '#DFDBDB',
                    width: width,
                    paddingTop: '5%',
                    paddingBottom: '10%',
                    // position: 'absolute',
                    // bottom: '1%',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '400',
                      color: '#737373',
                    }}>
                    Locate on Map
                  </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="slide"
        visible={patientsmodal}
        transparent={true}
        onRequestClose={() => setpatientsmodal(false)}>
        <TouchableOpacity
          onPressOut={() => setpatientsmodal(false)}
          style={{
            width: '100%',
            flex: 1,
            height: height,

            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}>
          <TouchableWithoutFeedback>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
              }}>
              <TouchableOpacity
                onPress={() => setpatientsmodal(false)}
                style={{
                  alignSelf: 'center',
                  marginBottom: '3%',
                }}>
                <AntDesign
                  name="close"
                  size={50}
                  color="#000"
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
              <View
                style={{
                  // flex: 1,
                  width: width,
                  height: height * 0.3,

                  borderTopLeftRadius: width * 0.1,
                  borderTopRightRadius: width * 0.1,
                  backgroundColor: '#ffffff',
                  elevation: 10,
                }}>
                <Picker
                  selectedValue={selectedpatient}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedpatient(itemValue);
                    setSelectedpatientdata(itemValue);
                  }}>
                  {patientsdata.length > 0 &&
                    patientsdata.map(item => {
                      return <Picker.Item label={item.name} value={item} />;
                    })}
                </Picker>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default AmbulanceMapScreen;

const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
