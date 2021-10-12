import React from 'react';
import PropTypes from 'prop-types';

import './Checkbox.scss';

function Checkbox({
    label,
    name,
    value,
    isReadOnly,
    setCheckbox,
}) {
    const applyAdditionalOption = (optionName) => {
        if (setCheckbox) setCheckbox(optionName);
    };

    return (
        <div className="checkbox">
            <input
                readOnly={isReadOnly}
                name={name}
                type="checkbox"
                id={name}
                value={value}
                checked={value}
                onChange={() => applyAdditionalOption(name)}
            />
            <label htmlFor={name}>
                {label}
                {value && (
                    <span>
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.75 4.73828L7.16406 0.324219L7.75 0.910156L2.75 5.91016L0.425781 3.58594L1.01172 3L2.75 4.73828Z" fill="#121212"/>
                        </svg>
                    </span>
                )}
            </label>
        </div>
    );
}

Checkbox.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    setCheckbox: PropTypes.func,
};

Checkbox.defaultProps = {
    label: '',
    name: '',
    value: false,
    isReadOnly: false,
    setCheckbox: null,
};

export default Checkbox;
