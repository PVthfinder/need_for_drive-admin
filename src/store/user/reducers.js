import {
    USER_LOGIN,
    USER_CHECK,
    USER_LOGOUT,
} from '../../constants/actionConstants';

const initialState = {
    isLogged: false,
    name: '',
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                isLogged: true,
            };

        case USER_CHECK:
            return {
                ...state,
                isLogged: true,
                name: action.payload,
            };

        case USER_LOGOUT:
            return {
                ...state,
                isLogged: false,
                name: '',
            };

      default:
        return state;
    }
};
