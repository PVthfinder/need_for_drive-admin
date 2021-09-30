import {
    REQUEST_ERROR_SET_ERROR,
    REQUEST_ERROR_UNSET_ERROR,
} from '../../constants/actionConstants';

export const setRequestError = (errorStatus) => ({
    type: REQUEST_ERROR_SET_ERROR,
    payload: errorStatus,
});

export const unsetRequestError = () => ({
    type: REQUEST_ERROR_UNSET_ERROR,
});
