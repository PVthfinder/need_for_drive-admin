import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Selector from '../layouts/Selector';
import Button from '../layouts/Button';
import Pagination from '../layouts/Pagination';
import OrderCard from './OrderCard';

import { getOrders, getStatuses } from '../../api';

import { ITEMS_PER_PAGE } from '../../constants/fetchConstants';
import { setOrders, setVisibleOrders } from '../../store/orders/actionCreators';
import { setRequestError } from '../../store/requestError/actionCreators';
import { setStatuses } from '../../store/statuses/actionCreators';

import { timeGradation } from '../../constants/commonConstants';

import './Orders.scss';

function Orders() {
    const {orders, visibleOrders} = useSelector((state) => state.orders);
    const {currentPage} = useSelector((state) => state.pagination);
    const {statuses} = useSelector((state) => state.statuses);
    const dispatch = useDispatch();

    useEffect(() => {
        getStatuses()
            .then((data) => dispatch(setStatuses(data.data)));
    }, []);

    useEffect(() => {
        getOrders()
            .then((data) => (data ? dispatch(setOrders(data.data)) : null))
            .catch((err) => {
                if (err.httpStatus) {
                    dispatch(setRequestError(err.httpStatus));
                }
            });
        getOrders(currentPage)
            .then((data) => (data ? dispatch(setVisibleOrders(data.data)) : null));
    }, [currentPage]);

    return (
        <>
            <header className="admin_content__header">Заказы</header>
            <article className="admin_content__main admin_article">
                <div className="admin_article__header">
                    <div className="admin_article__header_inputs">
                        <Selector
                            title="период"
                            selectorArr={timeGradation}
                        />
                        <Selector
                            title="статус"
                            selectorArr={statuses}
                        />
                        {/* <Selector/>
                        <Selector/> */}
                    </div>
                    <Button
                        type="button"
                        title=" Применить"
                        location="admin_article_header"
                    />
                </div>
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
