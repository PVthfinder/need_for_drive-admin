import {
    ENTITIES_SET_ORDERS,
    ENTITIES_SET_STATUSES,
    ENTITIES_SET_CARS,
    ENTITIES_SET_CITIES,
    ENTITIES_SET_POINTS,
    ENTITIES_SET_CATEGORIES,
    ENTITIES_SET_SINGLE_ENTITY,
    ENTITIES_SET_SINGLE_ENTITY_OPTION,
    ENTITIES_SET_SINGLE_ENTITY_ADDITIONAL_OPTION,
} from '../../constants/actionConstants';

export const setOrders = (ordersArr) => ({
    type: ENTITIES_SET_ORDERS,
    payload: ordersArr,
});

export const setStatuses = (statusesArr) => ({
    type: ENTITIES_SET_STATUSES,
    payload: statusesArr,
});

export const setCars = (carsArr) => ({
    type: ENTITIES_SET_CARS,
    payload: carsArr,
});

export const setCities = (citiesArr) => ({
    type: ENTITIES_SET_CITIES,
    payload: citiesArr,
});

export const setPoints = (pointsArr) => ({
    type: ENTITIES_SET_POINTS,
    payload: pointsArr,
});

export const setCategories = (categoriesArr) => ({
    type: ENTITIES_SET_CATEGORIES,
    payload: categoriesArr,
});

export const setSingleEntity = (entityObj) => ({
    type: ENTITIES_SET_SINGLE_ENTITY,
    payload: entityObj,
});

export const setSingleEntityOption = (entityVal, entityName) => ({
    type: ENTITIES_SET_SINGLE_ENTITY_OPTION,
    payload: {entityVal, entityName},
});

export const setSingleEntityAdditionalOption = (optionName) => ({
    type: ENTITIES_SET_SINGLE_ENTITY_ADDITIONAL_OPTION,
    payload: optionName,
});
