import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Title, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from "react-native-modal";

const CustomSidebarMenu = (props) => {


  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const TakePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: wp('30%'),
      height: hp('15%'),
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
      // this.bs.current.snapTo(1);
    });
  }

  const ChoosePhotoFromGalery = () => {
    ImagePicker.openPicker({
      width: wp('30%'),
      height: hp('15%'),
      cropping: true
    }).then(image => {
      console.log(image);
      setImage(image.path);
      // this.bs.current.snapTo(1);
    });
  }




  const { state, descriptors, navigation, route } = props;
  let lastGroupName = '';
  let newGroup = true;
 

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {state.routes.map((route) => {
          const {
            drawerLabel,
            activeTintColor,
            groupName
          } = descriptors[route.key].options;
          if (lastGroupName !== groupName) {
            newGroup = true;
            lastGroupName = groupName;
          } else newGroup = false;
          return (
            <>
              {newGroup ? (
                <>
                  <View style={{ marginTop: -5 }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#B2F3FF', '#0489D6']} style={styles.linearGradient}>
                      <View style={styles.sectionContainer}>
                        <View>
                          {/* <TouchableOpacity onPress={toggleModal}>

                            <Image source={require('./Source/Assets/Images/doctor.jpg')}
                              style={{ width: wp('18%'), height: wp('18%'), borderRadius: hp('5%'), marginLeft: wp('25%'), marginTop: hp('3%') }} />
                          </TouchableOpacity> */}

                          <TouchableOpacity
                            style={{
                              height: wp('18%'),
                              width: wp('18%'),
                              borderRadius: hp('5%'),
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginLeft: wp('25%'),
                              backgroundColor: 'black',
                              marginTop: hp('3%')
                            }} onPress={toggleModal}>
                            <ImageBackground
                              source={{
                                uri: image,
                              }}
                              style={{ height: 100, width: 100 }}
                              imageStyle={{ borderRadius: hp('100%'), }}>
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
                          </TouchableOpacity>


                          <Text style={styles.title2}>Your Profile</Text>

                        </View>

                      </View>
                    </LinearGradient>
                           
                    <View>
                      <View style={{ backgroundColor: "#f2f2f2", marginTop: hp('2%') }}>
                        <Text style={styles.Dtitle}>ADD FAMILY MEMBERS</Text></View>
                      <TouchableOpacity onPress={() => props.navigation.navigate('AddFamilyMember')}>

                        <Text style={styles.DsubTitle}> <FontAwesome5Icon name='user-plus' size={15} style={{ marginRight: wp('2%') }} />  Add a Member</Text>
                      </TouchableOpacity>
                      <View style={{ backgroundColor: "#f2f2f2", height: hp('5%') }}>
                          <Text style={styles.Dtitle}>eHOSPI SERVICES</Text></View>
                      <TouchableOpacity onPress={() => props.navigation.navigate('ConsultDoctors')}>
                        <Text style={styles.DsubTitle}><FontAwesome5Icon name='stethoscope' size={15} style={{ marginRight: wp('2%') }} />  Consult Doctors</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => props.navigation.navigate('GeneralBeds')}>
                        <Text style={styles.DsubTitle}><FontAwesome5Icon name='bed' size={15} style={{ marginRight: wp('2%') }} />  Book Hospital Bed</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => props.navigation.navigate('LabTest')}>
                        <Text style={styles.DsubTitle}><FontAwesome5Icon name='microscope' size={15} style={{ marginRight: wp('2%') }} />  Order Lab Test</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => props.navigation.navigate('Medicines')}>
                        <Text style={styles.DsubTitle}><FontAwesome5Icon name='pills' size={15} style={{ marginRight: wp('2%') }} />  Buy Medicines</Text>
                      </TouchableOpacity>
                      <View style={{ backgroundColor: "#f2f2f2" }}>
                        <Text style={styles.Dtitle}>eHospi Records</Text></View>
                      <TouchableOpacity onPress={() => props.navigation.navigate('BookingHistory')}>
                        <Text style={styles.DsubTitle}><FontAwesome5Icon name='history' size={15} style={{ marginRight: wp('2%') }} />  Booking History </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => props.navigation.navigate('Files')}>
                        <Text style={styles.DsubTitle}><FontAwesome5Icon name='file-medical' size={15} style={{ marginRight: wp('2%') }} />  Health Files </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => props.navigation.navigate('Invoices')}>
                        <Text style={styles.DsubTitle}><FontAwesome5Icon name='file-invoice' size={15} style={{ marginRight: wp('2%') }} />  Invoices </Text>
                      </TouchableOpacity>
                      <View style={{ backgroundColor: "#f2f2f2" }}>
                        <Text style={styles.Dtitle}>eHospi Help</Text></View>
                      <TouchableOpacity onPress={() => props.navigation.navigate('HelporSupport')}>
                        <Text style={styles.DsubTitle}><FontAwesome5Icon name='hiking' size={15} style={{ marginRight: wp('2%') }} />  Help and Support</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => props.navigation.navigate('AbouteHospi')}>
                        <Text style={styles.DsubTitle}><FontAwesome5Icon name='address-book' size={15} style={{ marginRight: wp('2%') }} />  About eHospi</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => props.navigation.navigate('TermsAndCondtions')}>
                        <Text style={styles.DsubTitle}><FontAwesome5Icon name='file' size={15} style={{ marginRight: wp('2%') }} />  Terms & Condition</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => props.navigation.navigate('PrivacyPolicy')}>
                        <Text style={styles.DsubTitle}><FontAwesome5Icon name='lock' size={15} style={{ marginRight: wp('2%') }} />  Privacy Policy</Text>
                      </TouchableOpacity>
                      <View style={{ backgroundColor: "#f2f2f2" }}>
                        <Text style={styles.Dtitle}>Wallet</Text></View>
                      <TouchableOpacity onPress={() => props.navigation.navigate('PaymentAndHealthCash')}>
                        <Text style={styles.DsubTitle}><FontAwesome5Icon name='money-bill' size={15} style={{ marginRight: wp('2%') }} />  Payment & HealthCash</Text>
                      </TouchableOpacity>
                      <View style={{ backgroundColor: "#f2f2f2" }}>
                        <Text style={styles.Dtitle}>Settings</Text></View>
                      <TouchableOpacity onPress={() => props.navigation.navigate('Settings')}>
                        <Text style={styles.DsubTitle}><FontAwesome5Icon name='cog' size={15} style={{ marginRight: wp('2%') }} />  Settings</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>

              ) : null}
              <DrawerItem
                key={route.key}
                label={
                  ({ color }) =>
                    <Text style={{ color }}>
                      {drawerLabel}
                    </Text>
                }
                focused={
                  state.routes.findIndex(
                    (e) => e.name === route.name
                  ) === state.index
                }
                activeTintColor={activeTintColor}
                onPress={() => navigation.navigate(route.name)}
              />
            </>
          );
        })}
      </DrawerContentScrollView>
      <Modal isVisible={isModalVisible}
        animationOutTiming={900}
        animationInTiming={900}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection={['down']}

        avoidKeyboard={true}
        useNativeDriver={true}
        style={{ alignSelf: 'center', }}
      >

        <View style={{ width: wp('100%'), height: hp('50%'), alignItems: 'center', marginTop: hp('50%'), borderTopLeftRadius: hp('4%'), borderTopRightRadius: hp('4%'), backgroundColor: 'white' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'gray', width: wp('30%'), borderRadius: hp('1.5%'), marginTop: hp('2%'), }}></View>
          <View style={{ width: wp('100%'), height: hp('14%'), marginTop: hp('5%'), padding: wp('2.5%'), }}>
            <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold', color: 'black', marginBottom: hp('1%'), paddingLeft: wp('1%') }}>Upload Photo</Text>

          </View>


          <View style={{ width: wp('100%'), height: hp('9%'), alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={TakePhotoFromCamera}
              style={{ width: wp('80%'), height: hp('7%'), backgroundColor: '#2581d4', borderRadius: hp('1.5%'), justifyContent: 'center', alignItems: 'center', }}
            >
              <Text style={styles.textStyle}>Take Photo From Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={ChoosePhotoFromGalery}
              style={{ width: wp('80%'), height: hp('7%'), backgroundColor: '#2581d4', borderRadius: hp('1.5%'), justifyContent: 'center', alignItems: 'center', marginTop: 12 }}
            >
              <Text style={styles.textStyle}>Choose Photo From Galery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: wp('80%'), height: hp('7%'), backgroundColor: '#2581d4', borderRadius: hp('1.5%'), justifyContent: 'center', alignItems: 'center', marginTop: 12 }}
            >
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
    fontSize: 16, fontStyle: "bold", fontWeight: 'bold', marginTop: hp('1%'), height: hp('4%'), marginLeft: wp('4%'), color: '#000000'
  },
  DsubTitle: { fontSize: 14, fontStyle: 'bold', fontWeight: 'bold', marginLeft: wp('4%'), marginTop: hp('1%') },
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
    marginLeft: wp('22%'),
    marginBottom: hp('3%')
  },
});

export default CustomSidebarMenu;