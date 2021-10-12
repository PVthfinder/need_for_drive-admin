import {
    PAGINATION_SET_CURRENT_PAGE,
    PAGINATION_SET_COUNT_PAGES,
    PAGINATION_SET_NEXT_PAGE,
    PAGINATION_SET_PREV_PAGE,
} from '../../constants/actionConstants';

const initialState = {
    currentPage: 1,
    pagesCount: 1,
};

export const paginationReducer = (state = initialState, action) => {
    switch (action.type) {
    case PAGINATION_SET_CURRENT_PAGE:
        return {
            ...state,
            currentPage: action.payload,
        };

    case PAGINATION_SET_COUNT_PAGES:
        return {
            ...state,
            pagesCount: action.payload,
        };

    case PAGINATION_SET_NEXT_PAGE:
        return {
            ...state,
            currentPage:
                state.currentPage === state.pagesCount ? state.pagesCount : state.currentPage + 1,
        };

    case PAGINATION_SET_PREV_PAGE:
        return {
            ...state,
            currentPage:
                state.currentPage === 1 ? 1 : state.currentPage - 1,
        };

    default:
        return state;
    }
};
