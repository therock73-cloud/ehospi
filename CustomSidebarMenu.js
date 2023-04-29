import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Title,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import {baseurl} from './Source/Config/baseurl';
import axios from 'axios';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from './Source/Redux/actions';
const ProfilePhoto = require('./Source/Assets/Images/men1.png');
import {refreshTokenAction} from './Source/utils/refreshToken';
import Geocoder from 'react-native-geocoding';
import {getImage} from './Source/Redux/actions/auth';

import Geolocation from 'react-native-geolocation-service';
const CustomSidebarMenu = props => {
  const imageUri = useSelector(state => state.auth.image);
  const name = useSelector(state => state.auth.name);
  const [userName, setUserName] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [getValue, setGetValue] = useState('');
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [image, setImage] = useState('');
  const isFocused = useIsFocused();
  const [getKeyVAlue, setKeyVAlue] = useState('');

  const [currentlat, setcurrentlat] = useState('');
  const [currentlng, setcurrentlng] = useState('');
  const [userimage, setuserimage] = useState('');
  const [patientsdata, setpatientsdata] = useState();
  console.log(name);
  useEffect(() => {
    setImage(imageUri);
    console.log('Image URL : ' + imageUri);
    setImage(imageUri);
  }, [imageUri]);
  useEffect(() => {
    getValueFunction();
  }, [isFocused, tokenId]);

  useEffect(() => {
    getValueFunction();
    // refreshTokenAction();
  }, [tokenId]);
  console.log(name);
  const locationService = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
            let addressComponent = json.results[0].address_components;
            setcurrentlng(position.coords.longitude);
            setcurrentlat(position.coords.latitude);
            // let displayAddress =
            //   addressComponent[1].long_name +
            //   ',' +
            //   addressComponent[2].long_name +
            //   ',' +
            //   addressComponent[3].long_name +
            //   ',' +
            //   addressComponent[4].long_name +
            //   ',' +
            //   addressComponent[5].short_name;
            // setLocation(displayAddress);
            // AsyncStorage.setItem('displayAddress', displayAddress);
            // console.log(addressComponent);
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

  useEffect(() => {
    locationService();
  }, []);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const uploadPhotoService = async img => {
    const token = await AsyncStorage.getItem('tokenId');

    const profileData = new FormData();
    profileData.append('userProfileImg', {
      uri: Platform.OS === 'android' ? img.path : `file://${img.path}`,
      name: Platform.OS === 'android' ? img.modificationDate : img.filename,
      type: img.mime,
    });

    fetch(baseurl + 'user/uploadPicture', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      body: profileData,
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        setImage(img.path);
      })
      .catch(err => console.log(err))
      .finally(() => setModalVisible(false));
  };

  const TakePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: wp('30%'),
      height: hp('15%'),
      cropping: true,
    })
      .then(image => {
        uploadPhotoService(image);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const ChoosePhotoFromGalery = async () => {
    const Images = ImagePicker.openPicker({
      width: wp('30%'),
      height: hp('15%'),
      cropping: true,
      includeBase64: false,
    })
      .then(image => {
        console.log(image);
        uploadPhotoService(image);

        // this.bs.current.snapTo(1);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const getValueFunction = async () => {
    AsyncStorage.getItem('tokenId').then(value => setTokenId(value));
    AsyncStorage.getItem('tokenkeyValue').then(ky => setKeyVAlue(ky));
    AsyncStorage.getItem('First_Name').then(value => {
      console.log('First_Name : ' + value);
      setGetValue(value);
    });
  };
  const LogOutFun = () => {
    AsyncStorage.clear();
    dispatch(logout());
    props.navigation.navigate('Login');
  };

  const {state, descriptors, navigation, route} = props;
  let lastGroupName = '';
  let newGroup = true;

  const ProfilePicSet = () => {
    if (image) {
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        {state.routes.map(route => {
          const {drawerLabel, activeTintColor, groupName} =
            descriptors[route.key].options;
          if (lastGroupName !== groupName) {
            newGroup = true;
            lastGroupName = groupName;
          } else newGroup = false;
          return (
            <>
              {newGroup ? (
                <>
                  <View style={{marginTop: -5}}>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={['#B2F3FF', '#0489D6']}
                      style={styles.linearGradient}>
                      <View style={styles.sectionContainer}>
                        <View
                          style={{width: wp('75.5%'), marginTop: -hp('1%')}}>
                          <TouchableOpacity
                            style={{
                              height: hp('4.5%'),
                              width: wp('6.6%'),
                              alignSelf: 'flex-end',
                              justifyContent: 'center',
                              marginRight: hp('5%'),
                            }}
                            onPress={() =>
                              props.navigation.navigate('EditProfile')
                            }>
                            <FontAwesome
                              name="edit"
                              size={wp('5.5%')}
                              color="#fff"
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={{
                              height: wp('20%'),
                              width: wp('20%'),
                              borderRadius: hp('5%'),
                              justifyContent: 'center',
                              alignItems: 'center',
                              // marginLeft: wp('25%'),
                              // backgroundColor: 'red',
                              marginTop: hp('3%'),
                              alignSelf: 'center',
                            }}
                            onPress={toggleModal}>
                            {/* {image=="" ? (
                              <Image
                                source={require('./Source/Assets/Images/men1.png')}
                                style={{
                                  width: hp('10%'),
                                  height: hp('10%'),
                                  borderRadius: hp('10%'),
                                }}
                              />
                            ) : ( */}
                            <ImageBackground
                              source={{
                                uri: image,
                              }}
                              style={{height: 100, width: 100}}
                              imageStyle={{borderRadius: hp('100%')}}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                {/* <MaterialCommunityIcons
                                    name="camera"
                                    size={35}
                                    color="#fff"
                                    style={{
                                        opacity: 0.7,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        borderRadius: 10,
                                    }}
                                /> */}
                              </View>
                            </ImageBackground>
                            {/* )} */}
                            <TouchableOpacity style={{marginTop: hp('-1%')}}>
                              <FontAwesome
                                name="camera"
                                size={wp('3.2%')}
                                color="#fff"
                              />
                            </TouchableOpacity>
                          </TouchableOpacity>
                          <View
                            style={{
                              height: hp('7%'),
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: hp('2%'),
                                marginTop: hp('1.8%'),
                                color: '#fff',
                              }}>
                              {name}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>
                    <View>
                      <View
                        style={{
                          backgroundColor: '#f2f2f2',
                          marginTop: hp('2%'),
                        }}>
                        <Text style={styles.Dtitle}>ADD FAMILY MEMBERS</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('AddFamilyMember', {
                            add: false,
                          })
                        }>
                        <Text style={styles.DsubTitle}>
                          <FontAwesome5Icon
                            name="user-plus"
                            size={15}
                            style={{marginRight: wp('2%')}}
                          />{' '}
                          Add a Member
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('AddressDetails')
                        }>
                        <Text style={styles.DsubTitle}>
                          {' '}
                          <FontAwesome5Icon
                            name="address-book"
                            size={15}
                            style={{marginRight: wp('2%')}}
                          />{' '}
                          Add a Address
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{backgroundColor: '#f2f2f2', height: hp('5%')}}>
                        <Text style={styles.Dtitle}>eHOSPI SERVICES</Text>
                      </View>
                      <TouchableOpacity
                        onPress={
                          () =>
                            props.navigation.navigate('Consultation', {
                              type: 'All',
                            })
                          // navigation.navigate('Consultation')
                        }>
                        <Text style={styles.DsubTitle}>
                          <FontAwesome5Icon
                            name="stethoscope"
                            size={15}
                            style={{marginRight: wp('2%')}}
                          />{' '}
                          Consult Doctors
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('GeneralBeds', {
                            currentlat: currentlat,
                            currentlng: currentlng,
                          })
                        }>
                        <Text style={styles.DsubTitle}>
                          <FontAwesome5Icon
                            name="bed"
                            size={15}
                            style={{marginRight: wp('2%')}}
                          />{' '}
                          Book Hospital Bed
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('LabTest', {
                            currentlat: currentlat,
                            currentlng: currentlng,
                          })
                        }>
                        <Text style={styles.DsubTitle}>
                          <FontAwesome5Icon
                            name="microscope"
                            size={15}
                            style={{marginRight: wp('2%')}}
                          />{' '}
                          Order Lab Test
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('AmbulanceMapScreen', {
                            currentlat: currentlat,
                            currentlng: currentlng,
                          })
                        }>
                        <Text style={styles.DsubTitle}>
                          <FontAwesome5Icon
                            name="ambulance"
                            size={15}
                            style={{marginRight: wp('2%')}}
                          />{' '}
                          Ambulance Booking
                        </Text>
                      </TouchableOpacity>
                      {/* <TouchableOpacity
                        onPress={() => props.navigation.navigate('Medicines')}>
                        <Text style={styles.DsubTitle}>
                          <FontAwesome5Icon
                            name="pills"
                            size={15}
                            style={{marginRight: wp('2%')}}
                          />{' '}
                          Buy Medicines
                        </Text>
                      </TouchableOpacity> */}
                      <View style={{backgroundColor: '#f2f2f2'}}>
                        <Text style={styles.Dtitle}>eHospi Records</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('BookingHistory')
                        }>
                        <Text style={styles.DsubTitle}>
                          <FontAwesome5Icon
                            name="history"
                            size={15}
                            style={{marginRight: wp('2%')}}
                          />{' '}
                          Booking History{' '}
                        </Text>
                      </TouchableOpacity>
                      {/* <TouchableOpacity
                        onPress={() => props.navigation.navigate('Files')}>
                        <Text style={styles.DsubTitle}>
                          <FontAwesome5Icon
                            name="file-medical"
                            size={15}
                            style={{marginRight: wp('2%')}}
                          />
                          Health Files
                        </Text>
                      </TouchableOpacity> */}
                      {/* <TouchableOpacity
                        onPress={() => props.navigation.navigate('Invoices')}>
                        <Text style={styles.DsubTitle}>
                          <FontAwesome5Icon
                            name="file-invoice"
                            size={15}
                            style={{marginRight: wp('2%')}}
                          />{' '}
                          Invoices{' '}
                        </Text>
                      </TouchableOpacity> */}
                      <View style={{backgroundColor: '#f2f2f2'}}>
                        <Text style={styles.Dtitle}>eHospi Help</Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => props.navigation.navigate('Refund')}>
                        <Text style={styles.DsubTitle}>
                          <FontAwesome5Icon
                            name="hiking"
                            size={15}
                            style={{marginRight: wp('2%')}}
                          />{' '}
                          Refunds And Cancellation Policy
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('DisclaimerPolicy')
                        }>
                        <Text style={styles.DsubTitle}>
                          <FontAwesome5Icon
                            name="file"
                            size={15}
                            style={{marginRight: wp('2%')}}
                          />{' '}
                          Disclaimer Policy
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => props.navigation.navigate('About')}>
                        <Text style={styles.DsubTitle}>
                          <FontAwesome5Icon
                            name="address-book"
                            size={15}
                            style={{marginRight: wp('2%')}}
                          />
                          About eHospi
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('TermsAndCondtions')
                        }>
                        <Text style={styles.DsubTitle}>
                          <FontAwesome5Icon
                            name="file"
                            size={15}
                            style={{marginRight: wp('2%')}}
                          />{' '}
                          Terms & Condition
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('PrivacyPolicy')
                        }>
                        <Text style={styles.DsubTitle}>
                          <FontAwesome5Icon
                            name="lock"
                            size={15}
                            style={{marginRight: wp('2%')}}
                          />{' '}
                          Privacy Policy
                        </Text>
                      </TouchableOpacity>

                      {/* <View style={{backgroundColor: '#f2f2f2'}}>
                        <Text style={styles.Dtitle}>Wallet</Text>
                      </View> */}
                      {/* <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('PaymentAndHealthCash')
                        }>
                        <Text style={styles.DsubTitle}>
                          <FontAwesome5Icon
                            name="money-bill"
                            size={15}
                            style={{marginRight: wp('2%')}}
                          />{' '}
                          Payment & HealthCash
                        </Text>
                      </TouchableOpacity> */}
                      {/* <View style={{backgroundColor: '#f2f2f2'}}>
                        <Text style={styles.Dtitle}>Settings</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => props.navigation.navigate('Settings')}>
                        <Text style={styles.DsubTitle}>
                          <FontAwesome5Icon
                            name="cog"
                            size={15}
                            style={{marginRight: wp('2%')}}
                          />{' '}
                          Settings
                        </Text>
                      </TouchableOpacity> */}
                      <TouchableOpacity
                        onPress={LogOutFun}
                        style={{
                          backgroundColor: '#f2f6fc',
                          height: hp('6%'),
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,

                            fontWeight: 'bold',
                            marginTop: hp('1%'),
                            height: hp('4%'),
                            marginLeft: wp('4%'),
                            color: '#0489D6',
                          }}>
                          <Feather
                            name="log-out"
                            size={18}
                            style={{marginRight: wp('2%')}}
                          />
                          Logout
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              ) : null}
              <DrawerItem
                key={route.key}
                label={({color}) => <Text style={{color}}>{drawerLabel}</Text>}
                focused={
                  state.routes.findIndex(e => e.name === route.name) ===
                  state.index
                }
                activeTintColor={activeTintColor}
                onPress={() => navigation.navigate(route.name)}
              />
            </>
          );
        })}
      </DrawerContentScrollView>
      <Modal
        isVisible={isModalVisible}
        animationOutTiming={900}
        animationInTiming={900}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection={['down']}
        avoidKeyboard={true}
        useNativeDriver={true}
        style={{alignSelf: 'center'}}>
        <View
          style={{
            width: wp('100%'),
            height: hp('50%'),
            alignItems: 'center',
            marginTop: hp('50%'),
            borderTopLeftRadius: hp('4%'),
            borderTopRightRadius: hp('4%'),
            backgroundColor: 'white',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: 'gray',
              width: wp('30%'),
              borderRadius: hp('1.5%'),
              marginTop: hp('2%'),
            }}></View>
          <View
            style={{
              width: wp('100%'),
              height: hp('14%'),
              marginTop: hp('5%'),
              padding: wp('2.5%'),
            }}>
            <Text
              style={{
                fontSize: hp('2.5%'),
                fontWeight: 'bold',
                color: 'black',
                marginBottom: hp('1%'),
                paddingLeft: wp('1%'),
              }}>
              Upload Photo
            </Text>
          </View>
          <View
            style={{
              width: wp('100%'),
              height: hp('9%'),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={TakePhotoFromCamera}
              style={{
                width: wp('80%'),
                height: hp('7%'),
                backgroundColor: '#2581d4',
                borderRadius: hp('1.5%'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.textStyle}>Take Photo From Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={ChoosePhotoFromGalery}
              style={{
                width: wp('80%'),
                height: hp('7%'),
                backgroundColor: '#2581d4',
                borderRadius: hp('1.5%'),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 12,
              }}>
              <Text style={styles.textStyle}>Choose Photo From Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(!isModalVisible)}
              style={{
                width: wp('80%'),
                height: hp('7%'),
                backgroundColor: '#2581d4',
                borderRadius: hp('1.5%'),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 12,
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    // backgroundColor: "#38afff",
    // marginTop: -5,
  },
  Dtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: hp('1%'),
    height: hp('4%'),
    marginLeft: wp('4%'),
    color: '#000000',
  },
  DsubTitle: {
    fontSize: 14,

    fontWeight: 'bold',
    marginLeft: wp('4%'),
    marginTop: hp('1%'),
  },
  sectionLine: {
    backgroundColor: 'gray',
    flex: 1,
    height: 1,
    marginLeft: 10,
    marginRight: 20,
  },
  title: {
    fontSize: 22,
    marginTop: 3,
    fontWeight: 'bold',
    marginLeft: wp('25%'),
  },
  title2: {
    fontSize: 22,
    marginTop: 18,
    fontWeight: 'bold',
    marginBottom: hp('3%'),
    justifyContent: 'center',
    //alignSelf: 'center',
    marginLeft: wp('25%'),
  },
});

export default CustomSidebarMenu;
