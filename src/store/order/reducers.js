import {
    ORDER_SET_ORDER,
    ORDER_SET_ADDITIONAL_OPTION,
    ORDER_SET_OPTION,
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

        case ORDER_SET_OPTION:
            const option = {};
            Object.keys(state.order).forEach((key) => {
                if (key === action.payload.entityName) {
                    option[action.payload.entityName] = action.payload.entityObj;
                }
            });

            return {
                ...state,
                order: {
                    ...state.order,
                    ...option,
                },
            };

        case ORDER_SET_ADDITIONAL_OPTION:
            const addOption = {};
            Object.keys(state.order).forEach((key) => {
                if (key === action.payload) {
                    addOption[action.payload] = !state.order[key];
                }
            });

            return {
                ...state,
                order: {
                    ...state.order,
                    ...addOption,
                },
            };

        default:
            return state;
    }
};
