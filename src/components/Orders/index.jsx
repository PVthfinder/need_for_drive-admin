import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import OrdersFilters from './OrdersFilter';
import Pagination from '../layouts/Pagination';
import OrderCard from './OrderCard';
import Preloader from '../layouts/Preloader';

import { getOrders, getEntity } from '../../utils/apiUtils';

import { ITEMS_PER_PAGE, STATUSES_DB, CARS_DB, CITIES_DB } from '../../constants/fetchConstants';

import { setOrders, setVisibleOrders } from '../../store/orders/actionCreators';
import { setRequestError } from '../../store/requestError/actionCreators';
import { setStatuses, setCars, setCities } from '../../store/entities/actionCreators';

import './Orders.scss';

function Orders() {
    const {orders, visibleOrders} = useSelector((state) => state.orders);
    const {currentPage} = useSelector((state) => state.pagination);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        getEntity(CARS_DB)
            .then((data) => dispatch(setCars(data.data)));
        getEntity(STATUSES_DB)
            .then((data) => dispatch(setStatuses(data.data)));
        getEntity(CITIES_DB)
            .then((data) => dispatch(setCities(data.data)));
    }, []);

    useEffect(() => {
        getOrders(location.search)
            .then((data) => (data ? dispatch(setOrders(data.data)) : []))
            .catch((err) => {
                if (err.httpStatus) {
                    dispatch(setRequestError(err.httpStatus));
                }
            });

        getOrders(location.search, 1)
        .then((data) => (data ? dispatch(setVisibleOrders(data.data)) : []));

        return (() => {
            dispatch(setOrders(null));
            dispatch(setVisibleOrders(null));
        });
    }, [location.search]);

    useEffect(() => {
        getOrders(location.search, currentPage)
            .then((data) => (data ? dispatch(setVisibleOrders(data.data)) : []));

            return (() => dispatch(setVisibleOrders(null)));
    }, [currentPage]);

    return (
        <>
            <header className="admin_content__header">Заказы</header>
            <article className="admin_content__main admin_article">
                <div className="admin_article__header">
                    <OrdersFilters/>
                </div>
                {
                    orders && visibleOrders
                    ? (
                        <div className="admin_article__main">
                            {
                                visibleOrders.length
                                ? visibleOrders.map((item) => (
                                    <OrderCard
                                        key={item.id}
                                        order={item}
                                    />
                                ))
                                : 'Нет заказов, удовлетворяющих условиям фильтров'
                            }
                        </div>
                    )
                    : <Preloader/>
                }
                <div className="admin_article__footer">
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={ITEMS_PER_PAGE}
                        length={orders && orders.length}
                    />
                </div>
            </article>
        </>
    );
}

export default Orders;
