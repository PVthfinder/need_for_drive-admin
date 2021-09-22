import {
    LOGIN_CHANGE_EMAIL_TEXT,
    LOGIN_CHANGE_PASSWORD_TEXT,
    LOGIN_SET_EMAIL_ERROR,
    LOGIN_SET_PASSWORD_ERROR,
    LOGIN_SET_IS_NO_REGISTER,
    LOGIN_SET_IS_AUTH_ERROR,
} from '../../constants/actionConstants';

const initialState = {
    email: {
      emailValue: '',
      isEmailError: false,
    },
    password: {
      passwordValue: '',
      isPasswordError: false,
    },
    isNoRegister: false,
    isAuthError: false,
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_CHANGE_EMAIL_TEXT:
        return {
          ...state,
          email: {
            ...state.email,
            emailValue: action.payload,
          },
        };

      case LOGIN_SET_EMAIL_ERROR:
        return {
          ...state,
          email: {
            ...state.email,
            isEmailError: action.payload,
          },
        };

      case LOGIN_CHANGE_PASSWORD_TEXT:
        return {
          ...state,
          password: {
            ...state.password,
            passwordValue: action.payload,
          },
        };

      case LOGIN_SET_PASSWORD_ERROR:
        return {
          ...state,
          password: {
            ...state.password,
            isPasswordError: action.payload,
          },
        };

      case LOGIN_SET_IS_NO_REGISTER:
        return {
          ...state,
          isNoRegister: action.payload,
        };

      case LOGIN_SET_IS_AUTH_ERROR:
        return {
          ...state,
          isAuthError: action.payload,
        };

      default:
        return state;
    }
};
