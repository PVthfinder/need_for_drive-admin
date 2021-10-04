import {
    STATUSES_SET_STATUSES,
} from '../../constants/actionConstants';

const initialState = {
    statuses: [],
};

export const statusesReducer = (state = initialState, action) => {
    switch (action.type) {
        case STATUSES_SET_STATUSES:
            return {
                ...state,
                statuses: action.payload,
            };

        default:
            return state;
    }
};
