import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { setCountPages, setCurrentPage, setNextPage, setPrevPage } from '../../../store/pagination/actionCreators';

import './Pagination.scss';

function Pagination({
    currentPage,
    itemsPerPage,
    length,
}) {
    const {pagesCount} = useSelector((state) => state.pagination);
    const dispatch = useDispatch();

    const handlePageClick = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
    };

    const handlePrevClick = () => {
        dispatch(setPrevPage());
    };

    const handleNextClick = () => {
        dispatch(setNextPage());
    };

    useEffect(() => {
        const newPagesCount = Math.ceil(length / itemsPerPage);
        dispatch(setCountPages(newPagesCount));

        return (() => dispatch(setCurrentPage(1)));
    }, [length]);

    const currentPageClasses = classNames(
        'current_page',
        {'current_page--hundreds': currentPage > 99},
    );

    return (pagesCount > 0
        && (
            <div className="pagination">
                <button type="button" onClick={() => handlePrevClick()}>&#171;</button>

                {currentPage !== 1 && (<button type="button" onClick={() => handlePageClick(1)}>1</button>)}

                {currentPage > 3 && (<span>...</span>)}

                {currentPage > 2 && (<button type="button" onClick={() => handlePageClick(currentPage - 1)}>{currentPage - 1}</button>)}

                <span className={currentPageClasses}>{currentPage}</span>

                {currentPage < pagesCount - 1 && (<button type="button" onClick={() => handlePageClick(currentPage + 1)}>{currentPage + 1}</button>)}

                {currentPage < pagesCount - 2 && (<span>...</span>)}

                {currentPage !== pagesCount && (<button type="button" onClick={() => handlePageClick(pagesCount)}>{pagesCount}</button>)}

                <button type="button" onClick={() => handleNextClick()}>&#187;</button>
            </div>
        )
    );
}

Pagination.propTypes = {
    currentPage: PropTypes.number,
    itemsPerPage: PropTypes.number,
    length: PropTypes.number,
};

Pagination.defaultProps = {
    currentPage: 0,
    itemsPerPage: 0,
    length: 0,
};

export default Pagination;
