import {
    ENTITIES_SET_STATUSES,
    ENTITIES_SET_CARS,
    ENTITIES_SET_CITIES,
} from '../../constants/actionConstants';

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
