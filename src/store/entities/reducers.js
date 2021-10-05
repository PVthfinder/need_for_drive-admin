import {
    ENTITIES_SET_STATUSES,
    ENTITIES_SET_CARS,
    ENTITIES_SET_CITIES,
} from '../../constants/actionConstants';

const initialState = {
    statuses: [],
    cars: [],
    cities: [],
};

export const entitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ENTITIES_SET_STATUSES:
            return {
                ...state,
                statuses: action.payload,
            };

        case ENTITIES_SET_CARS:
            return {
                ...state,
                cars: action.payload,
            };

        case ENTITIES_SET_CITIES:
            return {
                ...state,
                cities: action.payload,
            };

        default:
            return state;
    }
};
