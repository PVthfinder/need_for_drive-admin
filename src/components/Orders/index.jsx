import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import OrdersFilters from './OrdersFilter';
import List from '../List';

import { getEntityList } from '../../utils/apiUtils';

import { ORDERS_DB, STATUSES_DB, CARS_DB, CITIES_DB } from '../../constants/fetchConstants';

import { setRequestError } from '../../store/requestError/actionCreators';
import { setOrders, setStatuses, setCars, setCities } from '../../store/entities/actionCreators';

function Orders() {
    const {orders, cars, cities, statuses} = useSelector((state) => state.entities);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        getEntityList(CARS_DB)
            .then((data) => (data ? dispatch(setCars(data.data)) : []));
        getEntityList(STATUSES_DB)
            .then((data) => (data ? dispatch(setStatuses(data.data)) : []));
        getEntityList(CITIES_DB)
            .then((data) => (data ? dispatch(setCities(data.data)) : []));
    }, []);

    useEffect(() => {
        getEntityList(ORDERS_DB, location.search)
            .then((data) => (data ? dispatch(setOrders(data.data)) : []))
            .catch((err) => {
                if (err.httpStatus) {
                    dispatch(setRequestError(err.httpStatus));
                }
            });

        return (() => {
            dispatch(setOrders(null));
        });
    }, [location.search]);

    const filterComponent = <OrdersFilters/>;

    return (
        <List
            title="Заказы"
            preloaderCondition={orders && statuses && cars && cities}
            entityDb={ORDERS_DB}
            allItemsArr={orders}
            listName={ORDERS_DB}
            cardName="order"
            filterComponent={filterComponent}
        />
    );
}

export default Orders;
