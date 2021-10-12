import {
    PAGINATION_SET_CURRENT_PAGE,
    PAGINATION_SET_COUNT_PAGES,
    PAGINATION_SET_NEXT_PAGE,
    PAGINATION_SET_PREV_PAGE,
} from '../../constants/actionConstants';

export const setCountPages = (count) => ({
    type: PAGINATION_SET_COUNT_PAGES,
    payload: count,
});

export const setCurrentPage = (pageNumber) => ({
    type: PAGINATION_SET_CURRENT_PAGE,
    payload: pageNumber,
});

export const setNextPage = () => ({
    type: PAGINATION_SET_NEXT_PAGE,
});

export const setPrevPage = () => ({
    type: PAGINATION_SET_PREV_PAGE,
});
