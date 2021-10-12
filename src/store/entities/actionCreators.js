import {
    ENTITIES_SET_STATUSES,
    ENTITIES_SET_CARS,
    ENTITIES_SET_CITIES,
    ENTITIES_SET_POINTS,
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

export const setPoints = (pointsArr) => ({
    type: ENTITIES_SET_POINTS,
    payload: pointsArr,
});
