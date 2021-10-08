import {
    ORDER_SET_ORDER,
    ORDER_SET_ADDITIONAL_OPTION,
    ORDER_SET_OPTION,
} from '../../constants/actionConstants';

export const setOrder = (orderObj) => ({
    type: ORDER_SET_ORDER,
    payload: orderObj,
});

export const setOrderOption = (entityObj, entityName) => ({
    type: ORDER_SET_OPTION,
    payload: {entityObj, entityName},
});

export const setOrderAdditionalOption = (optionName) => ({
    type: ORDER_SET_ADDITIONAL_OPTION,
    payload: optionName,
});
