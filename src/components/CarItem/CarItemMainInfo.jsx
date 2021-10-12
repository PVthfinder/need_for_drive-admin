import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FileLoader from '../layouts/FileLoader';

import {setSingleEntityOption} from '../../store/entities/actionCreators';

import { getImgSrc } from '../../utils/commonUtils';

function CarItemMainInfo() {
    const {singleEntity} = useSelector((state) => state.entities);
    const dispatch = useDispatch();

    const handleTextChange = (evt) => {
        dispatch(setSingleEntityOption(evt.target.value, 'description'));
    };

    const handleEntityChange = (entityVal) => {
        dispatch(setSingleEntityOption(entityVal, 'thumbnail'));
    };

    return (
        <div className="car_main_info">
            <div className="car_main_info__img_name">
                <div className="car_main_info__img">
                    <img src={getImgSrc(singleEntity)} alt={singleEntity.name}/>
                </div>
                <div className="car_main_info__name">
                    {singleEntity.name}
                </div>
                <div className="car_main_info__category">
                    {singleEntity.categoryId ? singleEntity.categoryId.name : 'Нет данных'}
                </div>
                <div className="car_main_info__file_loader">
                    <FileLoader
                        setImage={handleEntityChange}
                    />
                </div>
            </div>

            <div className="car_main_info__tank tank">
                <div className="tank__heading">
                    <span>Заполнено</span>
                    <span>{singleEntity.tank ? `${singleEntity.tank}%` : 'Нет данных'}</span>
                </div>
                <div className="tank__fullness">
                    <div className="tank__indicator" style={{ width: `${singleEntity.tank}%` }}/>
                </div>
            </div>

            <div className="car_main_info__desc">
                <label htmlFor="car_info_desc">
                    Описание
                    <textarea
                        type="text"
                        id="car_info_desc"
                        value={singleEntity.description}
                        onChange={handleTextChange}
                        label="Описание"
                        placeholder="Введите описание"
                    />
                </label>
            </div>
        </div>
    );
}

export default CarItemMainInfo;
