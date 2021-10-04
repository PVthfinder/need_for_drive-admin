import {
    REQUEST_ERROR_SET_ERROR,
    REQUEST_ERROR_UNSET_ERROR,
} from '../../constants/actionConstants';

const initialState = {
    isError: false,
    errorStatus: '',
};

export const requestErrorReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_ERROR_SET_ERROR:
            return {
                ...state,
                isError: true,
                errorStatus: action.payload,
            };

        case REQUEST_ERROR_UNSET_ERROR:
            return {
                ...state,
                isError: false,
                errorStatus: '',
            };

        default:
            return state;
    }
};
