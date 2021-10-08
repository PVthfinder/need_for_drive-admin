import React, {useState, useEffect} from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import Selector from '../layouts/Selector';
import Checkbox from '../layouts/Checkbox';
import Button from '../layouts/Button';
import Preloader from '../layouts/Preloader';

import {
    setOrder,
    setOrderAdditionalOption,
    setOrderOption,
} from '../../store/order/actionCreators';
import { setStatuses, setCars, setCities, setPoints } from '../../store/entities/actionCreators';
import { setPopup } from '../../store/popup/actionCreators';

import { getSingleOrder, getEntity, changeOrder, deleteOrder } from '../../utils/apiUtils';
import { STATUSES_DB, CARS_DB, CITIES_DB, POINTS_DB } from '../../constants/fetchConstants';

import './OrderItem.scss';

function OrderItem() {
    const [isRedirect, setIsRedirect] = useState(false);

    const {order} = useSelector((state) => state.order);
    const {cars, cities, statuses, points} = useSelector((state) => state.entities);
    const dispatch = useDispatch();
    const id = useParams();

    useEffect(() => {
        getSingleOrder(id.id).then((data) => (data ? dispatch(setOrder(data.data)) : []));
    }, [id]);

    useEffect(() => {
        getEntity(STATUSES_DB)
            .then((data) => (data ? dispatch(setStatuses(data.data)) : []));
        getEntity(CARS_DB)
            .then((data) => (data ? dispatch(setCars(data.data)) : []));
        getEntity(CITIES_DB)
            .then((data) => (data ? dispatch(setCities(data.data)) : []));
    }, []);

    useEffect(() => {
        getEntity(POINTS_DB, order.cityId ? `cityId=${order.cityId.id}` : null)
            .then((data) => (data ? dispatch(setPoints(data.data)) : []));
    }, [order.cityId]);

    const handleEntityChange = (entityObj, entityName) => {
        dispatch(setOrderOption(entityObj, entityName));
    };

    const handleCheckboxChange = (optionName) => {
        dispatch(setOrderAdditionalOption(optionName));
    };

    const handleCancelChanges = () => {
        getSingleOrder(id.id).then((data) => dispatch(setOrder(data.data)));
    };

    const handleSaveChanges = () => {
        changeOrder(order)
            .then(() => dispatch(setPopup(true, 'Успех! Заказ изменен')))
            .catch((err) => dispatch(setPopup(false, `Ошибка! ${err.httpText}`)))
            .finally(() => setIsRedirect(true));
    };

    const handleDeleteOrder = () => {
        deleteOrder(id.id)
            .then(() => dispatch(setPopup(true, 'Успех! Заказ успешно удален')))
            .catch((err) => dispatch(setPopup(false, `Ошибка! ${err.httpText}`)))
            .finally(() => setIsRedirect(true));
    };

    if (isRedirect) {
        return <Redirect to="/admin/orders"/>;
    }

    const optionsAlert = classNames(
        'order_item__options_alert',
        {active: !(order.carId && order.cityId && order.pointId && order.orderStatusId)},
    );

    return (
        <>
            <header className="admin_content__header">Редактирование заказа</header>
            <article className="admin_content__main admin_article">
                {
                    order
                    && statuses
                    && cars
                    && cities
                    && points
                    ? (
                        <div className="admin_article__main">
                            <div className="order_item__options">
                                <Selector
                                    title="модель"
                                    entityName="carId"
                                    chosenItem={order.carId && order.carId.name}
                                    setChosen={handleEntityChange}
                                    selectorArr={cars}
                                    isError={!order.carId}
                                />
                                <Selector
                                    title="город"
                                    entityName="cityId"
                                    chosenItem={order.cityId && order.cityId.name}
                                    setChosen={handleEntityChange}
                                    selectorArr={cities}
                                    isError={!order.cityId}
                                />
                                <Selector
                                    title="пункт выдачи"
                                    entityName="pointId"
                                    chosenItem={order.pointId && order.pointId.name}
                                    setChosen={handleEntityChange}
                                    selectorArr={points}
                                    isError={!order.pointId}
                                />
                                <Selector
                                    title="статус"
                                    entityName="orderStatusId"
                                    chosenItem={order.orderStatusId && order.orderStatusId.name}
                                    setChosen={handleEntityChange}
                                    selectorArr={statuses}
                                    isError={!order.orderStatusId}
                                />

                                <div className={optionsAlert}>
                                    Все опции должны быть выбраны!
                                </div>
                            </div>

                            <div className="order_item__advanced_options">
                                <div className="order_item__option">
                                    <Checkbox
                                        label="Полный бак"
                                        name="isFullTank"
                                        value={order.isFullTank}
                                        setCheckbox={handleCheckboxChange}
                                    />
                                </div>

                                <div className="order_item__option">
                                    <Checkbox
                                        label="Детское кресло"
                                        name="isNeedChildChair"
                                        value={order.isNeedChildChair}
                                        setCheckbox={handleCheckboxChange}
                                    />
                                </div>

                                <div className="order_item__option">
                                    <Checkbox
                                        label="Правый руль"
                                        name="isRightWheel"
                                        value={order.isRightWheel}
                                        setCheckbox={handleCheckboxChange}
                                    />
                                </div>
                            </div>
                            <div className="order_item__btns">
                                <Button
                                    type="button"
                                    title="Сохранить"
                                    color="green"
                                    onclick={handleSaveChanges}
                                    isDisabled={!(
                                        order.carId
                                        && order.cityId
                                        && order.pointId
                                        && order.orderStatusId
                                    )}
                                />
                                <Button
                                    type="button"
                                    title="Отменить"
                                    onclick={handleCancelChanges}
                                />
                                <Button
                                    type="button"
                                    title="Удалить"
                                    color="red"
                                    onclick={handleDeleteOrder}
                                />
                            </div>
                        </div>
                    )
                    : <Preloader/>
                }
            </article>
        </>
    );
}

export default OrderItem;
