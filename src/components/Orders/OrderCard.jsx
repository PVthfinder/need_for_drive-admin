/* eslint-disable jsx-a11y/label-has-associated-control */ // ошибка линтера

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Checkbox from '../layouts/Checkbox';

import { getImgSrc, replaceDateFormat } from '../../utils/commonUtils';

import './OrderCard.scss';

function OrderCard({orderObj}) {
    const {
        id,
        carId,
        cityId,
        pointId,
        dateFrom,
        dateTo,
        color,
        isFullTank,
        isNeedChildChair,
        isRightWheel,
        price,
    } = orderObj;

    return (
        <>
            <div className="list_item__img">
                <img src={getImgSrc(carId)} alt={carId ? carId.name : id}/>
            </div>
            <div className="list_item__main_info">
                <div className="list_item__name_and_address">
                    <span>{carId ? carId.name : 'Нет данных'}</span>
                    {' в '}
                    <span>{cityId ? cityId.name : 'Нет данных'}</span>
                    {', '}
                    {pointId ? pointId.address : 'Нет данных'}
                </div>
                <div className="list_item__date">
                    {`${replaceDateFormat(dateFrom)} - ${replaceDateFormat(dateTo)}`}
                </div>
                <div className="list_item__color">
                    {'Цвет: '}
                    <span>{color}</span>
                </div>
            </div>
            <div className="list_item__options">
                <div className="list_item__option">
                    <Checkbox
                        label="Полный бак"
                        name="isFullTank"
                        value={isFullTank}
                        isReadOnly
                    />
                </div>

                <div className="list_item__option">
                    <Checkbox
                        label="Детское кресло"
                        name="isNeedChildChair"
                        value={isNeedChildChair}
                        isReadOnly
                    />
                </div>

                <div className="list_item__option">
                    <Checkbox
                        label="Правый руль"
                        name="isRightWheel"
                        value={isRightWheel}
                        isReadOnly
                    />
                </div>
            </div>
            {price
            && (
                <div className="list_item__price">
                    {`${price.toLocaleString()} `}
                    &#8381;
                </div>
            )}
        </>
    );
}

OrderCard.propTypes = {
    orderObj: PropTypes.objectOf(PropTypes.any),
};

OrderCard.defaultProps = {
    orderObj: null,
};

export default OrderCard;
