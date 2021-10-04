/* eslint-disable jsx-a11y/label-has-associated-control */ // ошибка линтера

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Checkbox from '../layouts/Checkbox';

import {DOMAIN_URL} from '../../constants/fetchConstants';

import './OrderCard.scss';

function OrderCard({order}) {
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
    } = order;

    const getImgSrc = () => {
        let src = '';

        if (carId) {
            src = carId.thumbnail.path.includes('data')
                ? carId.thumbnail.path
                : `${DOMAIN_URL}${carId.thumbnail.path}`;
        } else {
            src = 'https://via.placeholder.com/138x63';
        }

        return src;
    };

    const replaceDateFormat = (date) => {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };
        const newDate = new Date(date);
        const dateStr = newDate.toLocaleString('ru', options);
        return dateStr.replace(/,/g, '');
    };

    return (
        <div className="order_item">
            <div className="order_item__car_info">
                <div className="order_item__img">
                    <img src={getImgSrc()} alt={carId ? carId.name : id}/>
                </div>
                <div className="order_item__main_info">
                    <div className="order_item__name_and_address">
                        <span>{carId ? carId.name : 'Нет данных'}</span>
                        {' в '}
                        <span>{cityId ? cityId.name : 'Нет данных'}</span>
                        {', '}
                        {pointId ? pointId.address : 'Нет данных'}
                    </div>
                    <div className="order_item__date">
                        {`${replaceDateFormat(dateFrom)} - ${replaceDateFormat(dateTo)}`}
                    </div>
                    <div className="order_item__color">
                        {'Цвет: '}
                        <span>{color}</span>
                    </div>
                </div>
                <div className="order_item__options">
                    <div className="order_item__option">
                        <Checkbox
                            label="Полный бак"
                            name="isFullTank"
                            value={isFullTank}
                            isReadOnly
                        />
                    </div>

                    <div className="order_item__option">
                        <Checkbox
                            label="Детское кресло"
                            name="isNeedChildChair"
                            value={isNeedChildChair}
                            isReadOnly
                        />
                    </div>

                    <div className="order_item__option">
                        <Checkbox
                            label="Правый руль"
                            name="isRightWheel"
                            value={isRightWheel}
                            isReadOnly
                        />
                    </div>
                </div>
                <div className="order_item__price">
                    {`${price.toLocaleString()} `}
                    &#8381;
                </div>
            </div>

            <Link to={`/admin/orders/${id}`} className="order_item__change_btn">
                <span className="order_item__change_icon"/>
                Изменить
            </Link>
        </div>
    );
}

OrderCard.propTypes = {
    order: PropTypes.objectOf(PropTypes.any),
};

OrderCard.defaultProps = {
    order: null,
};

export default OrderCard;
