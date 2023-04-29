import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  BackHandler,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colors from '../Assets/Constants/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {baseurl} from '../Config/baseurl';
import {getImage} from '../Redux/actions/auth';
import {useDispatch, useSelector} from 'react-redux';

const EditProfile = ({route, navigation}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState('');
  const [n1, setn1] = useState('');
  const [n2, setn2] = useState('');
  const [getfirstName, setGetFirstName] = useState('');
  const [updatefFirstName, setupdatefFirstName] = useState('');
  // const [getProfileUserData, setProfileUserData] = useState('')
  //const [updat, setupdateLastName] = useState('');
  const [updateDateOfBirth, setupdatedDateOfBirth] = useState('');
  const [updateGender, setupdateGender] = useState(1);
  const [updateEmail, setupdateEmail] = useState('');
  const [getTokenId, setTokenId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    profileData();
  }, []);

  const profileData = async () => {
    // console.log('inside profile');
    const token = await AsyncStorage.getItem('tokenId');

    setIsLoading(true);
    axios
      .get(baseurl + 'user/profile/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        // console.log('dsddddddddddddddddddd', response.data);
        setupdatefFirstName(response.data.fullName);
        let p = response.data.fullName;
        p = p.split(' ');
        setn1(p[0]);
        p.shift();
        p = p.join('');
        setn2(p);
        // setProfileUserData(response.data.)
        dispatch(
          getImage({
            image: response.data.imageUrl,
            name: response.data.fullName,
          }),
        );
        setupdatedDateOfBirth(response.data.dateOfBirth);
        setupdateGender(response.data.gender);
        setupdateEmail(response.data.email);
        // console.log(response.data);
        AsyncStorage.setItem('editFirst_Name', p);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  const userProfileData = async () => {
    const token = await AsyncStorage.getItem('tokenId');

    let p = updateDateOfBirth;
    p = p.split('-');
    let temp = p[1];
    p[1] = p[0];
    p[0] = temp;
    p = p.join('-');
    console.log(p);
    const userData = {
      fullName: n1 + ' ' + n2,
      dateOfBirth: updateDateOfBirth,
      email: updateEmail,
      gender: updateGender,
    };

    console.log('Put api is calling');
    //console.log(userDataReg, userData)
    axios
      .put(baseurl + 'user/updateProfile/', userData, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        console.log('data is coming');
        console.log('dsvsdvsdv', response.data);

        updateImagesName();

        // props.navigation.navigate('DrawerNavigator');
      });
  };
  const updateImagesName = async () => {
    // console.log('inside profile');
    const token = await AsyncStorage.getItem('tokenId');

    setIsLoading(true);
    axios
      .get(baseurl + 'user/profile/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        // console.log('dsddddddddddddddddddd', response.data);
        setupdatefFirstName(response.data.fullName);
        let p = response.data.fullName;
        p = p.split(' ');
        setn1(p[0]);
        p.shift();
        p = p.join('');
        setn2(p);
        // setProfileUserData(response.data.)
        dispatch(
          getImage({
            image: response.data.imageUrl,
            name: response.data.fullName,
          }),
        );
        navigation.navigate('DrawerNavigator');
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };
  const myProfileEdit = () => {
    saveValueFunction();
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const rule = /^[a-zA-Z ]+(\.|')?[a-zA-Z ]+(\.|')?$/;
    const DOB_REGEX =
      /^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/;
    if (rule.test(firstName) == '') {
      alert('Enter the First Name');
    } else if (rule.test(lastName) == '') {
      alert('Enter Your Last Name');
    } else if (DOB_REGEX.test(date) == '') {
      alert('Enter Your Date of Birth');
    } else if (emailRegex.test(email) == '') {
      alert('Enter Your Email');
    } else {
      navigation.navigate('DrawerNavigator');
    }
  };

  const [isCheckSelected, setCheckSelected] = useState(1);
  const products = [
    {
      id: 1,
      name: 'Male',
    },
    {
      id: 2,
      name: 'Female',
    },
    {
      id: 3,
      name: 'Other',
    },
  ];
  const checkClick = name => {
    setupdateGender(name);
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={Colors.lightBlue} />
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="height" enabled={true}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {isLoading ? (
              <ActivityIndicator
                color="#bc2b78"
                size="large"
                style={{flex: 1, alignSelf: 'center', marginTop: 25}}
              />
            ) : (
              <ScrollView>
                <View style={styles.head}>
                  <View style={{width: wp('30%'), height: hp('4%')}}>
                    <TouchableOpacity
                      onPress={() => navigation.goBack('Home')}
                      style={{
                        width: wp('8%'),
                        height: hp('4%'),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Ionicons
                        name="md-chevron-back"
                        size={hp('3.2%')}
                        color="#fff"
                      />
                      {/* <Text style={{ fontFamily: "Roboto-Regular", fontSize: hp('2%'), color: Colors.primaryColor8 }}>Back</Text> */}
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
                      Profile
                    </Text>
                  </View>
                  <View style={{width: wp('30%'), height: hp('4%')}}></View>
                </View>

                <View style={{width: wp('100%'), height: hp('59%')}}>
                  <View
                    style={{
                      width: wp('100%'),
                      height: hp('18%'),
                      marginTop: hp('4%'),
                    }}>
                    <Text
                      style={{
                        fontSize: hp('1.8%'),
                        marginLeft: hp('2%'),
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      Full Name
                    </Text>
                    <View style={{width: wp('90%'), alignSelf: 'center'}}>
                      <TextInput
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: '#7fffd4',
                          fontSize: hp('2%'),
                          height: 50,
                        }}
                        value={n1}
                        onChangeText={text => setn1(text)}
                      />
                      <TextInput
                        placeholder="Last Name"
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: '#7fffd4',
                          fontSize: hp('2%'),
                          height: 50,
                        }}
                        value={n2}
                        onChangeText={text => setn2(text)}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      width: wp('100%'),
                      height: hp('10%'),
                      marginTop: hp('2%'),
                      paddingLeft: wp('3%'),
                    }}>
                    <Text
                      style={{
                        width: wp('100%'),
                        fontSize: hp('1.8%'),
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      Date of Birth
                    </Text>
                    <View>
                      <DatePicker
                        style={styles.inputTxt3}
                        date={updateDateOfBirth} // Initial date from state
                        mode="date" // The enum of date,
                        placeholder="MM-DD-YYYY"
                        iconComponent={
                          <FontAwesome5
                            name="calendar-alt"
                            color="#a9a9a9"
                            size={hp('3%')}
                          />
                        }
                        format="MM-DD-YYYY"
                        minDate="01-01-1900"
                        maxDate="01-01-2050"
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
                        onDateChange={date => {
                          setupdatedDateOfBirth(date);
                        }}
                        androidMode={'spinner'}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      width: wp('100%'),
                      height: hp('10%'),
                      marginTop: hp('1.5%'),
                    }}>
                    <Text
                      style={{
                        fontSize: hp('1.8%'),
                        marginLeft: hp('2%'),
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      Gender
                    </Text>
                    <View
                      style={{
                        width: wp('100%'),
                        height: hp('6%'),
                        marginTop: hp('1%'),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {products.map(val => {
                        return (
                          <TouchableOpacity
                            key={val.name}
                            onPress={checkClick.bind(this, val.name)}>
                            <View
                              style={{
                                width: wp('22%'),
                                height: hp('5.5%'),
                                borderRadius: hp('1%'),
                                marginLeft: hp('2.8%'),
                                backgroundColor:
                                  val.name == updateGender
                                    ? '#2581d4'
                                    : 'white',
                                alignItems: 'center',
                                justifyContent: 'center',
                                // flexDirection: 'row'
                              }}>
                              <Text
                                style={{
                                  color:
                                    val.name == updateGender
                                      ? 'white'
                                      : '#2581d4',
                                  fontWeight: 'bold',
                                }}>
                                {val.name}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                  <View
                    style={{
                      width: wp('100%'),
                      height: hp('10%'),
                      marginTop: hp('1%'),
                    }}>
                    <Text
                      style={{
                        fontSize: hp('1.8%'),
                        marginLeft: hp('2%'),
                        color: 'black',
                        fontWeight: 'bold',
                        height: 50,
                      }}>
                      Email Address
                    </Text>
                    <TextInput
                      placeholder="name@gmail.com"
                      style={{
                        width: wp('90%'),
                        alignSelf: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: '#7fffd4',
                        fontSize: hp('2%'),
                      }}
                      value={updateEmail}
                      keyboardType="email-address"
                      onChangeText={email => setupdateEmail(email)}
                    />
                  </View>
                </View>

                <View
                  style={{
                    width: wp('100%'),
                    height: hp('11%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    marginTop: hp('17%'),
                  }}>
                  <TouchableOpacity
                    onPressIn={userProfileData}
                    // onPress={() => navigation.navigate('DrawerNavigator')}
                    style={{
                      width: wp('70%'),
                      height: hp('6%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#00ABF6',
                      borderRadius: hp('1.5%'),
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: hp('2.2%'),
                      }}>
                      Save Changes
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#fff',
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
