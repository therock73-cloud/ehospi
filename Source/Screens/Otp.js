import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
import DatePicker from 'react-native-datepicker';
import OtpInputs from 'react-native-otp-inputs';
import {RadioButton} from 'react-native-paper';
import CustomButton from '../ReusableComponent/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateToken, loginWithFacebookAction} from '../Redux/actions/auth';
import axios from 'axios';
import useTimeout from '../utils/useTimeout';
import {baseurl} from '../Config/baseurl';
const phoneLogin = baseurl + 'user/phone/login/';
const VerifyResRegOtp = baseurl + 'user/phone/verifyOTP';

const Otp = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = React.useState('first');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // console.log('setPin=====', setPin)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [getValue, setGetValue] = useState('');
  const {DetailsIdGet, phoneNo} = route.params;
  const [getDetailsId, setGetDetailsId] = useState('');
  const [counter, setCounter] = React.useState(30);
  const [isEnabled, setIsEnabled] = useState(true);
  const [resendOtp, setResendOtp] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('DetailsId').then(value => setGetDetailsId(value));
  }, [getDetailsId]);

  useTimeout(() => setResendOtp(true), 30000);

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

  const validForm = () => {
    //const emailRegex = /\S+@\S+\.\S+/;
    // const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const rule = /^[a-zA-Z ]{2,40}$/;
    const DOB_REGEX =
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

    if (rule.test(fullName) == '') {
      alert('Enter the valid Name');
    } else if (DOB_REGEX.test(date) == '') {
      alert('Select Your Date of Birth');
    } else if (emailRegex.test(email) == '') {
      alert('Enter the valid Email');
    } else {
      alert('Profile Data Submitted Successfully');
      navigation.navigate('Profile');
    }
  };
  const onPressotpVerification = () => {
    const keyToken = 'tokenIdforSplash';

    const verifyObj = {
      msgid: getDetailsId,
      otp: pin,
    };
    console.log('Verify obj value==' + verifyObj.otp);
    console.log(verifyObj);
    verifyObj.otp = Number(verifyObj.otp);
    // verifyObj.phone
    console.log(verifyObj);

    const fetchData = async () => {
      setIsLoading(true);
      const f = axios.post(VerifyResRegOtp, verifyObj);
      f.then(t => {
        console.log('t.data', t.data);
        let tk = t.data.token;
        if (t.data._id != null) {
          AsyncStorage.setItem('user_id', t.data._id);
        }
        AsyncStorage.setItem('tokenId', tk);
        AsyncStorage.setItem('refreshToken', t.data.refreshToken);
        AsyncStorage.setItem('uid', t.data.uid);
        dispatch(loginWithFacebookAction(t.data));
        dispatch(
          updateToken({
            token: t.data.token,
            refreshToken: t.data.refreshToken,
          }),
        );
        console.log(tk);
        axios
          .get(baseurl + 'user/alreadyRegistered', {
            headers: {Authorization: `Bearer ${tk}`},
          })
          .then(res => {
            console.log('wqe');
            console.log(res.data);
            console.log(res.data.message);
            if (res.data.message == 'No data found') {
              AsyncStorage.setItem('tokenkeyValue', keyToken);
              navigation.navigate('Profile', {Pname: tk});
            } else if (res.data.message == 'User already registered') {
              AsyncStorage.setItem('tokenkeyValue', keyToken);
              navigation
                .navigate('DrawerNavigator')
                .finally(() => setIsLoading(false));
            } else {
              console.log('Error occur');
            }
          });
      }).catch(e => {
        console.log('1st');
      });
    };
    fetchData();
  };
  const reSendOtp = () => {
    setResendOtp(false);

    AsyncStorage.removeItem('DetailsId');

    const phoneNoData = {
      phone: phoneNo,
    };
    console.log(phoneNoData);
    axios
      .post(phoneLogin, phoneNoData)
      .then(res => {
        console.log('api response yha', res.data);
        console.log('resend details yha aa rha hai', res.data.msgid);
        let sfsdfsd = res.data.msgid;
        setCounter(30);
        setResendOtp(false);
        AsyncStorage.setItem('DetailsId', res.data.msgid);
        // alert('saved');
        AsyncStorage.getItem('DetailsId').then(value => setGetDetailsId(value));
        if (res.data.Status == 400) {
          S('Number is not ');
        } else if (res.data.Status == 'Success') {
          //  AsyncStorage.setItem('user_id')

          AsyncStorage.setItem('DetailsId', res.data.Details);
          // navigation.navigate('Otp',{DetailsIdGet: res.data.Details});
          //  onPressotpVerification();
        } else {
          console.log('else condtion');
        }
        console.log(res.data.statusCode);
      })
      .catch(function (error) {
        console.log(error);
      });

    // useTimeout(() => setResendOtp(true), 30000);
  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={{
            width: wp('100%'),
            height: hp('30%'),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: hp('2%'), color: '#A5A5A5'}}>
            We've sent OTP verification code
          </Text>
          <Text style={{fontSize: hp('2%'), color: '#A5A5A5'}}>
            on your given number
          </Text>
        </View>
        <OtpInputs
          handleChange={code => setPin(code)}
          numberOfInputs={6}
          keyboardType="phone-pad"
          inputStyles={styles.underlineStyleBase}
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: -hp('1%'),
          }}
        />

        {pin.length !== 6 ? (
          <CustomButton
            // onPress={() => props.navigation.navigate('Profile')}
            title={'CONTINUE'}
            bgColor={'#C0C0C0'}
            width={wp('85%')}
            height={hp('7%')}
            color={Colors.white}
            fontSize={hp('2.5%')}
            alignSelf={'center'}
            marginTop={hp('5%')}
            borderRadius={hp('1%')}
            disabled={true}
          />
        ) : isLoading ? (
          <ActivityIndicator
            color="#0489D6"
            size="large"
            style={{flex: 1, alignSelf: 'center'}}
          />
        ) : (
          <CustomButton
            onPress={() => onPressotpVerification()}
            // onPress={() => navigation.navigate('Profile', { Pname: 'Priyanka Chauhan' })}
            title={'CONTINUE'}
            bgColor={'#0489D6'}
            width={wp('85%')}
            height={hp('7%')}
            color={Colors.white}
            fontSize={hp('2.5%')}
            alignSelf={'center'}
            marginTop={hp('5%')}
            borderRadius={hp('1%')}
          />
        )}

        <View
          style={{
            width: wp('96%'),
            height: hp('7%'),
            alignSelf: 'center',
            marginTop: hp('2%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: wp('1%'),
          }}>
          {isEnabled && (
            <View style={{justifyContent: 'center'}}>
              <Text style={{color: '#000000'}}>
                Resend Otp in 00:
                <Text
                  style={{
                    color: '#000000',
                    fontWeight: 'bold',
                    fontSize: hp('2.5%'),
                  }}>
                  {counter}
                </Text>
              </Text>
            </View>
          )}
          {/* {counter == 0 ? */}
          {counter == 0 && (
            <TouchableOpacity
              disabled={counter !== 0}
              onPress={reSendOtp}
              style={{justifyContent: 'center'}}>
              <Text style={{color: '#000000'}}>Resend Otp</Text>
            </TouchableOpacity>
          )}
          {/* : null} */}
        </View>
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
            {/* <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => setModalVisible(!modalVisible)}>
                            <FontAwesome5Icon name='times' size={hp('2.5%')} color={Colors.black} />
                        </TouchableOpacity> */}
            <Text style={{fontWeight: 'bold', fontSize: hp('2.5%')}}>
              Complete your Profile
            </Text>
            {/* <Image source={require('../Assets/Images/Group.png')}
                            style={{ width: hp('10%'), height: hp('10%'), borderRadius: hp('10%'), marginTop: hp('2%') }} /> */}
            <Image
              source={require('../Assets/Images/doctor.jpg')}
              style={{
                width: hp('10%'),
                height: hp('10%'),
                borderRadius: hp('10%'),
                marginTop: hp('2%'),
              }}
            />
            <TextInput
              placeholder="Full Name"
              placeholderTextColor={Colors.darkGray}
              style={styles.inputCome}
              keyboardType="email-address"
              value={fullName}
              onChangeText={text => setFullName(text)}
            />
            {/* <TextInput
                            placeholder='Date of Birth'
                            placeholderTextColor={Colors.darkGray}
                            style={styles.inputCome}
                            keyboardType='number-pad'

                        /> */}

            <DatePicker
              style={styles.inputTxt3}
              date={date} // Initial date from state
              mode="date" // The enum of date,
              placeholder="Date of Birth"
              format="DD-MM-YYYY"
              minDate="01-01-1900"
              maxDate="19-01-2028"
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                  alignItems: 'flex-start',
                  paddingLeft: wp('3%'),
                },
              }}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={date => {
                setDate(date);
              }}
            />
            <Text style={{alignSelf: 'flex-start', marginTop: hp('2%')}}>
              Gender<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
                marginTop: hp('2%'),
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                  value="first"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                />
                <Text>Male</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                  value="second"
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('second')}
                />
                <Text>Female</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                  value="third"
                  status={checked === 'third' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('third')}
                />
                <Text>Other</Text>
              </View>
            </View>
            <TextInput
              placeholder="Email Address"
              placeholderTextColor={Colors.darkGray}
              style={styles.inputCome}
              keyboardType="email-address"
              value={email}
              onChangeText={email => setEmail(email)}
            />

            <CustomButton
              onPress={validForm}
              title={'Submit'}
              bgColor={Colors.darkGreen}
              width={wp('40%')}
              height={hp('7%')}
              color={Colors.white}
              fontSize={hp('2.5%')}
              alignSelf={'center'}
              padding={hp('8%')}
              borderRadius={hp('2%')}
              marginTop={hp('4%')}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default Otp;

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    width: wp('100%'),
  },
  input: {
    borderRadius: wp('1%'),
    width: wp('15%'),
    height: wp('15%'),
    borderWidth: 1,
    marginHorizontal: wp('2%'),
    color: 'black',
    borderColor: '#000',
    fontSize: hp('3.5%'),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  underlineStyleBase: {
    width: wp('6%'),
    borderWidth: 0,
    borderBottomWidth: 1,
    color: 'black',
    borderBottomColor: '#a2a2a2',
    marginHorizontal: wp('6%'),
    fontSize: hp('3.5%'),
    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  otpView: {
    width: wp('80%'),
    height: hp('5%'),
    color: 'black',
    alignSelf: 'center',
  },
  centeredView: {
    width: wp('100%'),
    height: hp('100%'),
  },
  inputCome: {
    width: wp('80%'),
    height: hp('6.5%'),
    fontSize: hp('2.2%'),
    marginLeft: wp('3%'),
    borderRadius: hp('1%'),
    marginTop: hp('2%'),
    paddingLeft: hp('2%'),
    backgroundColor: Colors.verylightGray,
  },

  inputTxt3: {
    width: wp('80%'),
    height: hp('6.5%'),
    backgroundColor: Colors.verylightGray,

    borderRadius: wp('2%'),
    marginLeft: wp('3%'),
    marginTop: wp('2%'),
    //paddingRight: wp('7%'),
    //paddingLeft: hp('2%'),
    justifyContent: 'center',
    // alignItems: 'center',
    //padding: wp('4%'),
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
});
