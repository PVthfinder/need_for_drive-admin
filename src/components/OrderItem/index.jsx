import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import Selector from '../layouts/Selector';
import Checkbox from '../layouts/Checkbox';
import Preloader from '../layouts/Preloader';
import EditItemControls from '../EditItemControls';

import {
    setStatuses,
    setCars,
    setCities,
    setPoints,
    setSingleEntity,
    setSingleEntityOption,
    setSingleEntityAdditionalOption,
} from '../../store/entities/actionCreators';

import { getSingleEntity, getEntityList } from '../../utils/apiUtils';
import { STATUSES_DB, ORDERS_DB, CARS_DB, CITIES_DB, POINTS_DB } from '../../constants/fetchConstants';

import './OrderItem.scss';

function OrderItem() {
    const {cars, cities, statuses, points, singleEntity} = useSelector((state) => state.entities);
    const dispatch = useDispatch();
    const id = useParams();

    useEffect(() => {
        getSingleEntity(ORDERS_DB, id.id)
            .then((data) => (data ? dispatch(setSingleEntity(data.data)) : []));
    }, [id]);

    useEffect(() => {
        getEntityList(STATUSES_DB)
            .then((data) => (data ? dispatch(setStatuses(data.data)) : []));
        getEntityList(CARS_DB)
            .then((data) => (data ? dispatch(setCars(data.data)) : []));
        getEntityList(CITIES_DB)
            .then((data) => (data ? dispatch(setCities(data.data)) : []));
    }, []);

    useEffect(() => {
        getEntityList(POINTS_DB, singleEntity && singleEntity.cityId ? `?cityId=${singleEntity.cityId.id}` : null)
            .then((data) => (data ? dispatch(setPoints(data.data)) : []));
    }, [singleEntity && singleEntity.cityId]);

    const handleEntityChange = (entityObj, entityName) => {
        dispatch(setSingleEntityOption(entityObj, entityName));
    };

    const handleCheckboxChange = (optionName) => {
        dispatch(setSingleEntityAdditionalOption(optionName));
    };

    const optionsAlert = classNames(
        'order_item__options_alert',
        {
            active: !(
                singleEntity
                && singleEntity.carId
                && singleEntity.cityId
                && singleEntity.pointId
                && singleEntity.orderStatusId
            ),
        },
    );

    return (
        <>
        <header className="admin_content__header">Редактирование заказа</header>
        <article className="admin_content__main admin_article">
            {
                singleEntity
                && statuses
                && cars
                && cities
                && points
                ? (
                    <div className="admin_article__main  item">
                        <div className="order_item__options">
                            <div className="order_item__main_options">
                                <Selector
                                    title="модель"
                                    entityName="carId"
                                    chosenItem={singleEntity.carId && singleEntity.carId.name}
                                    setChosen={handleEntityChange}
                                    selectorArr={cars}
                                    isError={!singleEntity.carId}
                                />
                                <Selector
                                    title="город"
                                    entityName="cityId"
                                    chosenItem={singleEntity.cityId && singleEntity.cityId.name}
                                    setChosen={handleEntityChange}
                                    selectorArr={cities}
                                    isError={!singleEntity.cityId}
                                />
                                <Selector
                                    title="пункт выдачи"
                                    entityName="pointId"
                                    chosenItem={singleEntity.pointId && singleEntity.pointId.name}
                                    setChosen={handleEntityChange}
                                    selectorArr={points}
                                    isError={!singleEntity.pointId}
                                />
                                <Selector
                                    title="статус"
                                    entityName="orderStatusId"
                                    chosenItem={
                                        singleEntity.orderStatusId
                                        && singleEntity.orderStatusId.name
                                    }
                                    setChosen={handleEntityChange}
                                    selectorArr={statuses}
                                    isError={!singleEntity.orderStatusId}
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
                                        value={singleEntity.isFullTank}
                                        setCheckbox={handleCheckboxChange}
                                    />
                                </div>

                                <div className="order_item__option">
                                    <Checkbox
                                        label="Детское кресло"
                                        name="isNeedChildChair"
                                        value={singleEntity.isNeedChildChair}
                                        setCheckbox={handleCheckboxChange}
                                    />
                                </div>

                                <div className="order_item__option">
                                    <Checkbox
                                        label="Правый руль"
                                        name="isRightWheel"
                                        value={singleEntity.isRightWheel}
                                        setCheckbox={handleCheckboxChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <EditItemControls
                            idObj={id}
                            entityDb={ORDERS_DB}
                            disableSaveBtn={!(
                                singleEntity.carId
                                && singleEntity.cityId
                                && singleEntity.pointId
                                && singleEntity.orderStatusId
                            )}
                        />
                    </div>
                )
                : <Preloader/>
            }
        </article>
        </>
    );
}

export default OrderItem;
