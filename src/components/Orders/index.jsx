import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Selector from '../layouts/Selector';
import Button from '../layouts/Button';
import Pagination from '../layouts/Pagination';
import OrderCard from './OrderCard';
import Preloader from '../layouts/Preloader';

import { getOrders, getEntity } from '../../api';

import { ITEMS_PER_PAGE, STATUSES_DB, CARS_DB, CITIES_DB } from '../../constants/fetchConstants';

import { setOrders, setVisibleOrders } from '../../store/orders/actionCreators';
import { setRequestError } from '../../store/requestError/actionCreators';
import { setStatuses, setCars, setCities } from '../../store/entities/actionCreators';

import { TIME_GRADATION } from '../../constants/commonConstants';

import './Orders.scss';

function Orders() {
    const {orders, visibleOrders} = useSelector((state) => state.orders);
    const {currentPage} = useSelector((state) => state.pagination);
    const {statuses, cars, cities} = useSelector((state) => state.entities);
    const dispatch = useDispatch();

    useEffect(() => {
        getEntity(CARS_DB)
            .then((data) => dispatch(setCars(data.data)));
        getEntity(STATUSES_DB)
            .then((data) => dispatch(setStatuses(data.data)));
        getEntity(CITIES_DB)
            .then((data) => dispatch(setCities(data.data)));
        getOrders()
            .then((data) => (data ? dispatch(setOrders(data.data)) : null))
            .catch((err) => {
                if (err.httpStatus) {
                    dispatch(setRequestError(err.httpStatus));
                }
            });
    }, []);

    useEffect(() => {
        getOrders(currentPage)
            .then((data) => (data ? dispatch(setVisibleOrders(data.data)) : null));
    }, [currentPage]);

    return (
        <>
            <header className="admin_content__header">Заказы</header>
            <article className="admin_content__main admin_article">
                <div className="admin_article__header">
                    <div className="admin_article__filters">
                        <Selector
                            title="период"
                            selectorArr={TIME_GRADATION}
                        />
                        <Selector
                            title="статус"
                            selectorArr={statuses}
                        />
                        <Selector
                            title="модель машины"
                            selectorArr={cars}
                        />
                        <Selector
                            title="город"
                            selectorArr={cities}
                        />
                    </div>
                    <Button
                        type="button"
                        title=" Применить"
                        location="admin_article_header"
                    />
                </div>
                {
                    orders.length
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
                        length={orders.length}
                    />
                </div>
            </article>
        </>
    );
}

export default Orders;
