import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import PointsFilter from './PointsFilter';
import List from '../List';

import { getEntityList } from '../../utils/apiUtils';

import { POINTS_DB, CITIES_DB } from '../../constants/fetchConstants';

import { setRequestError } from '../../store/requestError/actionCreators';
import { setPoints, setCities } from '../../store/entities/actionCreators';

function PointsList() {
    const {points, cities} = useSelector((state) => state.entities);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        getEntityList(CITIES_DB)
            .then((data) => (data ? dispatch(setCities(data.data)) : []));
    }, []);

    useEffect(() => {
        getEntityList(POINTS_DB, location.search)
            .then((data) => (data ? dispatch(setPoints(data.data)) : []))
            .catch((err) => {
                if (err.httpStatus) {
                    dispatch(setRequestError(err.httpStatus));
                }
            });

        return (() => {
            dispatch(setPoints(null));
        });
    }, [location.search]);

    const filterComponent = <PointsFilter/>;

    return (
        <List
            title="Список пунктов выдачи"
            preloaderCondition={points && cities}
            entityDb={POINTS_DB}
            allItemsArr={points}
            listName={POINTS_DB}
            cardName="point"
            filterComponent={filterComponent}
        />
    );
}

export default PointsList;
