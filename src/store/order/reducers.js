import {
    ORDER_SET_ORDER,
    ORDER_SET_ADDITIONAL_OPTION,
    ORDER_SET_STATUS,
} from '../../constants/actionConstants';

const initialState = {
    order: {},
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_SET_ORDER:
            return {
                ...state,
                order: action.payload,
            };

        case ORDER_SET_ADDITIONAL_OPTION:
            const option = {};
            Object.keys(state.order).forEach((key) => {
                if (key === action.payload) {
                    option[action.payload] = !state.order[key];
                }
            });

            return {
                ...state,
                order: {
                    ...state.order,
                    ...option,
                },
            };

        case ORDER_SET_STATUS:
            return {
                ...state,
                order: {
                    ...state.order,
                    orderStatusId: action.payload,
                },
            };

        default:
            return state;
    }
};
