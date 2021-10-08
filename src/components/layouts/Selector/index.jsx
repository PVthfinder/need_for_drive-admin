import React, {useState} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Selector.scss';

function Selector({
    title,
    entityName,
    chosenItem,
    setChosen,
    selectorArr,
    isError,
}) {
    const [activeSelector, setActiveSelector] = useState(false);

    const chooseHandler = (item) => {
        setChosen(item, entityName);
        setActiveSelector(false);
    };

    const selectorClasses = classNames(
        'selector',
        {error: isError},
    );

    const selectorOptionsClasses = classNames(
        'selector__options',
        {active: activeSelector},
    );

    const selectorIconClasses = classNames(
        'selector__icon',
        {active: activeSelector},
    );

    const handleDropdownClick = () => {
        setActiveSelector((prevActiveSelector) => (
            !prevActiveSelector
        ));
    };

    return (
        <div className={selectorClasses}>
            <div className="selector__choose">
                {chosenItem && chosenItem.length > 0 ? chosenItem : `Выберите ${title}`}
            </div>

            <ul className={selectorOptionsClasses}>
                {selectorArr && selectorArr.map((item) => (
                    <li
                        key={item.id ?? item.name}
                        onClick={() => chooseHandler(item)}
                        onKeyDown={() => chooseHandler(item)}
                        role="option"
                        tabIndex="0"
                        aria-selected={false}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>

            <div
                className="selector__button"
                onClick={handleDropdownClick}
                onKeyDown={handleDropdownClick}
                role="button"
                tabIndex="0"
                aria-label="dropdown selector"
            >
                <span className={selectorIconClasses}/>
            </div>
        </div>
    );
}

Selector.propTypes = {
    title: PropTypes.string,
    entityName: PropTypes.string,
    chosenItem: PropTypes.string,
    setChosen: PropTypes.func,
    selectorArr: PropTypes.arrayOf(PropTypes.any),
    isError: PropTypes.bool,
};

Selector.defaultProps = {
    title: '',
    entityName: '',
    chosenItem: '',
    setChosen: null,
    selectorArr: [],
    isError: false,
};

export default Selector;
