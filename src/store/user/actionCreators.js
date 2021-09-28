import {
    USER_LOGIN,
    USER_CHECK,
    USER_LOGOUT,
} from '../../constants/actionConstants';

export const userLogin = () => ({
    type: USER_LOGIN,
});

export const userCheck = (userName) => ({
    type: USER_CHECK,
    payload: userName,
});

export const userLogout = () => ({
    type: USER_LOGOUT,
});
