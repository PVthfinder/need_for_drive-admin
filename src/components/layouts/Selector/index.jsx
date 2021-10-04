import React, {useState} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Selector.scss';

function Selector({
    title,
    chosenItem,
    setChosen,
    selectorArr,
}) {
    const [activeSelector, setActiveSelector] = useState(false);

    const chooseHandler = (item) => {
        setChosen(item);
        setActiveSelector(false);
    };

    const selectorClasses = classNames(
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
        <div className="selector">
            <div className="selector__choose">
                {chosenItem && chosenItem.length > 0 ? chosenItem : `Выберите ${title}`}
            </div>

            <ul className={selectorClasses}>
                {selectorArr && selectorArr.map((item) => (
                    <li
                        key={item.name}
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
    chosenItem: PropTypes.string,
    setChosen: PropTypes.func,
    selectorArr: PropTypes.arrayOf(PropTypes.any),
};

Selector.defaultProps = {
    title: '',
    chosenItem: '',
    setChosen: null,
    selectorArr: [],
};

export default Selector;
