import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import List from '../List';

import { getEntityList } from '../../utils/apiUtils';

import { CATEGORIES_DB } from '../../constants/fetchConstants';

import { setRequestError } from '../../store/requestError/actionCreators';
import { setCategories } from '../../store/entities/actionCreators';

function CategoriesList() {
    const {categories} = useSelector((state) => state.entities);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        getEntityList(CATEGORIES_DB, location.search)
            .then((data) => (data ? dispatch(setCategories(data.data)) : []))
            .catch((err) => {
                if (err.httpStatus) {
                    dispatch(setRequestError(err.httpStatus));
                }
            });

        return (() => {
            dispatch(setCategories(null));
        });
    }, [location.search]);

    return (
        <List
            title="Список категорий"
            preloaderCondition={categories}
            entityDb={CATEGORIES_DB}
            allItemsArr={categories}
            listName={CATEGORIES_DB}
            cardName="category"
        />
    );
}

export default CategoriesList;
