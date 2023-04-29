import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
//import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, {Callout, Circle, Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getDirections from 'react-native-google-maps-directions';
import {baseurl} from '../Config/baseurl';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {getHospitalImagesService} from '../Services/Image';

const About = ({route, navigation}) => {
  const [index, setIndex] = React.useState(0);
  const _isMounted = useRef(true);
  const [getLocation, setGetLocation] = useState('');
  const [getValue, setGetValue] = useState('');
  const [theArray, setTheArray] = useState([]);
  const [getHospitalCode, setHospitalCode] = useState([]);
  const [getServices, setServices] = useState([]);
  const [getTokenId, setTokenId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [getHospitalAddress, setHospitalAddress] = useState('');
  const [hospitalImages, setHospitalImages] = useState([]);

  useEffect(() => {
    if (getTokenId) {
      getHospitalImages();
    }
  }, [getTokenId]);

  // const hospitalDetails = route.params;
  const HLat = 28.621309;
  const HLong = 77.365471;
  //    console.log(HLat,HLong)
  const HandleGetDirections = () => {
    const data = {
      source: {
        latitude: 28.621309,
        longitude: 77.365471,
      },
      destination: {
        latitude: HLat,
        longitude: HLong,
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
          latitude: HLat,
          longitude: HLong,
        },
        {
          latitude: HLat,
          longitude: HLong,
        },
        {
          latitude: HLat,
          longitude: HLong,
        },
      ],
    };
    getDirections(data);
  };
  const [pin, setPin] = React.useState({
    // latitude: 37.78825,
    // longitude: -122.4324
    latitude: 28.6267895,
    longitude: 77.3724016,
  });
  const [region, setRegion] = React.useState({
    latitude: HLat,
    longitude: HLong,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    displayData();
    // userServicesData();
    HospitalDataServices();
    _isMounted.current = false;
  }, [getTokenId]);

  useEffect(() => {
    const backAction = () => {
      console.log('You can not go Back');

      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  displayData = async () => {
    try {
      let user = await AsyncStorage.getItem('Hname').then(
        Hname => setGetValue(Hname),
        //   setGetLocation(Location)
      );
      let user2 = await AsyncStorage.getItem('Hcode').then(code =>
        //   setGetValue(Hname),
        setHospitalCode(code),
      );
      let user3 = await AsyncStorage.getItem('Haddress').then(Hadd =>
        //   setGetValue(Hname),
        setHospitalAddress(Hadd),
      );
      await AsyncStorage.getItem('tokenId').then(token =>
        //   setGetValue(Hname),
        setTokenId(token),
      );
    } catch (error) {
      alert(error);
    }
  };
  const HospitalDataServices = () => {
    setIsLoading(true);
    axios
      .get(baseurl + 'user/findServices/' + getHospitalCode, {
        headers: {Authorization: `Bearer ${getTokenId}`},
      })
      .then(response => {
        // console.log(response.data)
        // console.log(response.data[0].details)
        setServices(response.data[0].details);
        // console.log(getServices);
        // console.log(response.data[0].details[1].services)
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  };
  const getHospitalImages = data => {
    getHospitalImagesService({hCode: getHospitalCode, token: getTokenId}).then(
      res => {
        console.log(res.data);
        setHospitalImages(res.data.data);
      },
    );
  };

  return (
    <View style={styles.contr}>
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
                  height: hp('4%'),
                  marginTop: hp('1%'),
                }}>
                <TouchableOpacity
                  onPress={() => props.navigation.goBack('About')}
                  style={{
                    width: wp('10%'),
                    height: hp('8%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    //backgroundColor: 'green',
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
                    height: hp('4%'),
                    marginTop: hp('1%'),
                  }}>
                  <TouchableOpacity
                    onPress={() => props.navigation.goBack('About')}
                    style={{
                      width: wp('10%'),
                      height: hp('8%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                      //backgroundColor: 'green',
                    }}>
                    <Ionicons
                      name="md-chevron-back"
                      size={hp('6%')}
                      color="#000"
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            ))}
        </ScrollView>
      </View>
      <View style={{padding: wp('2%'), height: hp('8%')}}>
        <Text
          style={{
            fontSize: hp('2.5%'),
            color: Colors.black,
            fontWeight: 'bold',
          }}>
          {getValue}
        </Text>
        <Text style={{fontSize: hp('1.8%'), color: Colors.black}}>
          {getHospitalAddress}
        </Text>
      </View>
      <View style={{width: wp('100%'), height: hp('7%'), flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: wp('33.33%'),
            height: hp('7%'),
            backgroundColor: '#00abf6',
            alignItems: 'center',
            justifyContent: 'center',
            borderRightWidth: 1,
            borderRightColor: '#00abf6',
          }}>
          <Text>About</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: wp('33.33%'),
            height: hp('7%'),
            backgroundColor: '#abdcfb',
            alignItems: 'center',
            justifyContent: 'center',
            borderRightWidth: 1,
            borderRightColor: '#00abf6',
          }}
          onPress={() => navigation.navigate('Department')}>
          <Text>Department</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: wp('33.33%'),
            height: hp('7%'),
            backgroundColor: '#abdcfb',
            alignItems: 'center',
            justifyContent: 'center',
            borderRightWidth: 1,
            borderRightColor: '#00abf6',
          }}
          onPress={() => navigation.navigate('BookBed')}>
          <Text>Bed Booking</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lowerContainer}>
        <View style={{height: hp('55%')}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {isLoading ? (
              <ActivityIndicator
                color="#bc2b78"
                size="large"
                style={{flex: 1, alignSelf: 'center', marginTop: 25}}
              />
            ) : (
              <View style={{width: wp('100%'), height: hp('16%')}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: hp('2.5%'),
                    color: Colors.darkGray,
                    marginLeft: wp('1%'),
                  }}>
                  Services
                </Text>
                <View style={{marginTop: hp('1%')}}>
                  {getServices.length !== 0 &&
                    getServices.map(val => {
                      return (
                        <Text
                          style={{
                            color: Colors.black,
                            fontSize: hp('1.6%'),
                            marginLeft: wp('1.7%'),
                          }}>
                          {val.services}
                        </Text>
                      );
                    })}
                </View>
              </View>
            )}
            <View
              style={{
                width: wp('100%'),
                height: hp('32%'),
                alignSelf: 'center',
                borderRadius: hp('1%'),
              }}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 28.6267895,
                  longitude: 77.3724016,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                provider="google">
                <Marker
                  coordinate={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                  }}
                />
                <Marker
                  coordinate={pin}
                  pinColor="red"
                  draggable={true}
                  onDragStart={e => {
                    console.log('Drag start', e.nativeEvent.coordinates);
                  }}
                  onDragEnd={e => {
                    setPin({
                      latitude: e.nativeEvent.coordinate.latitude,
                      longitude: e.nativeEvent.coordinate.longitude,
                    });
                  }}>
                  <Callout>
                    <Text>I'm here</Text>
                  </Callout>
                </Marker>
              </MapView>
            </View>
            <TouchableOpacity
              style={{
                width: wp('100%'),
                height: hp('7%'),
                backgroundColor: Colors.skyblue,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginBottom: hp('3%'),
              }}
              onPress={HandleGetDirections}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: Colors.white,
                  fontSize: hp('2.5%'),
                }}>
                Get Directions
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    //flex: 1
    width: wp('100%'),
    height: hp('100%'),
  },
  imgSlider: {
    width: wp('100%'),
    height: hp('30%'),
  },
  lowerContainer: {
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
