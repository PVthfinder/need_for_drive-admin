import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import Selector from '../layouts/Selector';
import InputField from '../layouts/InputField';
import Button from '../layouts/Button';

import { setSearchParams, getSearchParam } from '../../utils/commonUtils';
import { getSingleEntity } from '../../utils/apiUtils';

import { CATEGORIES_DB } from '../../constants/fetchConstants';

function CarsFilters() {
    const {categories} = useSelector((state) => state.entities);
    const location = useLocation();
    const {pathname} = useLocation();
    const {push} = useHistory();

    const [chosenCategory, setChosenCategory] = useState(null);
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [tank, setTank] = useState('');

    useEffect(() => {
        const categoryIdVal = getSearchParam(location, 'categoryId');
        const priceFromVal = getSearchParam(location, 'priceMin[$gt]');
        const priceToVal = getSearchParam(location, 'priceMax[$gt]');
        const tankVal = getSearchParam(location, 'tank[$gt]');

        if (categoryIdVal) {
            getSingleEntity(CATEGORIES_DB, getSearchParam(location, 'categoryId'))
                .then((data) => (data ? setChosenCategory(data.data) : null));
        }
        if (priceFromVal) setPriceFrom(priceFromVal);
        if (priceToVal) setPriceFrom(priceToVal);
        if (tankVal) setPriceFrom(tankVal);
    }, []);

    const handleCategoryChange = (category) => {
        setChosenCategory(category);
    };

    const handlePriceFromChange = (priceFromStr) => {
        setPriceFrom(priceFromStr);
    };

    const handlePriceToChange = (priceToStr) => {
        setPriceTo(priceToStr);
    };

    const handleTankChange = (tankStr) => {
        setTank(tankStr);
    };

    const applyFilters = () => {
        const paramsArr = [
            {paramName: 'categoryId', paramValue: chosenCategory && chosenCategory.id},
            {paramName: 'priceMin', paramValue: priceFrom.length > 0 ? priceFrom : null},
            {paramName: 'priceMax', paramValue: priceTo.length > 0 ? priceTo : null},
            {paramName: 'tank', paramValue: tank.length > 0 ? tank : null},
        ];
        const searchParams = setSearchParams(paramsArr);
        push({pathname, search: `${searchParams}`});
    };

    const handleCancelFilters = () => {
        setChosenCategory(null);
        setPriceFrom('');
        setPriceTo('');
        setTank('');
    };

    return (
        <>
            <div className="admin_article__filters">
                <Selector
                    title="категорию"
                    chosenItem={chosenCategory && chosenCategory.name}
                    setChosen={handleCategoryChange}
                    selectorArr={categories}
                />
                <InputField
                    type="text"
                    inputValue={priceFrom}
                    setInputValue={handlePriceFromChange}
                    placeholder="Введите min цену"
                />
                <InputField
                    type="text"
                    inputValue={priceTo}
                    setInputValue={handlePriceToChange}
                    placeholder="Введите max цену"
                />
                <InputField
                    type="text"
                    inputValue={tank}
                    setInputValue={handleTankChange}
                    placeholder="Введите min уровень топлива"
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

export default CarsFilters;
