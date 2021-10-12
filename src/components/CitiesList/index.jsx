import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import List from '../List';

import { getEntityList } from '../../utils/apiUtils';

import { CITIES_DB } from '../../constants/fetchConstants';

import { setRequestError } from '../../store/requestError/actionCreators';
import { setCities } from '../../store/entities/actionCreators';

function CitiesList() {
    const {cities} = useSelector((state) => state.entities);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        getEntityList(CITIES_DB, location.search)
            .then((data) => (data ? dispatch(setCities(data.data)) : []))
            .catch((err) => {
                if (err.httpStatus) {
                    dispatch(setRequestError(err.httpStatus));
                }
            });

        return (() => {
            dispatch(setCities(null));
        });
    }, [location.search]);

    return (
        <List
            title="Список городов"
            preloaderCondition={cities}
            entityDb={CITIES_DB}
            allItemsArr={cities}
            listName={CITIES_DB}
            cardName="city"
        />
    );
}

export default CitiesList;
