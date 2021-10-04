import {
    ORDERS_SET_ORDERS,
    ORDERS_SET_VISIBLE_ORDERS,
} from '../../constants/actionConstants';

export const setOrders = (ordersArr) => ({
    type: ORDERS_SET_ORDERS,
    payload: ordersArr,
});

export const setVisibleOrders = (ordersArr) => ({
    type: ORDERS_SET_VISIBLE_ORDERS,
    payload: ordersArr,
});
