import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import CarsFilters from './CarsFilter';
import List from '../List';

import { getEntityList } from '../../utils/apiUtils';

import { CARS_DB, CATEGORIES_DB } from '../../constants/fetchConstants';

import { setRequestError } from '../../store/requestError/actionCreators';
import { setCars, setCategories } from '../../store/entities/actionCreators';

function CarsList() {
    const {cars, categories} = useSelector((state) => state.entities);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        getEntityList(CATEGORIES_DB)
            .then((data) => (data ? dispatch(setCategories(data.data)) : []));
    }, []);

    useEffect(() => {
        getEntityList(CARS_DB, location.search)
            .then((data) => (data ? dispatch(setCars(data.data)) : []))
            .catch((err) => {
                if (err.httpStatus) {
                    dispatch(setRequestError(err.httpStatus));
                }
            });

        return (() => {
            dispatch(setCars(null));
        });
    }, [location.search]);

    const filterComponent = <CarsFilters/>;

    return (
        <List
            title="Список автомобилей"
            preloaderCondition={cars && categories}
            entityDb={CARS_DB}
            allItemsArr={cars}
            listName={CARS_DB}
            cardName="car"
            filterComponent={filterComponent}
        />
    );
}

export default CarsList;
