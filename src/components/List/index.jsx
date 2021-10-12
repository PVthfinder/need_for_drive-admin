import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import Pagination from '../layouts/Pagination';
import Preloader from '../layouts/Preloader';
import ListCard from './ListCard';

import { getEntityList } from '../../utils/apiUtils';

import { ITEMS_PER_PAGE, ORDERS_DB, CARS_DB, CATEGORIES_DB, POINTS_DB } from '../../constants/fetchConstants';

import './List.scss';

function List({
    title,
    preloaderCondition,
    entityDb,
    allItemsArr,
    listName,
    cardName,
    filterComponent,
}) {
    const {currentPage} = useSelector((state) => state.pagination);
    const location = useLocation();
    const [visibleList, setVisibleList] = useState(null);

    useEffect(() => {
        getEntityList(entityDb, location.search, 1)
            .then((data) => (data ? setVisibleList(data.data) : []));

        return (() => setVisibleList(null));
    }, [location.search]);

    useEffect(() => {
        getEntityList(entityDb, location.search, currentPage)
            .then((data) => (data ? setVisibleList(data.data) : []));

            return (() => setVisibleList(null));
    }, [currentPage]);

    return (
        <>
            <header className="admin_content__header">{title}</header>
            <article className="admin_content__main admin_article">
                <div className="admin_article__header">
                    {filterComponent}
                </div>
                {
                    (listName !== ORDERS_DB && listName !== CARS_DB)
                    && (
                        <div className="admin_article__titles">
                            <span className="simple_list_item">Название</span>
                            {
                                listName === POINTS_DB
                                && (
                                    <>
                                        <span className="simple_list_item">Город</span>
                                        <span className="simple_list_item">Адрес</span>
                                    </>
                                )
                            }
                            {
                                listName === CATEGORIES_DB
                                && <span className="simple_list_item">Описание</span>
                            }
                        </div>
                    )
                }
                {
                    preloaderCondition && visibleList
                    ? (
                        <div className="admin_article__main">
                            {
                                visibleList.length
                                ? visibleList.map((item) => (
                                    <ListCard
                                        key={item.id}
                                        listName={listName}
                                        cardName={cardName}
                                        itemObj={item}
                                    />
                                )) : 'Нет позиций, удовлетворяющих условиям фильтров'
                            }
                        </div>
                    ) : <Preloader/>
                }
                <div className="admin_article__footer">
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={ITEMS_PER_PAGE}
                        length={allItemsArr && allItemsArr.length}
                    />
                </div>
            </article>
        </>
    );
}

List.propTypes = {
    title: PropTypes.string,
    preloaderCondition: PropTypes.bool,
    entityDb: PropTypes.string,
    allItemsArr: PropTypes.arrayOf(PropTypes.any),
    listName: PropTypes.string,
    cardName: PropTypes.string,
    filterComponent: PropTypes.func,
};

List.defaultProps = {
    title: '',
    preloaderCondition: false,
    entityDb: '',
    allItemsArr: null,
    listName: '',
    cardName: '',
    filterComponent: null,
};

export default List;
