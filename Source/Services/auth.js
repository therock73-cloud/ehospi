import axios from 'axios';
import {baseurl} from '../Config/baseurl';
let apiURL = baseurl;
import AsyncStorage from '@react-native-async-storage/async-storage';
export const loginWithFacebookService = async data => {
  try {
    console.log('Inside login service data = ', data);

    let URL = apiURL + 'user/facebook';
    console.log('API URL endpoint = ', URL);
    let res = await axios.post(URL, data);
    const finalResponse = {success: true, data: res.data};
    return finalResponse;
  } catch (e) {
    return {
      success: false,
      data: {},
      message: e,
    };
  }
};
export const refreshTokenService = async data => {
  try {
    console.log('Inside RefreshToken service data = ', data);
    let URL = apiURL + 'user/refreshToken';
    console.log('API URL endpoint = ', URL);
    let res = await axios.post(URL, data);
    const finalResponse = {success: true, data: res.data};
    return finalResponse;
  } catch (e) {
    return {
      success: false,
      data: {},
      message: e,
    };
  }
};

export const checkAlreadyRegisteredService = async data => {
  try {
    console.log('Inside login service data = ', data);

    let URL = apiURL + 'user/alreadyRegistered';
    console.log('API URL endpoint = ', URL);
    let config = {
      headers: {Authorization: `Bearer ${data}`},
    };
    let res = await axios.get(URL, config);
    const finalResponse = {success: true, data: res.data.message};
    return finalResponse;
  } catch (e) {
    return {
      success: false,
      data: {},
      message: e,
    };
  }
};

export const Getnationalitydata = async () => {
  const token = await AsyncStorage.getItem('tokenId');
  try {
    let URL = apiURL + 'user/getNationality';

    let config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    let res = await axios.get(URL, config);
    const finalResponse = {success: true, data: res.data};
    return finalResponse;
  } catch (e) {
    return {
      success: false,
      data: {},
      message: e,
    };
  }
};
export const Getgenderdata = async () => {
  const token = await AsyncStorage.getItem('tokenId');
  try {
    let URL = apiURL + 'user/getGender';

    let config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    let res = await axios.get(URL, config);
    const finalResponse = {success: true, data: res.data};
    return finalResponse;
  } catch (e) {
    return {
      success: false,
      data: {},
      message: e,
    };
  }
};
export const Getreligiondata = async () => {
  const token = await AsyncStorage.getItem('tokenId');
  try {
    let URL = apiURL + 'user/getReligion';

    let config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    let res = await axios.get(URL, config);
    const finalResponse = {success: true, data: res.data};
    return finalResponse;
  } catch (e) {
    return {
      success: false,
      data: {},
      message: e,
    };
  }
};
export const Getrelationdata = async () => {
  const token = await AsyncStorage.getItem('tokenId');
  try {
    let URL = apiURL + 'user/getRelation';

    let config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    let res = await axios.get(URL, config);
    const finalResponse = {success: true, data: res.data};
    return finalResponse;
  } catch (e) {
    return {
      success: false,
      data: {},
      message: e,
    };
  }
};
