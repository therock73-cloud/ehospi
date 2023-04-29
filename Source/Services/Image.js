import axios from 'axios';
import {baseurl} from '../Config/baseurl';
const apiURL = baseurl;
import AsyncStorage from '@react-native-async-storage/async-storage';
export const getHospitalImagesService = async hCode => {
  const token = await AsyncStorage.getItem('tokenId');

  try {
    let URL = apiURL + 'user/getHospitalImage/' + hCode;
    console.log('API URL endpoint = ', URL);
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
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
