import {
    LOGIN_CHANGE_EMAIL_TEXT,
    LOGIN_CHANGE_PASSWORD_TEXT,
    LOGIN_SET_EMAIL_ERROR,
    LOGIN_SET_PASSWORD_ERROR,
    LOGIN_SET_IS_NO_REGISTER,
    LOGIN_SET_IS_AUTH_ERROR,
} from '../../constants/actionConstants';

export const setEmailText = (email) => ({
    type: LOGIN_CHANGE_EMAIL_TEXT,
    payload: email,
});

export const setPasswordText = (password) => ({
    type: LOGIN_CHANGE_PASSWORD_TEXT,
    payload: password,
});

export const setEmailError = (isError) => ({
    type: LOGIN_SET_EMAIL_ERROR,
    payload: isError,
});

export const setPasswordError = (isError) => ({
    type: LOGIN_SET_PASSWORD_ERROR,
    payload: isError,
});

export const setIsNoRegister = (isNoRegister) => ({
    type: LOGIN_SET_IS_NO_REGISTER,
    payload: isNoRegister,
});

export const setIsAuthError = (isAuthError) => ({
    type: LOGIN_SET_IS_AUTH_ERROR,
    payload: isAuthError,
});
