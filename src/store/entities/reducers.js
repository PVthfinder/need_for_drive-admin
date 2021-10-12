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

const initialState = {
    orders: null,
    statuses: null,
    cars: null,
    cities: null,
    points: null,
    categories: null,
    singleEntity: null,
};

export const entitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ENTITIES_SET_ORDERS:
            return {
                ...state,
                orders: action.payload,
            };

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

        case ENTITIES_SET_POINTS:
            return {
                ...state,
                points: action.payload,
            };

        case ENTITIES_SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };

        case ENTITIES_SET_SINGLE_ENTITY:
            return {
                ...state,
                singleEntity: action.payload,
            };

        case ENTITIES_SET_SINGLE_ENTITY_OPTION:
            const option = state.singleEntity;
            option[action.payload.entityName] = action.payload.entityVal;

            return {
                ...state,
                singleEntity: {
                    ...state.singleEntity,
                    ...option,
                },
            };

        case ENTITIES_SET_SINGLE_ENTITY_ADDITIONAL_OPTION:
            const addOption = {};
            Object.keys(state.singleEntity).forEach((key) => {
                if (key === action.payload) {
                    addOption[action.payload] = !state.singleEntity[key];
                }
            });

            return {
                ...state,
                singleEntity: {
                    ...state.singleEntity,
                    ...addOption,
                },
            };

        default:
            return state;
    }
};
