import {
    POPUP_SET_POPUP,
    POPUP_UNSET_POPUP,
} from '../../constants/actionConstants';

export const setPopup = (isSuccess, text) => ({
    type: POPUP_SET_POPUP,
    payload: {isSuccess, text},
});

export const unsetPopup = () => ({
    type: POPUP_UNSET_POPUP,
});
