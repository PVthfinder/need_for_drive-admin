import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getImgSrc, changeNumberFormat } from '../../utils/commonUtils';

import './CarCard.scss';

function CarCard({carObj}) {
    const {
        name,
        categoryId,
        number,
        description,
        tank,
        colors,
        priceMin,
        priceMax,
    } = carObj;
    return (
        <>
            <div className="list_item__img">
                <img src={getImgSrc(carObj)} alt={name}/>
            </div>
            <div className="list_item__main_info">
                <div className="list_item__name">
                    <span>{name ?? 'Нет данных'}</span>
                </div>
                <div className="list_item__category">
                    {'Категория: '}
                    <span>{categoryId ? categoryId.name : 'Нет данных'}</span>
                </div>
                <div className="list_item__desc">
                    {'Описание: '}
                    <span>{description ?? 'Нет данных'}</span>
                </div>
                <div className="list_item__number">
                    {'Номер: '}
                    {number ? <span>{changeNumberFormat(number)}</span> : 'Нет данных'}
                </div>
            </div>
            <div className="list_item__options">
                <div className="list_item__colors">
                    {'Доступные цвета: '}
                    {
                        colors && colors.map((item) => <span>{item}</span>)
                    }
                </div>
                <div className="list_item__price_range">
                    {'Цена: '}
                    <span>{`от ${priceMin} до ${priceMax} `}</span>
                    &#8381;
                </div>
                <div className="list_item__tank">
                    {'Топливо: '}
                    <span>{tank ? `${tank} %` : 'Нет данных'}</span>
                </div>
            </div>
        </>
    );
}

CarCard.propTypes = {
    carObj: PropTypes.objectOf(PropTypes.any),
};

CarCard.defaultProps = {
    carObj: {},
};

export default CarCard;
