import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {baseurl} from '../Config/baseurl';
// import {refreshTokenAction} from '../utils/refreshToken';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
import {useIsFocused} from '@react-navigation/native';
import {getImage} from '../Redux/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {refreshTokenService} from '../Services/auth';
import {useDispatch} from 'react-redux';
import {updateToken} from '../Redux/actions';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();

  // const [tokenId, setTokenId] = useState('');
  const [animating, setAnimating] = useState('');
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   const backAction = () => {
  //     console.log('You can not go Back');

  //     return true;
  //   };
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );
  //   return () => backHandler.remove();
  // }, []);
  const [tokenId, setTokenId] = useState('');

  const [uid, setUid] = useState('');
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
    const refreshToken = AsyncStorage.getItem('refreshToken');
    const uid = AsyncStorage.getItem('uid');

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
      navigation.navigate('DrawerNavigator');
    });
  };
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('tokenkeyValue').then(ky => {
        if (ky) {
          // updateRefreshToken();
          navigation.navigate('DrawerNavigator');
        } else {
           navigation.navigate('Login');
          // navigation.navigate('SelectNumber');
        }
      });
    }, 2000);
  }, []);
  // useEffect(() => {
  //   navigation.navigate('HomePag\e');
  // }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={{
            width: wp('100%'),
            height: hp('88%'),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../Assets/Images/eHospi.png')}
            style={{
              justifyContent: 'space-between',
              width: wp('55%'),
              height: hp('30%'),
            }}
          />
        </View>
        <View
          style={{
            width: wp('100%'),
            height: hp('8%'),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../Assets/Images/india.png')}
            style={{width: wp('5%'), height: wp('5%')}}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: hp('2%'),
              marginLeft: wp('1%'),
            }}>
            Made in India
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
  },
  midContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  logo: {
    height: hp('12%'),
    width: hp('12%'),
  },
  logoCntnr: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  yellowTxt: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: Colors.lightYellow,
  },
  blackTxt: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: Colors.black,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
