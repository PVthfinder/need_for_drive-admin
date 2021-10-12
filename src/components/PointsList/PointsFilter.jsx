import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import Selector from '../layouts/Selector';
import Button from '../layouts/Button';

import { setSearchParams, getSearchParam } from '../../utils/commonUtils';
import { getSingleEntity } from '../../utils/apiUtils';

import { CITIES_DB } from '../../constants/fetchConstants';

function PointsFilter() {
    const {cities} = useSelector((state) => state.entities);
    const location = useLocation();
    const {pathname} = useLocation();
    const {push} = useHistory();

    const [chosenCity, setChosenCity] = useState(null);

    useEffect(() => {
        const cityIdVal = getSearchParam(location, 'cityId');

        if (cityIdVal) {
            getSingleEntity(CITIES_DB, getSearchParam(location, 'cityId'))
                .then((data) => (data ? setChosenCity(data.data) : null));
        }
    }, []);

    const handleCityChange = (city) => {
        setChosenCity(city);
    };

    const applyFilters = () => {
        const paramsArr = [
            {paramName: 'cityId', paramValue: chosenCity && chosenCity.id},
        ];
        const searchParams = setSearchParams(paramsArr);
        push({pathname, search: `${searchParams}`});
    };

    const handleCancelFilters = () => {
        setChosenCity(null);
    };

    return (
        <>
            <div className="admin_article__filters">
                <Selector
                    title="город"
                    chosenItem={chosenCity && chosenCity.name}
                    setChosen={handleCityChange}
                    selectorArr={cities}
                />
            </div>
            <div className="admin_article__filter_btns">
                <Button
                    type="button"
                    title=" Применить"
                    location="admin_article_header"
                    color="blue"
                    onclick={applyFilters}
                />
                <Button
                    type="button"
                    title=" Сбросить"
                    location="admin_article_header"
                    color="red"
                    onclick={handleCancelFilters}
                />
            </div>
        </>
    );
}

export default PointsFilter;
