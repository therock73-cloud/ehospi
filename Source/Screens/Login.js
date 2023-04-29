import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Linking,
  BackHandler,
  Button
} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
import CustomButton from '../ReusableComponent/Button';
// import {IndicatorViewPager, PagerDotIndicator} from '@shankarmorwal/rn-viewpager';
import axios from 'axios';
import {SliderBox} from 'react-native-image-slider-box';
import {useSelector} from 'react-redux';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {
  loginWithFacebookService,
  checkAlreadyRegisteredService,
} from '../Services/auth';
import {loginWithFacebookAction, updateToken} from '../Redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {lightGreenA700} from 'react-native-paper/lib/typescript/styles/colors';
// import { facebookurl } from './facebook';

const Login = ({navigation}) => {
  const [userInfo, setUserInfo] = useState({});
  const dispatch = useDispatch();
  const authtoken = useSelector(state => state.auth.userData.token);

  const img01 = [
    require('../Assets/Images/Aiims.png'),
    require('../Assets/Images/Bed.png'),
    require('../Assets/Images/banner3.jpeg'),
    require('../Assets/Images/banner4.jpeg'),
  ];

  useEffect(() => {
    // const backAction = () => {
    //   console.log('You can not go Back');

    //   return true;
    // };
    // const backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   backAction,
    // );
    // return () => backHandler.remove();

  GoogleSignin.configure({
      // androidClientId:'443745298239-39up8ld3e67th8ft67t8bu6fa6da39fb.apps.googleusercontent.com',
      webClientId:'528214311041-1s8esbv9d96b3smg05drk4u4ue2in3pb.apps.googleusercontent.com'
    });
   
  }, []);

  const signIn = async () => {
    try {
      if (GoogleSignin.isSignedIn()) {
        GoogleSignin.signOut();
      }
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
       setUser(userInfo);
    } catch (error) {
      console.log('Message', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };
  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!!isSignedIn) {
      getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
  };
  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log(userInfo);

       setUser(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser({}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  const logoutWithFacebook = () => {
    LoginManager.logOut();
    setUserInfo({});
  };

  const getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,email,picture',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, user) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          setUserInfo(user);
          const loginData = {
            token,
            email: userInfo.email,
            picture: userInfo?.picture?.data?.url,
            name: userInfo.name,
            id: userInfo.id,
          };
          loginWithFacebookService(loginData).then(response => {
            const keyToken = 'tokenIdforSplash';
            if (response.success) {
              dispatch(loginWithFacebookAction(response.data));
              dispatch(
                updateToken({
                  token: response.data.token,
                  refreshToken: response.data.refreshToken,
                }),
              );
              AsyncStorage.setItem('tokenId', response.data.token);
              AsyncStorage.setItem('refreshToken', response.data.refreshToken);
              AsyncStorage.setItem('First_Name', response.data.name);
              AsyncStorage.setItem('uid', response.data.uid);
              console.log('All data on login facebook ==>', response.data);
              console.log(
                'Refresh Token inside facebook ==> ',
                response.data.refreshToken,
              );
              alert('Login Success');
              checkAlreadyRegisteredService(response.data.token).then(res => {
                if (res.data == 'No data found') {
                  AsyncStorage.setItem('tokenkeyValue', keyToken);
                  navigation.navigate('Profile');
                } else if (res.data == 'User already registered') {
                  AsyncStorage.setItem('tokenkeyValue', keyToken);
                  navigation.navigate('DrawerNavigator');
                }
              });
            } else {
              alert('Login failed');
            }
          });
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const loginWithFacebook = () => {
    LoginManager.logOut();
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile']).then(
      login => {
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.contr}>
        <SliderBox
          style={styles.imgSlider}
          images={img01}
          autoplay={true}
          autoPlayWithInterval={500}
          circleLoop={true}
          inactiveDotColor={'transparent'}
        />
        {/* <Image source={require('../Assets/Images/Bed.png')} style={styles.imgBed} /> */}
        {/* <IndicatorViewPager
                    style={styles.imgSlider}
                    indicator={
                        <PagerDotIndicator pageCount={3} />
                    }>
                    <Image source={require('../Assets/Images/Bed.png')} />
                    <Image source={require('../Assets/Images/img01.jpg')} />
                    <Image source={require('../Assets/Images/Bed.png')} />
                </IndicatorViewPager> */}

        <TouchableOpacity
          style={styles.upperButton}
          onPress={() => navigation.navigate('SelectNumber', {itemId: 86})}
          //    onPress={() => navigation.navigate('DrawerNavigator', { itemId: 86 })}
          // onPress={() => navigation.navigate('SemiPrivateRoom', { itemId: 86 })}
        >
          <Text
            style={{
              fontSize: hp('2%'),
              fontWeight: 'bold',
              color: Colors.white,
            }}>
            Login with Mobile Number
          </Text>
        </TouchableOpacity>
        <View style={styles.lowerContr}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: hp('3%'),
              alignItems: 'center',
            }}>
            <View style={styles.line} />
            <Text> OR </Text>
            <View style={styles.line} />
          </View>

          <View style={styles.btnSet}>
            <TouchableOpacity onPress={signIn} style={styles.payment}>
              <Image
                source={require('../Assets/Images/Google.png')}
                style={{width: wp('8%'), height: hp('4%')}}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: Colors.black,
                  fontSize: hp('1.8%'),
                  marginLeft: wp('1.5%'),
                }}>
                Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.payment, {borderColor: Colors.blue}]}
              onPress={loginWithFacebook}>
              <Image
                source={require('../Assets/Images/Facebook.png')}
                style={{width: wp('8%'), height: hp('4%')}}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: Colors.black,
                  fontSize: hp('1.8%'),
                  marginLeft: wp('1.5%'),
                }}>
                Facebook
              </Text>
            </TouchableOpacity>
          </View>

          <CustomButton
            title={'CONTINUE'}
            bgColor={'#2581d4'}
            width={wp('85%')}
            height={hp('7%')}
            color={Colors.white}
            fontSize={hp('2.4%')}
            alignSelf={'center'}
            marginTop={hp('3%')}
            borderRadius={hp('1%')}
          />

          <View
            style={{
              height: hp('5%'),
              width: wp('100%'),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('TermsAndCondtions')}>
              <Text
                style={{
                  alignSelf: 'center',
                  paddingTop: hp('1%'),
                  color: Colors.blue,
                  textDecorationLine: 'underline',
                  fontSize: hp('1.5%'),
                }}>
                Terms&Condition{' '}
              </Text>
            </TouchableOpacity>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: Colors.black,
                  marginTop: hp('1%'),
                  fontSize: hp('1.5%'),
                }}>
                and
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('PrivacyPolicy')}>
              <Text
                style={{
                  alignSelf: 'center',
                  paddingTop: hp('1%'),
                  color: Colors.blue,
                  marginLeft: wp('1%'),
                  textDecorationLine: 'underline',
                  fontSize: hp('1.5%'),
                }}>
                Privacy Policy
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Login;

const styles = StyleSheet.create({
  contr: {
    width: wp('100%'),
    height: hp('100%'),
    //flex: 1
  },
  lowerContr: {
    width: wp('100%'),
    height: hp('46.5%'),
  },
  imgSlider: {
    width: wp('100%'),
    height: hp('50%'),
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: wp('25%'),
  },
  upperButton: {
    width: wp('80%'),
    height: hp('7%'),
    backgroundColor: '#2581d4',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('1%'),
    marginTop: -hp('3.5%'),
  },
  lowerButton: {
    width: wp('90%'),
    height: hp('7%'),
    backgroundColor: 'blue',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('2%'),
    marginTop: hp('5%'),
  },
  payment: {
    flexDirection: 'row',
    width: wp('38%'),
    height: hp('6.2%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: hp('1.5%'),
  },
  btnSet: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: wp('8%'),
    marginTop: hp('3%'),
  },
});
