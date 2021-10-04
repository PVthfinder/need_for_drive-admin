import {
    ORDER_SET_ORDER,
    ORDER_SET_ADDITIONAL_OPTION,
    ORDER_SET_STATUS,
} from '../../constants/actionConstants';

export const setOrder = (orderObj) => ({
    type: ORDER_SET_ORDER,
    payload: orderObj,
});

export const setOrderAdditionalOption = (optionName) => ({
    type: ORDER_SET_ADDITIONAL_OPTION,
    payload: optionName,
});

export const setOrderStatus = (status) => ({
    type: ORDER_SET_STATUS,
    payload: status,
});
