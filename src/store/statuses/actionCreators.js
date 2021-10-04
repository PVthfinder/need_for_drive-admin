import {
    STATUSES_SET_STATUSES,
} from '../../constants/actionConstants';

export const setStatuses = (statusesArr) => ({
    type: STATUSES_SET_STATUSES,
    payload: statusesArr,
});
