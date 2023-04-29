import {LOGIN_WITH_FACEBOOK, LOGOUT, UPDATE_TOKEN, GET_IMAGE} from '../types';

const authInitialState = {
  userData: {},
  withFacebook: false,
  refreshToken: '',
  accessToken: '',
  isLoggedIn: false,
  image: '',
  name: '',
};

const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case LOGIN_WITH_FACEBOOK:
      return {
        ...state,
        isLoggedIn: true,
        accessToken: action.payload.token,
        refreshToken: action.payload.refreshToken,
        userData: action.payload,
        withFacebook: true,
      };

    case UPDATE_TOKEN:
      return {
        ...state,
        accessToken: action.payload.token,
        refreshToken: action.payload.refreshToken,
      };
    case GET_IMAGE:
      return {
        ...state,
        image: action.payload.image,
        name: action.payload.name,
      };
    case LOGOUT:
      return authInitialState;

    default:
      return state;
  }
};

export default authReducer;
