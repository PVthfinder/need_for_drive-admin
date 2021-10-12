import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CarItemMainInfo from './CarItemMainInfo';
import CarItemOptions from './CarItemOptions';
import Preloader from '../layouts/Preloader';
import EditItemControls from '../EditItemControls';

import { setCategories, setSingleEntity } from '../../store/entities/actionCreators';

import { getSingleEntity, getEntityList } from '../../utils/apiUtils';
import { CARS_DB, CATEGORIES_DB } from '../../constants/fetchConstants';

import './CarItem.scss';

function CarItem() {
    const {categories, singleEntity} = useSelector((state) => state.entities);
    const dispatch = useDispatch();
    const id = useParams();

    useEffect(() => {
        if (Object.keys(id).length === 0) {
            dispatch(setSingleEntity({}));
        } else {
            getSingleEntity(CARS_DB, id.id)
                .then((data) => (data ? dispatch(setSingleEntity(data.data)) : {}));
        }
    }, [id]);

    useEffect(() => {
        getEntityList(CATEGORIES_DB)
            .then((data) => (data ? dispatch(setCategories(data.data)) : []));
    }, []);

    return (
        <>
            <header className="admin_content__header">Карточка автомобиля</header>
            <div className="admin_car_info">
                {
                    singleEntity
                    && categories
                    ? (
                        <>
                            <CarItemMainInfo/>

                            <div className="car_settings">
                                <div className="car_settings__settings">
                                    <div className="car_settings__heading">
                                        Настройки автомобиля
                                    </div>
                                    <CarItemOptions/>
                                </div>
                                <EditItemControls
                                    idObj={id}
                                    entityDb={CARS_DB}
                                    disableSaveBtn={!(
                                        singleEntity.name
                                        && singleEntity.categoryId
                                        && singleEntity.priceMin
                                        && singleEntity.priceMax
                                        && singleEntity.tank
                                    )}
                                />
                            </div>
                        </>
                    )
                    : <Preloader/>
                }
            </div>
        </>
    );
}

export default CarItem;
