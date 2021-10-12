import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import Selector from '../layouts/Selector';
import Button from '../layouts/Button';

import { setSearchParams, getSearchParam } from '../../utils/commonUtils';
import { getSingleEntity } from '../../utils/apiUtils';

import { PERIODS } from '../../constants/commonConstants';
import { CARS_DB, CITIES_DB, STATUSES_DB } from '../../constants/fetchConstants';

function OrderFilters() {
    const {statuses, cars, cities} = useSelector((state) => state.entities);
    const location = useLocation();
    const {pathname} = useLocation();
    const {push} = useHistory();

    const [chosenPeriod, setChosenPeriod] = useState(null);
    const [chosenCar, setChosenCar] = useState(null);
    const [chosenCity, setChosenCity] = useState(null);
    const [chosenStatus, setChosenStatus] = useState(null);

    useEffect(() => {
        const dateFromVal = getSearchParam(location, 'dateFrom[$gt]');
        const carIdVal = getSearchParam(location, 'carId');
        const cityIdVal = getSearchParam(location, 'cityId');
        const orderStatusIdVal = getSearchParam(location, 'orderStatusId');

        const newChosenPeriod = dateFromVal
            ? PERIODS.find((item) => item.dateFrom === dateFromVal)
            : null;
        setChosenPeriod(newChosenPeriod);
        if (carIdVal) {
            getSingleEntity(CARS_DB, getSearchParam(location, 'carId'))
                .then((data) => (data ? setChosenCar(data.data) : null));
        }
        if (cityIdVal) {
            getSingleEntity(CITIES_DB, getSearchParam(location, 'cityId'))
                .then((data) => (data ? setChosenCity(data.data) : null));
        }
        if (orderStatusIdVal) {
            getSingleEntity(STATUSES_DB, getSearchParam(location, 'orderStatusId'))
                .then((data) => (data ? setChosenStatus(data.data) : null));
        }
    }, []);

    const handlePeriodChange = (period) => {
        setChosenPeriod(period);
    };

    const handleCarChange = (car) => {
        setChosenCar(car);
    };

    const handleCityChange = (city) => {
        setChosenCity(city);
    };

    const handleStatusChange = (status) => {
        setChosenStatus(status);
    };

    const applyFilters = () => {
        const paramsArr = [
            {paramName: 'dateFrom', paramValue: chosenPeriod && chosenPeriod.dateFrom},
            {paramName: 'carId', paramValue: chosenCar && chosenCar.id},
            {paramName: 'cityId', paramValue: chosenCity && chosenCity.id},
            {paramName: 'orderStatusId', paramValue: chosenStatus && chosenStatus.id},
        ];
        const searchParams = setSearchParams(paramsArr);
        push({pathname, search: `${searchParams}`});
    };

    const handleCancelFilters = () => {
        setChosenPeriod(null);
        setChosenCar(null);
        setChosenCity(null);
        setChosenStatus(null);
    };

    return (
        <>
            <div className="admin_article__filters">
                <Selector
                    title="период"
                    chosenItem={chosenPeriod && chosenPeriod.name}
                    setChosen={handlePeriodChange}
                    selectorArr={PERIODS}
                />
                <Selector
                    title="модель машины"
                    chosenItem={chosenCar && chosenCar.name}
                    setChosen={handleCarChange}
                    selectorArr={cars}
                />
                <Selector
                    title="город"
                    chosenItem={chosenCity && chosenCity.name}
                    setChosen={handleCityChange}
                    selectorArr={cities}
                />
                <Selector
                    title="статус"
                    chosenItem={chosenStatus && chosenStatus.name}
                    setChosen={handleStatusChange}
                    selectorArr={statuses}
                />
            </div>
            <div className="admin_article__filter_btns">
                <Button
                    type="button"
                    title=" Применить"
                    color="blue"
                    location="admin_article_header"
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

export default OrderFilters;
