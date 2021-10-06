import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import Selector from '../layouts/Selector';
import Button from '../layouts/Button';

import { setSearchParams } from '../../utils/commonUtils';

import { PERIODS } from '../../constants/commonConstants';

function OrderFilters() {
    const [chosenPeriod, setChosenPeriod] = useState(null);
    const [chosenCar, setChosenCar] = useState(null);
    const [chosenCity, setChosenCity] = useState(null);
    const [chosenStatus, setChosenStatus] = useState(null);

    const {statuses, cars, cities} = useSelector((state) => state.entities);
    const {pathname} = useLocation();
    const location = useLocation();
    const {push} = useHistory();

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
            {paramName: 'dateFrom[$gt]', paramValue: chosenPeriod && chosenPeriod.dateFrom},
            {paramName: 'carId', paramValue: chosenCar && chosenCar.id},
            {paramName: 'cityId', paramValue: chosenCity && chosenCity.id},
            {paramName: 'orderStatusId', paramValue: chosenStatus && chosenStatus.id},
        ];
        const searchParams = setSearchParams(paramsArr);
        push({pathname, search: `?${searchParams}`});
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
