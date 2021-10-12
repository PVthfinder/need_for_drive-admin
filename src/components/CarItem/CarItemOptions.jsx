import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Selector from '../layouts/Selector';
import Checkbox from '../layouts/Checkbox';
import InputField from '../layouts/InputField';
import Button from '../layouts/Button';

import {setSingleEntityOption} from '../../store/entities/actionCreators';

function CarItemOptions() {
    const {categories, singleEntity} = useSelector((state) => state.entities);
    const dispatch = useDispatch();

    const [colorInputValue, setColorInputValue] = useState('');
    const [colorsArr, setColorsArr] = useState([]);
    const [colorsFlagsArr, setColorsFlagsArr] = useState([]);

    useEffect(() => {
        const newColorsFlagsArr = singleEntity.colors
            && singleEntity.colors.map((color) => !!color);
        setColorsFlagsArr(newColorsFlagsArr);
        setColorsArr(singleEntity.colors);
    }, [singleEntity.colors]);

    const handleEntityChange = (entityVal, entityName) => {
        dispatch(setSingleEntityOption(entityVal, entityName));
    };

    const handleColorInputChange = (colorName) => {
        setColorInputValue(colorName);
    };

    const handleAddColor = () => {
        if (
            colorsArr
            && (
                colorsArr.includes(colorInputValue.toLocaleLowerCase())
                || colorInputValue.length === 0
            )
        ) return;

        const newColorsArr = singleEntity.colors
            ? [...singleEntity.colors, colorInputValue]
            : [colorInputValue];
        dispatch(setSingleEntityOption(newColorsArr, 'colors'));
        setColorInputValue('');
    };

    const handleCheckboxChange = (evt) => {
        const neededIndex = singleEntity.colors.indexOf(evt);
        const newColorsFlagsArr = colorsFlagsArr.map((item, index) => {
            if (index === neededIndex) {
                return !item;
            }
            return item;
        });
        setColorsFlagsArr(newColorsFlagsArr);
    };

    return (
        <div className="car_settings__options">
            <InputField
                type="text"
                inputValue={singleEntity.name}
                setInputValue={handleEntityChange}
                label="Модель автомобиля"
                placeholder="Введите название модели"
                entityName="name"
                isError={!singleEntity.name}
            />
            <Selector
                label="Тип автомобиля"
                title="тип"
                entityName="categoryId"
                chosenItem={
                    singleEntity.categoryId
                    && singleEntity.categoryId.name
                }
                setChosen={handleEntityChange}
                selectorArr={categories}
                isError={!singleEntity.categoryId}
            />
            <InputField
                type="text"
                inputValue={singleEntity.priceMin}
                setInputValue={handleEntityChange}
                label="Минимальная цена"
                placeholder="Введите минимальную цену"
                entityName="priceMin"
                isError={!singleEntity.priceMin}
            />
            <InputField
                type="text"
                inputValue={singleEntity.priceMax}
                setInputValue={handleEntityChange}
                label="Максимальная цена"
                placeholder="Введите максимальную цену"
                entityName="priceMax"
                isError={!singleEntity.priceMax}
            />
            <InputField
                type="text"
                inputValue={singleEntity.number}
                setInputValue={handleEntityChange}
                label="Номер автомобиля"
                placeholder="Введите номер"
                entityName="number"
            />
            <InputField
                type="text"
                inputValue={singleEntity.tank}
                setInputValue={handleEntityChange}
                label="Уровень топлива"
                placeholder="Введите уровень топлива"
                entityName="tank"
                isError={!singleEntity.tank}
            />
            <div>
                <div className="car_settings__add_colors">
                    <InputField
                        type="text"
                        inputValue={colorInputValue}
                        setInputValue={handleColorInputChange}
                        label="Доступные цвета"
                        placeholder="Введите цвет"
                    />
                    <div className="car_settings__colors_btn">
                        <Button
                            type="button"
                            location="colors"
                            onclick={handleAddColor}
                        />
                    </div>
                </div>
                <div className="car_settings__available_colors">
                    {singleEntity.colors
                        && singleEntity.colors.length > 0
                        && singleEntity.colors.map((color, index) => (
                        <Checkbox
                            key={color}
                            label={color}
                            name={color}
                            value={colorsFlagsArr && colorsFlagsArr[index]}
                            setCheckbox={handleCheckboxChange}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CarItemOptions;
