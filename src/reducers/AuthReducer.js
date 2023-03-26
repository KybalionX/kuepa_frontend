import { LOCALSTORAGE_USER_TOKEN, AUTH_REDUCER_LOGIN, AUTH_REDUCER_LOGOUT } from '../utils/constants.utils';

export const initialState = {
  isLogged: false,
  token: null,
  userData: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case AUTH_REDUCER_LOGIN:
      window.localStorage.setItem(LOCALSTORAGE_USER_TOKEN, action.payload.token);
      return {
        isLogged: true,
        token: action.payload.token,
        userData: action.payload.userData
      };
    case AUTH_REDUCER_LOGOUT:
      window.localStorage.removeItem(LOCALSTORAGE_USER_TOKEN);
      return initialState;
    default:
      throw new Error(`ACTION ${action.type} IS NOT ALLOWED IN AUTH REDUCER`);
  }
};
