import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  checkAlreadyRegisteredService,
  refreshTokenService,
} from '../Services/auth';

const getValueFunction = async () => {
  // Function to get the value from AsyncStorage
  try {
    let token = await AsyncStorage.getItem('tokenId');
    let refresh = await AsyncStorage.getItem('refreshToken');
    let uuid = await AsyncStorage.getItem('uid');
    if (token && refresh && uuid) {
      return {
        tokenId: token,
        refreshToken: refresh,
        uid: uuid,
      };
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const refreshTokenAction = () => {
  getValueFunction().then(response => {
    if (response) {
      checkAlreadyRegisteredService(response.token).then(res => {
        if (!res.success) {
          console.log('Api failed to hit: Initiating Refresh Token');
          refreshTokenService({
            refreshToken: response.refreshToken,
            uid: response.uid,
          }).then(result => {
            console.log('Response for refresh Token ==>', result.data);
            AsyncStorage.removeItem('tokenId');
            AsyncStorage.removeItem('refreshToken');
            AsyncStorage.setItem('tokenId', result.data.token);
            AsyncStorage.setItem('refreshToken', result.data.refreshToken);
          });
        }
      });
    } else {
      console.log(response);
    }
  });
};
