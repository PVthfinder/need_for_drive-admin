import {
  POPUP_SET_POPUP,
  POPUP_UNSET_POPUP,
} from '../../constants/actionConstants';

const initialState = {
    isPopup: false,
    isSuccess: false,
    text: '',
};

export const popupReducer = (state = initialState, action) => {
    switch (action.type) {
      case POPUP_SET_POPUP:
        return {
          ...state,
          isPopup: true,
          isSuccess: action.payload.isSuccess,
          text: action.payload.text,
        };

      case POPUP_UNSET_POPUP:
        return initialState;

      default:
        return state;
    }
};
