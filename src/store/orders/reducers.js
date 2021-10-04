import {
    ORDERS_SET_ORDERS,
    ORDERS_SET_VISIBLE_ORDERS,
} from '../../constants/actionConstants';

const initialState = {
    orders: [],
    visibleOrders: [],
};

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDERS_SET_ORDERS:
            return {
                ...state,
                orders: action.payload,
            };

        case ORDERS_SET_VISIBLE_ORDERS:
            return {
                ...state,
                visibleOrders: action.payload,
            };

        default:
            return state;
    }
};
