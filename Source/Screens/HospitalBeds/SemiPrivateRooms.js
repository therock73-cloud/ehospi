import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  Image,
  Modal,
  Platform,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../Assets/Constants/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../../ReusableComponent/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
//const bookBedApi = 'https://ehospi-new-api.herokuapp.com/api/allfindBedstatus';

const SemiPrivateRooms = ({route, props, navigation}) => {
  const [checked, setChecked] = React.useState('first');
  const [modalVisible, setModalVisible] = useState(false);
  const [getDate, setGetDate] = useState('');
  // const [refreshing, setRefreshing] = React.useState(false);
  const [animating, setAnimating] = useState(true);
  const [getTime, setGetTime] = useState('');
  const [getFormate, setGetFormate] = useState('');
  const [getLocation, setGetLocation] = useState('');
  const [getValue, setGetValue] = useState('');
  const [getamenitiesCharges, setamenitiesCharges] = useState('');
  const [getbedCharges, setbedCharges] = useState('');
  const [getfacilitiesChargesbreak, setfacilitiesChargesbreak] = useState([]);
  const [getfacilitiesCharges, setfacilitiesCharges] = useState('');
  const [gettotalCharges, settotalCharges] = useState('');
  const [getHospitalCode, setHospitalCode] = useState('');
  const [getWard, setWard] = useState('');
  const [getamenitlue, setamenialue] = useState([]);
  const [hospitalImages, setHospitalImages] = useState([]);
  const [getHospitalAddress, setHospitalAddress] = useState('');

  useEffect(() => {
    // GetSavedDate();
    // GetBookBedData();
    // console.log('-------------------------------------');
    setHospitalImages(route.params.data.bedImages);
    // console.log('-------------------------------------');


    setfacilitiesChargesbreak(route.params.data.matchFacilitiesArr);
    setamenialue(route.params.data.amenities);
    setWard(route.params.data.bedName);
    setamenitiesCharges(route.params.data.charges.amenitiesCharges);
    setbedCharges(route.params.data.charges.bedCharges);
    setfacilitiesCharges(route.params.data.charges.facilitiesCharges);
    settotalCharges(route.params.data.charges.totalCharges);
    setHospitalCode(route.params.hospitalCode);
    setHospitalAddress(route.params.hospitalAddress);
    setGetValue(route.params.hospitalName);
    setGetLocation();
    setGetDate(route.params.date);
    setGetTime(route.params.timing);
    setGetFormate(route.params.formate);
  });
  useEffect(() => {
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
  }, []);

  const handleSubmit = () => {
    navigation.navigate('HospitalForm', {
      amenities: route.params.data.amenities,
      bedName: route.params.data.bedName,
      amenitiesCharges: route.params.data.charges.amenitiesCharges,
      bedCharges: route.params.data.charges.bedCharges,
      facilitiesCharges: route.params.data.charges.facilitiesCharges,
      totalCharges: route.params.data.charges.totalCharges,
      hospitalCode: route.params.hospitalCode,
      hospitalAddress: route.params.hospitalAddress,
      hospitalName: route.params.hospitalName,
      date: route.params.date,
      timing: route.params.timing,
      formate: route.params.formate,
      selfPay: route.params.selfPay,
      hospital_id: route.params.hospital_id,
    });
  };
  console.log({
    amenities: route.params.data.amenities,
    bedName: route.params.data.bedName,
    amenitiesCharges: route.params.data.charges.amenitiesCharges,
    bedCharges: route.params.data.charges.bedCharges,
    facilitiesCharges: route.params.data.charges.facilitiesCharges,
    totalCharges: route.params.data.charges.totalCharges,
    hospitalCode: route.params.hospitalCode,
    hospitalAddress: route.params.hospitalAddress,
    hospitalName: route.params.hospitalName,
    date: route.params.date,
    timing: route.params.timing,
    formate: route.params.formate,
    selfPay: route.params.selfPay,
    hospital_id: route.params.hospital_id,
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.contnr}>
        <View style={styles.imgSlider}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {!hospitalImages && ( 
            <ImageBackground
              source={require('../../Assets/Images/Bed.png')}
              style={{width: wp('100%'), height: hp('30%')}}>
              <View
                style={{
                  width: wp('30%'),
                  height: hp('4%'),
                  marginTop: hp('1%'),
                }}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    width: wp('8%'),
                    height: hp('4%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    name="md-chevron-back"
                    size={hp('4.5%')}
                    color="#000"
                  />
                  {/* <Text style={{ fontFamily: "Roboto-Regular", fontSize: hp('2%'), color: Colors.primaryColor8 }}>Back</Text> */}
                </TouchableOpacity>
              </View>
            </ImageBackground>)}
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: hp('1%'),
            padding: wp('2%'),
            // height: hp('15%'),
          }}>
          <View>
            <Text
              style={{
                fontSize: hp('3%'),
                color: Colors.black,
                fontWeight: 'bold',
                padding: wp('1%'),

              }}>
              {getValue}{' '}
            </Text>
            <Text style={{fontSize: hp('2%'), color: Colors.black,         
               padding: wp('1%'),
}}>
              {getHospitalAddress}
            </Text>
          </View>
        </View>
        <View style={{width: wp('100%'), height: hp('58%')}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                width: wp('95%'),
                height: hp('8%'),
                backgroundColor: '#717791',
                alignSelf: 'center',
                marginTop: hp('0.8%'),
                flexDirection: 'row',
                borderRadius: hp('1%'),
              }}>
              <TouchableOpacity
                style={{
                  width: wp('52.5%'),
                  height: hp('8%'),
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: wp('3%'),
                }}
                // onPress={() => navigation.navigate('BookingSlot')}
                // onPress={RemoveSaveData}
              >
                <View>
                  <FontAwesome5
                    name="calendar-alt"
                    color={Colors.white}
                    size={hp('2.5%')}
                  />
                </View>
                <Text
                  style={{
                    fontSize: hp('1.5%'),
                    color: Colors.white,
                    marginLeft: wp('2.2%'),
                  }}>
                  Date:{getDate} {getTime} {getFormate}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  width: wp('0.5%'),
                  height: hp('6%'),
                  backgroundColor: Colors.white,
                  marginTop: hp('1%'),
                }}
              />
              <View
                style={{
                  width: wp('42%'),
                  height: hp('8%'),
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: wp('6%'),
                }}>
                <TouchableOpacity>
                  <FontAwesome5
                    name="user"
                    color={Colors.white}
                    size={hp('3%')}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: hp('1.5%'),
                    color: Colors.white,
                    marginLeft: wp('4%'),
                  }}>
                  1 Room{' '}
                  <Text style={{fontSize: hp('1.5%'), alignSelf: 'center'}}>
                    Details
                  </Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                width: wp('100%'),
                // height: hp('20%'),
                marginTop: hp('1%'),
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: hp('2.5%'),
                  padding: wp('2%'),
                }}>
                Amenities
              </Text>

              {getamenitlue.length !== 0 &&
                getamenitlue.map(yt => {
                  return (
                    <Text
                      style={{
                        fontSize: hp('1.8%'),
                        marginLeft: wp('7%'),

                        // marginVertical: hp('0.2%'),
                      }}>
                      {yt}
                    </Text>
                  );
                })}
            </View>
            <View style={{width: wp('100%')}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: hp('2.5%'),
                  padding: wp('2%'),
                }}>
                Payment Details
              </Text>
              {getamenitiesCharges !== 0 && (
                <View
                  style={{
                    width: wp('100%'),
                    height: hp('4%'),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: hp('1%'),
                    paddingHorizontal: wp('4%'),
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: hp('2%')}}>Amenities</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome5
                      name="rupee-sign"
                      color={Colors.black}
                      size={hp('2%')}
                    />
                    <Text style={{fontSize: hp('2%')}}>
                      {getamenitiesCharges}
                    </Text>
                  </View>
                </View>
              )}
              <View
                style={{
                  width: wp('100%'),
                  height: hp('4%'),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp('1%'),
                  paddingHorizontal: wp('4%'),
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: hp('2%')}}>Bed</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome5
                    name="rupee-sign"
                    color={Colors.black}
                    size={hp('2%')}
                  />
                  <Text style={{fontSize: hp('2%')}}>{getbedCharges}</Text>
                </View>
              </View>

              {getfacilitiesChargesbreak.length > 0 &&
                getfacilitiesChargesbreak.map(item => {
                  return (
                    <View
                      style={{
                        width: wp('100%'),
                        height: hp('4%'),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: hp('1%'),
                        paddingHorizontal: wp('4%'),
                        alignItems: 'center',
                      }}>
                      <Text style={{fontSize: hp('2%')}}>
                        {item.facilities}
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome5
                          name="rupee-sign"
                          color={Colors.black}
                          size={hp('2%')}
                        />
                        <Text style={{fontSize: hp('2%')}}>{item.price}</Text>
                      </View>
                    </View>
                  );
                })}
              {/* <View
                style={{
                  width: wp('100%'),
                  height: hp('4%'),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp('1%'),
                  paddingHorizontal: wp('4%'),
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: hp('2%')}}>Facility</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome5
                    name="rupee-sign"
                    color={Colors.black}
                    size={hp('2%')}
                  />
                  <Text style={{fontSize: hp('2%')}}>
                    {getfacilitiesCharges}
                  </Text>
                </View> 
              </View>*/}
              <View
                style={{
                  width: wp('100%'),
                  height: hp('4%'),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp('1%'),
                  paddingHorizontal: wp('4%'),
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: hp('2%'), fontWeight: 'bold'}}>
                  Total Charges
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome5
                    name="rupee-sign"
                    color={Colors.black}
                    size={hp('2%')}
                  />
                  <Text style={{fontSize: hp('2%'), fontWeight: 'bold'}}>
                    {gettotalCharges}
                  </Text>
                </View>
              </View>
              {/* <View style={{ borderBottomWidth: 0.8, width: wp('100%'), backgroundColor: Colors.black, marginTop: hp('2%') }} /> */}
            </View>

            <View
              style={{
                width: wp('100%'),
                height: hp('12%'),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: wp('100%'),
                  height: hp('10%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: Platform.OS === 'ios' ? 50 : 0,
                }}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    width: wp('80%'),
                    height: hp('7%'),
                    backgroundColor:
                      !getTime || !getDate ? '#9fb0bf' : '#2581D4',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: hp('1%'),
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: hp('2.5%'),
                      color: Colors.white,
                    }}>
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end'}}
                onPress={() => setModalVisible(!modalVisible)}>
                <FontAwesome5
                  name="times"
                  size={hp('2.5%')}
                  color={Colors.black}
                />
              </TouchableOpacity>
              <Image
                source={require('../../Assets/Images/Group.png')}
                style={{
                  width: hp('20%'),
                  height: hp('20%'),
                  borderRadius: hp('10%'),
                }}
              />

              <Text style={styles.modalText}>Thank You!</Text>
              <Text style={styles.modalText2}>Your Booking Successful</Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  marginBottom: 5,
                  fontWeight: 'bold',
                }}>
                Booking ID:36678689
              </Text>
              <Text
                style={{textAlign: 'center', fontSize: 16, marginBottom: 5}}>
                You booked a bed in Sarder Hospital on
              </Text>
              <Text
                style={{textAlign: 'center', fontSize: 16, marginBottom: 5}}>
                February 17,2022
              </Text>
              <Text
                style={{textAlign: 'center', fontSize: 16, marginBottom: 5}}>
                at 02:00 PM
              </Text>
              <CustomButton
                onPress={() => navigation.navigate('DrawerNavigator')}
                title={'DONE'}
                bgColor={Colors.blue}
                width={wp('75%')}
                height={hp('7%')}
                color={Colors.white}
                fontSize={hp('2.5%')}
                alignSelf={'center'}
                padding={hp('8%')}
                borderRadius={hp('2%')}
                marginTop={hp('3%')}
              />
              <TouchableOpacity style={{marginTop: hp('1%')}}>
                <Text style={{alignSelf: 'center', color: Colors.blue}}>
                  {' '}
                  <Text style={{fontWeight: 'bold'}}></Text> Edit Your
                  Appointment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SemiPrivateRooms;

const styles = StyleSheet.create({
  contnr: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.white,
  },
  txt: {
    fontWeight: 'bold',
    fontSize: hp('2.7%'),
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: hp('2%'),
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },
  modalText2: {
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 20,
  },
  imgSlider: {
    width: wp('100%'),
    height: hp('31%'),
  },
});
