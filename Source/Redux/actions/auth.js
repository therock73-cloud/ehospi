import {LOGIN_WITH_FACEBOOK, LOGOUT, UPDATE_TOKEN, GET_IMAGE} from '../types';

export const loginWithFacebookAction = payload => ({
  type: LOGIN_WITH_FACEBOOK,
  payload,
});
export const updateToken = payload => ({
  type: UPDATE_TOKEN,
  payload,
});

export const getImage = payload => ({
  type: GET_IMAGE,
  payload,
});

export const logout = payload => ({
  type: LOGOUT,
  payload,
});
